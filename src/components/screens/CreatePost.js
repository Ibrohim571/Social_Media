import { useState, useEffect } from "react";
import M from "materialize-css";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function CreatePost() {
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (url) {
      axios
        .post(
          "/createpost",
          {
            title: title,
            body: body,
            pic: url,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Sammi " + localStorage.getItem("jwt"),
            },
          }
        )
        // .then((res) => res.json())
        .then(({ data }) => {
          if (data.error) {
            M.toast({ html: data.error, classes: "#ff1744 red accent-3" });
          } else {
            M.toast({
              html: "Siz muvaffaqiyatli maqola qo'shtingiz",
              classes: "#2e7d32 green darken-3",
            });
            history.push("/");
          }
        });
    }
  }, [url]);

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
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="cardBody">
      <div className="card cardPost">
        <div className="card-image">
          <img
            alt="imgPost"
            src="https://xs.uz/upload/post/2020/03/04/91dd0684e951c67ec70161d83e9125df0304.jpg"
          />
          <span className="card-title">Habar qo'shish</span>
        </div>
        <div className="card-content">
          <div className="input-field col s6">
            <i className="material-icons prefix">subtitles</i>
            <input
              id="icon_prefix"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor="icon_prefix">Asosiy mavzu</label>
          </div>
          <div className="input-field col s6">
            <i className="material-icons prefix">content_paste</i>
            <input
              id="icon_prefix"
              type="text"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            />
            <label htmlFor="icon_prefix">Matni</label>
          </div>
          <div className="file-field input-field">
            <div className="btn #0d47a1 blue darken-4">
              <span>
                <i className="material-icons">add</i>
              </span>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
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
            className="btn #0d47a1 blue darken-4"
            onClick={() => postDetails()}
          >
            Yangi habar qo'shish
          </button>
        </div>
      </div>
    </div>
  );
}
// P8xFkux,&dwF74Y
