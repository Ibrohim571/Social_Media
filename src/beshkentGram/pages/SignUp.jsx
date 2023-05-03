import { Link } from "react-router-dom";
import "../style/sign.scss";

function SignUp() {
  return (
    <div className="container" style={{ marginTop: "30px" }}>
      <div className="col s12 card" id="reg-form">
        <h5 className="brand-logo" style={{ textAlign: "center" }}>
          BeshkentGram
        </h5>
        <div className="row">
          <div className="input-field col s12">
            <i className="material-icons prefix">person</i>
            <input id="first_name" type="text" className="validate" required />
            <label htmlFor="first_name">First Name</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <i className="material-icons prefix">email</i>
            <input id="email" type="email" className="validate" required />
            <label htmlFor="email">Email</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s12">
            <i className="material-icons prefix">password</i>
            <input
              id="password"
              type="password"
              className="validate"
              required
            />
            <label htmlFor="password">Password</label>
          </div>
        </div>
        <div className="row">
          <div className="input-field col s6">
            <button
              className="btn btn-large deep-purple darken-2 waves-effect waves-light registerButton"
              type="submit"
            >
              Register
            </button>
          </div>
        </div>
        <p style={{ textAlign: "center" }}>
          <Link to="/login">already have account ?</Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
