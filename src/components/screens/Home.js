import { useState, useEffect, useContext } from "react";
import "./css/Home.css";
import HomeSideBar from "./HomeSideBar";
import { UserContext } from "../../App";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const [data, setData] = useState([]);
  const { state, dispatch } = useContext(UserContext);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    axios
      .get("/allpost", {
        headers: {
          Authorization: "Sammi " + localStorage.getItem("jwt"),
        },
      })
      // .then((res) => res.json())
      .then(({ data }) => {
        console.log(data);
        setData(data.posts);
      });
  }, []);

  const likePost = (id) => {
    axios
      .put(
        "/like",
        { postId: id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Sammi " + localStorage.getItem("jwt"),
          },
        }
      )
      // .then((res) => res.json())
      .then((result) => {
        const newData = data?.map((item) => {
          if (item._id === result.data._id) {
            return result.data;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => console.log(err));
  };

  const unlikePost = (id) => {
    axios
      .put(
        "/unlike",
        { postId: id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Sammi " + localStorage.getItem("jwt"),
          },
        }
      )
      // .then((res) => res.json())
      .then((result) => {
        const newData = data?.map((item) => {
          if (item._id === result.data._id) {
            return result.data;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => console.log(err));
  };

  const commentPost = (text, postId) => {
    axios
      .put(
        "/comments",
        {
          postId,
          text,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Sammi " + localStorage.getItem("jwt"),
          },
        }
      )
      .then((result) => {
        const newData = data.map((item) => {
          if (item._id === result.data._id) {
            return result.data;
          } else {
            return item;
          }
        });
        setData(newData);
      })
      .catch((err) => console.log(err));
  };

  const deletePost = (postId) => {
    axios
      .delete(`/deletepost/${postId}`, {
        headers: {
          Authorization: "Sammi " + localStorage.getItem("jwt"),
        },
      })
      .then((result) => {
        const newData = data.filter((s) => s._id !== result.data._id);
        setData(newData);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="home">
      <div className="post__items">
        <div className="left__side">
          {data
            .map((item) => {
              return (
                <div className="card" key={item._id}>
                  <Link
                    to={
                      item.postedBy._id !== state._id
                        ? "/profile/" + item.postedBy._id
                        : "/profile"
                    }
                  >
                    <div className="profileNames">
                      <img src={item.postedBy.pic} alt={item.postedBy.name} />
                      <p
                        style={{ display: "inline-block" }}
                        className="card-title postedBy"
                      >
                        {item.postedBy.name}
                      </p>
                    </div>
                  </Link>
                  <div className="card-image">
                    <img src={item.photo} alt={item._id} />
                  </div>
                  <div className="card-content">
                    {item.likes.includes(state._id) ? (
                      <button
                        className="btn white"
                        style={{ color: "#0d47a1 " }}
                      >
                        <i
                          className="material-icons"
                          onClick={() => unlikePost(item._id)}
                        >
                          thumb_down
                        </i>
                      </button>
                    ) : (
                      <button
                        className="btn white"
                        style={{ color: "#0d47a1 " }}
                      >
                        <i
                          className="material-icons"
                          onClick={() => likePost(item._id)}
                        >
                          thumb_up
                        </i>
                      </button>
                    )}
                    <button
                      className="material-icons btn white"
                      style={{ color: "#0d47a1", margin: "0 10px" }}
                      onClick={() => setShowComments(!showComments)}
                    >
                      comment
                    </button>
                    {item.postedBy._id === state._id && (
                      <button className="btn white">
                        <i
                          className="material-icons "
                          style={{ color: "#0d47a1" }}
                          onClick={() => deletePost(item._id)}
                        >
                          delete_forever
                        </i>
                      </button>
                    )}
                    <p>{item.likes.length} likes</p>
                    <h4 style={{ margin: 0 }}>{item.title}</h4>
                    <p style={{ marginTop: 5 }}>
                      <b>{item.body}</b>
                    </p>
                    {showComments ? (
                      item.comments.map((s) => (
                        <Link
                          to={
                            item.postedBy._id !== state._id
                              ? "/profile/" + item.postedBy._id
                              : "/profile"
                          }
                        >
                          <div className="commentPost">
                            <h6>{s.text}</h6>
                            <p>
                              <b>{s.postedBy.name}</b>
                            </p>
                          </div>
                        </Link>
                      ))
                    ) : (
                      <div>
                        <p style={{ opacity: 0.6 }}>
                          Comments: {item.comments.length}
                        </p>
                        {item.comments
                          .map((s) => (
                            <Link
                              to={
                                item.postedBy._id !== state._id
                                  ? "/profile/" + item.postedBy._id
                                  : "/profile"
                              }
                            >
                              <div className="commentPost">
                                <h6>{s.text}</h6>
                                <p>
                                  <b>{s.postedBy.name}</b>
                                </p>
                              </div>
                            </Link>
                          ))
                          .slice(0, 3)}
                      </div>
                    )}
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        commentPost(e.target[0].value, item._id);
                        e.target[0].value = "";
                      }}
                    >
                      <input type="text" placeholder="Add A Comment" />
                    </form>
                  </div>
                </div>
              );
            })
            .reverse()}
        </div>
        <div className="right__side">
          <h4 style={{ color: "#000", fontFamily: "'Grand Hotel', cursive" }}>
            All Users
          </h4>
          <HomeSideBar />
        </div>
      </div>
    </div>
  );
}
