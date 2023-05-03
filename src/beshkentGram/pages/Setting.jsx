import { useEffect, useState, useContext } from "react";
import { UserContext } from "../GramClone";
import "../style/setting.scss";

function Setting({ setSetting }) {
  const userProfil = JSON.parse(localStorage.getItem("user"));
  const [Rname, setRname] = useState(userProfil.name);
  // const [Remail, setRemail] = useState(userProfil.email);
  const [Rimage, setRimage] = useState(userProfil.email);
  const [Rurl, setRUrl] = useState("");
  const { state, dispatch } = useContext(UserContext);

  const changeImage = () => {
    const data = new FormData();
    data.append("file", Rimage);
    data.append("upload_preset", "beshkentGram");
    data.append("cloud_name", "beshkentgram");
    fetch("/https://api.cloudinary.com/v1_1/beshkentgram/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setRUrl(data.url);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (Rurl) {
      if (Rname !== "") {
        userProfil.name = Rname;
      }
      userProfil.pic = Rurl;
      fetch(`/changeUser/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `kimdir ${localStorage.getItem("jwt")}`,
        },
        body: JSON.stringify({
          userProfil,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          localStorage.setItem("user", JSON.stringify(data.result));
          dispatch({ type: "USER", payload: data.result });
          setSetting(false);
        });
    }
  }, [Rurl]);

  return (
    <div>
      <div className="settingPage">
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <div className="container">
          <div className="form" action="#">
            <h2 className="title">Setting Profile</h2>
            <div className="form__group">
              <div className="input-field">
                <input
                  id="name"
                  type="text"
                  className="validate"
                  value={Rname}
                  onChange={(e) => setRname(e.target.value)}
                />
                <label className="active" htmlFor="name">
                  Name
                </label>
              </div>

              <div className="file-field input-field">
                <div
                  className="btn"
                  style={{
                    width: "5.5rem",
                    height: "3rem",
                    background: "#fb8c00",
                  }}
                >
                  <span
                    className="medium material-icons"
                    style={{ width: "1rem" }}
                  >
                    photo
                  </span>
                  <input
                    type="file"
                    onChange={(e) => setRimage(e.target.files[0])}
                  />
                </div>
                <div className="file-path-wrapper">
                  <input
                    className="file-path validate"
                    type="text"
                    placeholder="rasm joylash"
                  />
                </div>
              </div>
              <button
                className="btn"
                style={{
                  width: "7rem",
                  height: "3rem",
                  background: "#fb8c00",
                }}
                onClick={() => changeImage()}
              >
                Change
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Setting;
