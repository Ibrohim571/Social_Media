import { useState, useEffect } from "react";

function RightHome() {
  const [profile, setProfile] = useState([]);
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
  });

  return (
    <>
      {profile
        .map((item) => (
          <div className="card" key={item._id}>
            <div className="card-image">
              <img src={item.pic} alt={item._id} />
            </div>
            <div className="card-content">
              <b className="card-title" style={{ textAlign: "center" }}>
                {item.postedBy.name}
              </b>
              <b style={{ fontWeight: "bold" }}>{item.title}</b>

              <p>{item.body}</p>
            </div>
          </div>
        ))
        .reverse()}
    </>
  );
}

export default RightHome;
