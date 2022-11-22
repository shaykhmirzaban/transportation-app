import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import SMLabel1 from "../../components/SMLabe1";
import SMLabel from "../../components/SMLabel";
import SMLoading from "../../components/SMLoading";
import {
  getItem,
  signInUser,
  user_is_signin,
} from "../../config/FirebaseMethods";
import { addItem } from "../../store/DataSlice";

// style
import "../../style/login.scss";

export default function Login() {
  let [currentValue, setCurrentValue] = useState({
    email: "",
    password: "",
  });
  let [error, setError] = useState("");
  let [loading, setLoading] = useState("");
  let [flag, setFlag] = useState("");
  let navigate = useNavigate();
  let [label, setLabel] = useState("");
  let dispatch = useDispatch();

  // if a user is signing so navigate it from home
  // useEffect(() => {
  //   user_is_signin().then((_) => {
  //     navigate("/dashboard");
  //   });
  // }, [0]);

  const currentV = (e) => {
    let { value, name } = e.target;
    setCurrentValue((val) => {
      return { ...val, [name]: value };
    });
  };

  const userData = (e) => {
    e.preventDefault();
    setLoading("wating...");

    signInUser(currentValue)
      .then((_) => {
        getItem("users");
        alert("Successfully Login");
        setError("");
        setLabel("successfully Login");
        navigate(`/`);
        localStorage.setItem("id", _.uid);
        dispatch(addItem(_.uid));
      })
      .catch((_) => {
        setError(_);
        setLoading("");
        setLabel(_);
      });
  };

  const hidePassword = () => {
    let psw = document.querySelector(".passwordField");
    setFlag(true);
    psw.type = "text";
  };

  const showPassword = () => {
    let psw = document.querySelector(".passwordField");
    setFlag(false);
    psw.type = "password";
  };

  return (
    <section className="login">
      <div className="leftSide">
        <div className="image2"></div>
      </div>

      <div className="rightSide">
        <div className="box">
          <div className="heading">
            <h1>Login</h1>
          </div>

          <form onSubmit={userData}>
            <input
              type="email"
              placeholder="Enter Email"
              name="email"
              onChange={currentV}
              required
            />
            <div className="password">
              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                onChange={currentV}
                required
                className="passwordField"
              />
              {flag ? (
                <i className="fa-solid fa-eye" onClick={showPassword}></i>
              ) : (
                <i className="fa-solid fa-eye-slash" onClick={hidePassword}></i>
              )}
            </div>

            <div className="buttonPart">
              {error ? <p className="error">{error}</p> : null}
            </div>

            {loading ? (
              <button>
                <SMLoading />
              </button>
            ) : (
              <button>Login</button>
            )}
          </form>

          <div className="switchPage">
            <p>
              don't have an account yet? <Link to="/">Sign up</Link>
            </p>
          </div>
        </div>
      </div>

      {label && <SMLabel name={label} />}
      {label && <SMLabel1 name={label} />}
    </section>
  );
}
