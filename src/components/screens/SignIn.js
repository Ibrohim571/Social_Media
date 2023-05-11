import { useState, useEffect } from "react";
import axios from "axios";
import "./css/SignIn.css";
import M from "materialize-css";
import Login from "./LoginPage/Login";

export default function SignIn() {
  const [regName, setRegName] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [logEmail, setLogEmail] = useState("");
  const [logPassword, setLogPassword] = useState("");
  const [clicked, setClicked] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [image, setImage] = useState(undefined);
  const [url, setUrl] = useState(
    "https://res.cloudinary.com/dtabxocmw/image/upload/v1635099407/78-785827_user-profile-avatar-login-account-male-user-icon_kmmxgw.jpg"
  );

  const uploadPicture = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "beshkentGram");
    data.append("cloud_name", "beshkentgram");
    fetch("https://api.cloudinary.com/v1_1/beshkentgram/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setUrl(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const ourFields = () => {
    if (
      // eslint-disable-next-line
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        regEmail
      )
    ) {
      M.toast({
        html: "Email wrong",
        classes: "#ff1744 red accent-3",
      });
      return;
    }
    axios
      .post(
        "/signup",
        {
          name: regName,
          password: regPassword,
          email: regEmail,
          pic: url,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      // .then((res) => res.json())
      .then(({ data }) => {
        if (data.error) {
          M.toast({ html: data.error, classes: "#ff1744 red accent-3" });
        } else {
          M.toast({ html: data.msg, classes: "#2e7d32 green darken-3" });
          setClicked(!clicked);
        }
      });
  };

  const postData = () => {
    if (image) {
      uploadPicture();
    } else {
      ourFields();
    }
  };

  useEffect(() => {
    if (url) {
      ourFields();
    }
  }, [url]);

  // function onSignIn(googleUser) {
  //   var profile = googleUser.getBasicProfile();
  //   console.log("ID: " + profile.getId()); // Do not send to your backend! Use an ID token instead.
  //   console.log("Name: " + profile.getName());
  //   console.log("Image URL: " + profile.getImageUrl());
  //   console.log("Email: " + profile.getEmail()); // This is null if the 'email' scope is not present.
  // }

  return (
    <>
      <section>
        <div className={clicked ? "container active" : "container"}>
          <div className="user signinBx">
            <div className="imgBx">
              <img
                src="https://storage.kun.uz/source/5/7IqEFhF8TYH9dE7aSfbJixHvlbzN5LgY.png"
                alt="sign"
              />
            </div>
            <div className="formBx">
              <Login
                logEmail={logEmail}
                logPassword={logPassword}
                setLogEmail={setLogEmail}
                setLogPassword={setLogPassword}
                clicked={clicked}
                setClicked={setClicked}
              />
            </div>
          </div>
          <div className="user signupBx">
            <div className="formBx">
              <div className="form">
                <h2 style={{ margin: 0 }}>Sign In</h2>
                <div class="containers">
                  <img
                    src="https://res.cloudinary.com/dtabxocmw/image/upload/v1635099407/78-785827_user-profile-avatar-login-account-male-user-icon_kmmxgw.jpg"
                    alt="Avatar"
                    class="images"
                  />
                  <div class="middles">
                    <button
                      onClick={() => setIsOpenModal(true)}
                      className="btn #0d47a1 blue darken-4"
                    >
                      <i className="material-icons">add_a_photo</i>
                    </button>
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Ismingiz"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                />
                <input
                  type="email"
                  placeholder="Email Manzilingiz"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Parolingiz"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                />

                <button
                  className="btn #0d47a1 blue darken-4"
                  onClick={() => postData()}
                >
                  Sign In
                </button>
                {/* <div className="g-signin2" data-onsuccess="onSignIn"></div> */}
                <p className="signup">
                  You already have accaunt?{/* eslint-disable-next-line */}
                  <a href="#" onClick={() => setClicked(!clicked)}>
                    Log In
                  </a>
                </p>
              </div>
            </div>
            <div className="imgBx">
              <img
                alt="sign"
                src="https://static.zarnews.uz/crop/5/9/720__80_59687f917a0d46685a52ec8fe7c04138.jpg?img=self&v=1626171787"
              />
            </div>
          </div>
        </div>
        {isOpenModal ? (
          <div className="modalS" onClick={() => setIsOpenModal(false)}>
            <div
              className="modalS__content"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modalHeader">
                <h4>Add Your Accaunt Photo</h4>
                <i
                  style={{ cursor: "pointer", color: "#0d47a1" }}
                  onClick={() => setIsOpenModal(false)}
                  className="small material-icons "
                >
                  close
                </i>
              </div>
              <div className="modalConten">
                <div class="file-field input-field">
                  <div class="btn #0d47a1 blue darken-4">
                    <span>
                      <i className="material-icons">add_a_photo</i>
                    </span>
                    <input
                      type="file"
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                  </div>
                  <div class="file-path-wrapper">
                    <input
                      class="file-path validate"
                      type="text"
                      placeholder="You Photo"
                    />
                  </div>
                </div>
              </div>
              <div className="modalFooter">
                <button
                  className="btn #0d47a1 blue darken-4"
                  onClick={() => setIsOpenModal(false)}
                >
                  Save Image
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </section>
    </>
  );
}
