import { Link } from "react-router-dom";
import axios from "axios";

export default function SignUp() {
  const postData = () => {
    axios
      .post(
        "/signup",
        {
          name: "",
          email: "",
          password: "",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      // .then((res) => res.json())
      .then(({ data }) => {
        console.log(data);
      });
  };
  return (
    <div className="mycard">
      <div className="card card__auth ">
        <h2>Milliygramm</h2>
        <div class="input-field col s6">
          <i class="material-icons prefix">verified_user</i>
          <input id="icon_prefix" type="text" class="validate" />
          <label for="icon_prefix">Ismingiz</label>
        </div>
        <div class="input-field col s6">
          <i class="material-icons prefix">email</i>
          <input id="icon_prefix" type="text" class="validate" />
          <label for="icon_prefix">Pochta manzilingiz</label>
        </div>
        <div class="input-field col s6">
          <i class="material-icons prefix">password</i>
          <input id="icon_prefix" type="text" class="validate" />
          <label for="icon_prefix">Parolingiz</label>
        </div>
        <button
          onClick={() => postData()}
          className="waves-effect waves-light btn #0d47a1 blue darken-4"
        >
          Ro'yhatdan o'tish
        </button>

        <p>
          <Link to="/signin">Avval ro'yhatdan o'tganmisiz?</Link>
        </p>
      </div>
    </div>
  );
}
