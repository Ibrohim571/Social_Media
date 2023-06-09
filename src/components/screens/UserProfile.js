import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../App";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "./Loader";

export default function UserProfile() {
  const { userId } = useParams();
  const [profile, setProfile] = useState(null);
  const { state, dispatch } = useContext(UserContext);
  const [showFollow, setShowFollow] = useState(
    state ? !state.following.includes(userId) : true
  );

  useEffect(() => {
    axios
      .get(`/user/${userId}`, {
        headers: {
          Authorization: "Sammi " + localStorage.getItem("jwt"),
        },
      })
      .then((result) => {
        setProfile(result.data);
      });
  });

  const followUser = () => {
    axios
      .put(
        "/follow",
        { followId: userId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Sammi " + localStorage.getItem("jwt"),
          },
        }
      )
      .then(({ data }) => {
        dispatch({
          type: "UPDATE",
          payload: { following: data.following, followers: data.followers },
        });
        localStorage.setItem("user", JSON.stringify(data));
        setProfile((prevState) => {
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: [...prevState.user.followers, data._id],
            },
          };
        });
        setShowFollow(false);
      });
  };

  const unfollowUser = () => {
    axios
      .put(
        "/unfollow",
        {
          unfollowId: userId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Sammi " + localStorage.getItem("jwt"),
          },
        }
      )
      .then(({ data }) => {
        dispatch({
          type: "UPDATE",
          payload: { following: data.following, followers: data.followers },
        });
        localStorage.setItem("user", JSON.stringify(data));
        setProfile((prevState) => {
          const newFollower = prevState.user.followers.filter(
            (s) => s !== data._id
          );
          return {
            ...prevState,
            user: {
              ...prevState.user,
              followers: newFollower,
            },
          };
        });
        setShowFollow(true);
      });
  };

  return (
    <>
      {profile ? (
        <div className="profile">
          <div className="profileMain" style={{ paddingTop: "1rem" }}>
            <div>
              <img
                className="profileImg"
                src={profile.user.pic}
                alt="profile"
              />
            </div>
            <div>
              <h4>{profile.user.name}</h4>
              <div className="infoProfile">
                <p>{profile.posts.length} habarlar</p>
                <p>{profile.user.followers.length} Obunachi</p>
                <p>{profile.user.following.length} Obuna</p>
              </div>
              <div>
                {showFollow ? (
                  <button
                    style={{ marginTop: 10 }}
                    className="btn #0d47a1 blue darken-4"
                    onClick={() => followUser()}
                  >
                    Obuna
                  </button>
                ) : (
                  <button
                    style={{ marginTop: 10 }}
                    className="btn #0d47a1 blue darken-4"
                    onClick={() => unfollowUser()}
                  >
                    Obunadan chiqish
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="gallery">
            {profile.posts.map((item) => {
              return (
                <div key={item._id} className="img-item">
                  <img src={item.photo} alt={item._id} />
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}
