import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Loader from "../components/Loader";

function Post() {
  const [isLoader, setLoader] = useState(false);
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [url, setUrl] = useState("");
  const history = useHistory();
  useEffect(() => {
    if (url) {
      fetch("/posts/", {
        method: "POST",
        body: JSON.stringify({
          title,
          body,
          url,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `kimdir ${localStorage.getItem("jwt")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            console.log(data.error);
          } else {
            setLoader(false);
            history.push("/");
          }
        });
    }
  }, [url]);

  const uploaded = () => {};
  const postDetails = () => {
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
      .catch((err) => console.log(err));
  };
  return (
    <>
      {isLoader ? (
        <Loader />
      ) : (
        <div className="SendPost container">
          <div className="col s12 m6">
            <div className="card">
              <div className="card-image">
                <img src="https://images.pexels.com/photos/371589/pexels-photo-371589.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="rasm"/>
                <span className="card-title">Habar joylash</span>
                <Link className="btn-floating halfway-fab waves-effect waves-light red">
                  <i className="material-icons purple darken-4">add</i>
                </Link>
              </div>
              <div className="card-content">
                <div className="input-field col s12">
                  <i className="material-icons prefix">mode_edit</i>
                  <input
                    id="title"
                    type="text"
                    className="validate"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                  <label htmlFor="title">Title</label>
                  <span
                    className="helper-text"
                    data-error="wrong title"
                    data-success="right title"
                  ></span>
                </div>

                <div className="input-field col s12">
                  <i className="material-icons prefix">mode_edit</i>
                  <input
                    id="body"
                    type="text"
                    className="validate"
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                  />
                  <label htmlFor="body">Body</label>
                  <span
                    className="helper-text"
                    data-error="wrong body"
                    data-success="right body"
                  ></span>
                </div>

                <div className="file-field input-field">
                  <div className="btn purple darken-4">
                    <i className="material-icons">add</i>
                    <input
                      type="file"
                      onChange={(e) => setImage(e.target.files[0])}
                      multiple
                    />
                  </div>
                  <div className="file-path-wrapper">
                    <input
                      className="file-path validate"
                      type="text"
                      placeholder="Rasm joylash"
                    />
                  </div>
                </div>
                <button
                  className="btn"
                  onClick={() => {
                    postDetails();
                    setLoader(true);
                  }}
                >
                  Maqola qushish
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Post;
