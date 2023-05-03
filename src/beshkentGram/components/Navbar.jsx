import { useContext, useState } from "react";
import { UserContext } from "../GramClone";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "../style/Navbar.scss";

function Navbar() {
  const [search, setSearch] = useState(true);
  const { state, dispatch } = useContext(UserContext);
  const [inputSearch, setInputSearch] = useState("");
  const [filterUser, setFilterUser] = useState([]);
  const history = useHistory();

  const searchFilter = (query) => {
    fetch("/followers/searchFilter/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setFilterUser(data.user);
      })
      .catch((e) => console.log(e));
  };

  return (
    <>
      <div className="nav indigo darken-2">
        <div className="nav-header">
          <Link to={state ? "/" : "/login"}>MY_GRAM</Link>
        </div>
        {state ? (
          <div className="nav-links">
            <Link to="/profile">
              <i className="small material-icons">person</i>
            </Link>
            <Link to="/post">
              <i className="small material-icons">local_post_office</i>
            </Link>
            <Link onClick={() => setSearch(!search)}>
              <i className="small material-icons">search</i>
            </Link>
            <Link>
              <i
                className="small material-icons"
                style={{ color: "#e53935", cursor: "pointer" }}
                onClick={() => {
                  localStorage.clear();
                  dispatch({ type: "CLEAR" });
                  history.push("/login");
                }}
              >
                exit_to_app
              </i>
            </Link>
          </div>
        ) : (
          <div className="nav-links">
            <Link to="/login">Login</Link>
          </div>
        )}
      </div>
      {search ? null : (
        <div className="searchModal">
          <i className="material-icons close" onClick={() => setSearch(true)}>
            close
          </i>
          <input
            className="text"
            placeholder="Search..."
            value={inputSearch}
            onChange={(e) => {
              searchFilter(e.target.value);
              setInputSearch(e.target.value);
            }}
          />
          <ul className="collection">
            {filterUser.map((items) => (
              <Link
                to={
                  state.state._id !== items._id
                    ? `profile${items._id}`
                    : `/profile`
                }
                key={items._id}
                onClick={() => setSearch(true)}
              >
                <li className="collection-item avatar">
                  {items.pic ? (
                    <i className="circle">
                      <img
                        src={items.pic}
                        alt={items.name}
                        style={{ width: "100%", height: "100%" }}
                      />
                    </i>
                  ) : (
                    <i className="circle">
                      <img
                        src="https://cdn-icons-png.flaticon.com/128/3135/3135715.png"
                        alt="rasm"
                        style={{ width: "100%", height: "100%" }}
                      />
                    </i>
                  )}
                  <span className="title">{items.name}</span>
                  <p>
                    {items.email} <br />
                    Second Line
                  </p>
                </li>
              </Link>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default Navbar;
