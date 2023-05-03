import { useEffect, createContext, useReducer, useContext } from "react";
import { reduser, initialState } from "./reduser/reduser";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import "./style/asosiy.scss";
import Post from "./pages/Post";
import ProfileId from "./pages/ProfileId";
import FollowerPosts from "./pages/FollowerPosts";

export const UserContext = createContext();
const Rotuting = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const follower = JSON.parse(localStorage.getItem("users"));
    if (user) {
      dispatch({ type: "USER", payload: user });
      dispatch({
        type: "FOLLOWER",
        payload: {
          followers: follower.follower,
          following: follower.following,
        },
      });
    } else {
      history.push("/login");
    }
  }, []);
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/profile" exact component={Profile} />
      <Route path="/post" component={Post} />
      <Route path="/profile:id" exact component={ProfileId} />
      <Route path="/followerspost" component={FollowerPosts} />
    </Switch>
  );
};

function GramClone() {
  const [state, dispatch] = useReducer(reduser, initialState);
  return (
    <UserContext.Provider value={{ state, dispatch }}>
      <Router>
        <Navbar />
        <Rotuting />
      </Router>
    </UserContext.Provider>
  );
}

export default GramClone;
