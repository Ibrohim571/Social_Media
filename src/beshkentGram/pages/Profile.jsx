import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Not from "../components/Not";
import { UserContext } from "../GramClone";
import "../style/profile.scss";
import Setting from "./Setting";

function Profile() {
  const { state, dispatch } = useContext(UserContext);
  const [profile, setProfile] = useState([]);
  const [setting, setSetting] = useState(false);
  useEffect(() => {
    fetch("/posts/myPost", {
      headers: {
        Authorization: `kimdir ${localStorage.getItem("jwt")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setProfile(data.result);
      });
  }, []);

  return (
    <div className="profile" style={{ marginBottom: "1rem" }}>
      <div
        style={{
          display: "inline-block",
          cursor: "pointer",
          width: "1.5rem",
          height: "2.5rem",
        }}
        onClick={() => setSetting(!setting)}
      >
        <i className="small material-icons settingIcon">settings</i>
      </div>
      {setting ? (
        <Setting setSetting={setSetting} />
      ) : (
        <div className="container" id="mode">
          <div className="content">
            <div className="profilePhoto">
              <div className="image">
                {state ? (
                  state.state.pic ? (
                    <img src={state.state.pic} alt="rasm" />
                  ) : (
                    <img
                      src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png"
                      alt="rasm"
                    />
                  )
                ) : (
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png"
                    alt="rasm"
                  />
                )}
              </div>
              <div className="name" style={{ textAlign: "center" }}>
                {state ? <h5>{state.state.name}</h5> : <h5>None</h5>}
                <h6>{state ? <u>{state.state.email}</u> : <h5>None</h5>}</h6>
              </div>
            </div>
            <div className="followers">
              <div className="f1 f">
                {state ? (
                  state.following.followers ? (
                    <h2>{state.following.followers.length}</h2>
                  ) : (
                    <h2>{state.followers.length}</h2>
                  )
                ) : (
                  <h2>0</h2>
                )}
                <p>Followers</p>
              </div>
              <div className="f2 f">
                <Link to="/followerspost">
                  {state ? (
                    state.following.following ? (
                      <h2>{state.following.following.length}</h2>
                    ) : (
                      <h2>{state.following.length}</h2>
                    )
                  ) : (
                    <h2>0</h2>
                  )}
                  <p>Following</p>
                </Link>
              </div>
              <div className="f3 f">
                <h2>{profile.length}</h2>
                <p>Posts</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {profile.length ? (
        <div className="imgWrapper">
          {profile.map((item) => (
            <div key={item._id}>
              <img className="gradient-border" src={item.pic} alt={item._id} />
            </div>
          ))}
        </div>
      ) : (
        <Not />
      )}
    </div>
  );
}

export default Profile;
