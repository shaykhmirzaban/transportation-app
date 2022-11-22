import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SMLabel1 from "../../components/SMLabe1";
import SMLabel from "../../components/SMLabel";
import SMLoading from "../../components/SMLoading";
import { createUser, user_is_signin } from "../../config/FirebaseMethods";

// style
import "../../style/login.scss";

export default function SignUp() {
  let [currentValue, setCurrentValue] = useState({
    name: "",
    email: "",
    password: "",
  });
  let [error, setError] = useState("");
  let [loading, setLoading] = useState("");
  let navigate = useNavigate();
  let [flag, setFlag] = useState(false);
  let [label, setLabel] = useState("");

  // if a user is signing so navigate it from home
  useEffect(() => {
    user_is_signin().then((_) => {
      navigate("/");
    });
  }, [0]);

  const currentV = (e) => {
    let { value, name } = e.target;
    setCurrentValue((val) => {
      return { ...val, [name]: value };
    });
  };

  const userData = (e) => {
    console.log(currentValue);

    e.preventDefault();
    setLoading("wating...");
    createUser(currentValue)
      .then((_) => {
        alert(_);
        setError("");
        setLabel("Successfully Sign up");
        navigate("/login");
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
    <section className="SignUp">
      <div className="leftSide">
        <div className="image1"></div>
      </div>
      <div className="rightSide">
        <div className="box">
          <div className="heading">
            <h1>SignUp</h1>
          </div>

          <form onSubmit={userData}>
            <input
              className="name"
              type="text"
              placeholder="Enter your name"
              name="name"
              onChange={currentV}
              required
            />

            <input
              className="input"
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
              <button>Sign up</button>
            )}
          </form>

          <div className="switchPage">
            <p>
              You have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>

      {label && <SMLabel name={label} />}
      {label && <SMLabel1 name={label} />}
    </section>
  );
}
