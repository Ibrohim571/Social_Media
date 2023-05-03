import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../GramClone";
import "../style/home.scss";
import RightHome from "./RightHome";

function Home() {
  const { state, dispatch } = useContext(UserContext);
  const [data, setData] = useState([]);
  const [comment, setComment] = useState(false);
  useEffect(() => {
    fetch("/followers/getfollowerpost", {
      headers: {
        Authorization: `kimdir ${localStorage.getItem("jwt")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.result);
      });
  }, []);

  const likeFunction = (id) => {
    fetch("/posts/like", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `kimdir ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        const newData = data.map((item) => {
          if (item._id === result.result._id) {
            return result.result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => console.log(err));
  };

  const unLikeFunction = (id) => {
    fetch("/posts/unLike", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `kimdir ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        postId: id,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id === result.result._id) {
            return result.result;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => console.log(err));
  };

  const sendCommit = (text, textId) => {
    if (text) {
      fetch("/posts/comments", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `kimdir ${localStorage.getItem("jwt")}`,
        },
        body: JSON.stringify({
          text: text,
          textId: textId,
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          const newData = data.map((item) => {
            if (item._id === result.result._id) {
              return result.result;
            } else {
              return item;
            }
          });
          setData(newData);
          document.querySelectorAll(".commitInput").forEach((element) => {
            element.value = "";
          });
        })
        .catch((error) => console.log(error + "error"));
    }
  };

  const deletePost = (postId) => {
    console.log(postId);
    fetch(`/posts/delete/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `kimdir ${localStorage.getItem("jwt")}`,
      },
    })
      .then((res) => res.json())
      .then((result) => {
        const newData = data.filter(
          (item) => item._id.toString() !== result.result._id.toString()
        );
        setData(newData);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="home">
      <div className="home__items">
        <div className="left__item">
          {data
            .map((item) => (
              <div className="card" key={item._id}>
                <div className="card-image">
                  <img src={item.pic} alt={item._id} />
                </div>
                {/* Post name */}
                <Link
                  to={
                    state.state._id !== item.postedBy._id
                      ? `profile${item.postedBy._id}`
                      : `/profile`
                  }
                >
                  <b>
                    <p
                      style={{
                        textAlign: "center",
                        fontSize: "30px",
                        marginTop: "10px",
                      }}
                    >
                      {item.postedBy.name}
                    </p>
                  </b>
                </Link>
                <div className="card-content">
                  {/* icons like */}
                  {item.likes.includes(state.state._id) ? (
                    <i
                      onClick={() => unLikeFunction(item._id)}
                      className="material-icons"
                      style={{ color: "#dd5347", cursor: "pointer" }}
                    >
                      thumb_down
                    </i>
                  ) : (
                    <i
                      onClick={() => likeFunction(item._id)}
                      className="material-icons"
                      style={{ color: "#ffcd42", cursor: "pointer" }}
                    >
                      thumb_up
                    </i>
                  )}

                  <p>{item.likes.length}</p>
                  {/* icons like end */}

                  <span className="card-title">{item.title}</span>
                  <p>{item.body}</p>
                </div>
                <form
                  className="card-action"
                  onSubmit={(e) => {
                    e.preventDefault();
                    sendCommit(e.target[1].value, item._id);
                  }}
                >
                  <div
                    className="input-field col s12"
                    style={{ marginBottom: "0px" }}
                  >
                    <button
                      className="material-icons prefix"
                      style={{
                        color: "#23a9f2",
                        cursor: "pointer",
                        border: "none",
                        backgroundColor: "transparent",
                      }}
                      type="submit"
                    >
                      send
                    </button>
                    <input
                      id={`commit` + item._id}
                      type="text"
                      className="validate commitInput"
                    />

                    <label htmlFor={`commit` + item._id}>Commit here</label>
                    <span
                      className="helper-text"
                      data-error="wrong commit"
                      data-success="right commit"
                    ></span>

                    {/* comment vs delete icons */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <button
                        className="material-icons"
                        // href="#modal1"
                        style={{
                          color: "#76ff03",
                          cursor: "pointer",
                          border: "none",
                          backgroundColor: "transparent",
                          fontSize: "33px",
                        }}
                        onClick={() => setComment(!comment)}
                        type="button"
                      >
                        comment
                      </button>
                      {state.state._id === item.postedBy._id ? (
                        <button
                          className="material-icons"
                          style={{
                            color: "#e53935",
                            cursor: "pointer",
                            border: "none",
                            backgroundColor: "transparent",
                            fontSize: "33px",
                          }}
                          onClick={() => deletePost(item._id)}
                          type="button"
                        >
                          delete_forever
                        </button>
                      ) : null}
                    </div>
                    {comment ? (
                      item.comments.length ? (
                        <div>
                          {item.comments.map((texts) => (
                            <p
                              key={
                                texts.commentBy._id + Math.random() * 100 + 1
                              }
                            >
                              {texts.commentBy.name}: {texts.text}
                            </p>
                          ))}
                        </div>
                      ) : (
                        <p>
                          <i style={{ opacity: "0.6" }}>comments not yet</i>
                        </p>
                      )
                    ) : (
                      <p>
                        <i style={{ opacity: "0.6" }}>
                          {item.comments.length} comments
                        </i>
                      </p>
                    )}
                  </div>
                </form>
              </div>
            ))
            .reverse()}
        </div>
        <div className="right__item">
          <RightHome />
        </div>
      </div>
    </div>
  );
}

export default Home;
