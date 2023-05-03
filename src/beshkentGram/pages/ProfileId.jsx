import { useEffect, useState, useContext } from "react";
import { UserContext } from "../GramClone";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import Loader from "../components/Loader";
import Not from "../components/Not";

function ProfileId() {
  const { id } = useParams();
  const { state, dispatch } = useContext(UserContext);
  const [proifileID, setProfileID] = useState(null);
  const [followerBtn, setFollowerBtn] = useState(true);
  useEffect(() => {
    if (state) {
      if (state.following.following) {
        const it = !state.following.following.includes(id);
        setFollowerBtn(it);
      } else {
        const it = !state.following.includes(id);
        setFollowerBtn(it);
      }
    }
  }, [state]);

  useEffect(() => {
    fetch(`/followers/follower/${id}`, {
      headers: {
        Authorization: `kimdir ${localStorage.getItem("jwt")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProfileID(data);
      })
      .catch((error) => console.log(error));
  }, []);

  const followFonc = (boshqaUserId) => {
    fetch(`/followers/following`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `kimdir ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        boshqaUserId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "FOLLOWER",
          payload: {
            followers: data.following.follower,
            following: data.following.following,
          },
        });
        localStorage.setItem("users", JSON.stringify(data));
        setProfileID((proifileID) => {
          return {
            ...proifileID,
            user: {
              ...proifileID.user,
              follower: [...proifileID.user.follower, data._id],
            },
          };
        });
        setFollowerBtn(false);
      })
      .catch((err) => console.log(err));
  };

  const unFollowFonc = (boshqaUserId) => {
    fetch(`/followers/unFollowing`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `kimdir ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        boshqaUserId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "FOLLOWER",
          payload: {
            followers: data.following.follower,
            following: data.following.following,
          },
        });
        localStorage.setItem("users", JSON.stringify(data));
        setProfileID((proifileID) => {
          const newsFollower = proifileID.user.follower.filter(
            (s) => s !== data._id
          );
          return {
            ...proifileID,
            user: {
              ...proifileID.user,
              follower: newsFollower,
            },
          };
        });
        setFollowerBtn(true);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {proifileID ? (
        <div className="profile" style={{ marginBottom: "1rem" }}>
          <div className="container" id="mode">
            <div className="content">
              <div className="profilePhoto">
                <div className="image">
                  {proifileID.user.pic ? (
                    <img src={proifileID.user.pic} alt="rasm" />
                  ) : (
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png"
                      alt="rasm"
                    />
                  )}
                </div>
                <div className="name" style={{ textAlign: "center" }}>
                  <h5>{proifileID.user.name}</h5>
                  <h6>
                    <u>{proifileID.user.email}</u>
                  </h6>
                </div>
                {followerBtn ? (
                  <button
                    className="btn followBtn"
                    onClick={() => followFonc(proifileID.user._id)}
                  >
                    Follow Me
                  </button>
                ) : (
                  <button
                    className="btn followBtn"
                    onClick={() => unFollowFonc(proifileID.user._id)}
                  >
                    Unfollow Me
                  </button>
                )}
              </div>
              <div className="followers">
                <div className="f1 f">
                  <h2>{proifileID.user.follower.length}</h2>
                  <p>Followers</p>
                </div>
                <div className="f2 f">
                  <h2>{proifileID.user.following.length}</h2>
                  <p>Following</p>
                </div>
                <div className="f3 f">
                  {proifileID.post ? (
                    <h2>{proifileID.post.length}</h2>
                  ) : (
                    <h2>0</h2>
                  )}
                  <p>Posts</p>
                </div>
              </div>
            </div>
          </div>
          {proifileID.post ? (
            <div className="imgWrapper">
              {proifileID.post.map((item) => (
                <div key={item._id}>
                  <img
                    className="gradient-border"
                    src={item.pic}
                    alt={item._id}
                  />
                </div>
              ))}
            </div>
          ) : (
            <Not />
          )}
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default ProfileId;
