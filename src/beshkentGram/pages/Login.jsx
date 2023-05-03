import { useState, useContext } from "react";
import { UserContext } from "../GramClone";
import { Link, useHistory } from "react-router-dom";
import "../style/sign.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const [active, setActive] = useState(true);
  const [regName, setregName] = useState("");
  const [regpassword, setregpassword] = useState("");
  const [regEmail, setregEmail] = useState("");
  const [logEmail, setlogEmail] = useState("");
  const [logPassword, setlogPassword] = useState("");

  const signFunc = () => {
    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (active === true) {
      if (!re.test(regEmail)) {
        toast("Emailni to'g'ri kiriting");
        return;
      }
      fetch("/signup/", {
        body: JSON.stringify({
          name: regName,
          email: regEmail,
          password: regpassword,
        }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            toast(data.error);
          }
          if (data.msg) {
            toast(data.msg);
            setActive(false);
          }
        });
    }
    if (active === false) {
      if (!re.test(logEmail)) {
        toast("Emailni to'g'ri kiriting");
        return;
      }
      fetch("/signIn/", {
        body: JSON.stringify({
          email: logEmail,
          password: logPassword,
        }),
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            toast(data.error);
          }
          if (data.token) {
            toast("Siz saytga kirdingiz");
            console.log(data.user.follower);
            dispatch({ type: "USER", payload: data.user });
            localStorage.setItem("jwt", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            const follower = {
              follower: data.user.follower,
              following: data.user.following,
            };
            localStorage.setItem("users", JSON.stringify(follower));
            history.push("/");
          }
        });
    }
  };

  return (
    <div className="signIn">
      <div style={{ position: "absolute", top: "1.5rem", right: "3rem" }}>
        <ToastContainer />
      </div>
      <div
        className={active ? "container right-panel-active" : "container"}
        id="container"
      >
        <div className="form-container sign-up-container">
          <div className="form">
            <h1 style={{ fontSize: "33px" }}>Account yaratish</h1>
            <div className="social-container">
              <Link href="#" className="social">
                <i className="fab fa-facebook-f"></i>
              </Link>
              <Link href="#" className="social">
                <i className="fab fa-google-plus-g"></i>
              </Link>
              <Link href="#" className="social">
                <i className="fab fa-linkedin-in"></i>
              </Link>
            </div>
            <span>or use your email for registration</span>
            <input
              type="text"
              placeholder="Name"
              onChange={(e) => setregName(e.target.value)}
              value={regName}
            />
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setregEmail(e.target.value)}
              value={regEmail}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setregpassword(e.target.value)}
              value={regpassword}
            />
            <button onClick={() => signFunc()}>Ro'yhatdan o'tish</button>
          </div>
        </div>
        <div className="form-container sign-in-container">
          <div className="form">
            <h1>Sign in</h1>
            <div className="social-container">
              <Link href="#" className="social">
                <i className="fa fa-facebook-f"></i>
              </Link>
              <Link href="#" className="social">
                <i className="fab fa-google-plus-g"></i>
              </Link>
              <Link href="#" className="social">
                <i className="fab fa-linkedin-in"></i>
              </Link>
            </div>
            <span>or use your account</span>
            <input
              type="email"
              placeholder="Email"
              value={logEmail}
              onChange={(e) => setlogEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={logPassword}
              onChange={(e) => setlogPassword(e.target.value)}
            />
            <Link href="#">Forgot your password?</Link>
            <button onClick={() => signFunc()}>Sign In</button>
          </div>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button
                className="ghost"
                id="signIn"
                onClick={() => setActive(false)}
              >
                Sign In
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button
                className="ghost"
                id="signUp"
                onClick={() => setActive(true)}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
