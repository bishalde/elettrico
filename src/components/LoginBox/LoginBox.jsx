import "./LoginBox.css";

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import Cookies from "js-cookie";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../firebase/Firebase";
const auth = getAuth();

const LoginBox = () => {
  document.title = "Login | Elettrico";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [buttontext, setButtonText] = useState("Login");
  const navigate = useNavigate();

  const getCookie = async () => {
    try {
      const user = await Cookies.get("user");
      if (user != undefined) {
        navigate("/homepage");
      }
    } catch (error) {
      console.error("Error while getting the user cookie:", error);
    }
  };
  getCookie();

  const loginHandler = async () => {
    setButtonText("Logging...");
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user.providerData[0].email;
        setButtonText("Login");
        Cookies.set("user", user, { expires: 1, path: "/" });
        navigate("/homepage");
      })
      .catch((error) => {
        setButtonText("Login");
        if (error.code === "auth/invalid-login-credentials") {
          alert("Invalid Email or Password");
        }
        else if(error.code === "auth/invalid-email"){
          alert("Inalid Email");
        }
      });
  };

  return (
    <div className="loginMainBox">
      <div className="loginBox">
        <div className="leftBox">
          <div className="loginIntro">
            <h1>Welcome</h1>
            <h2>We are glad to see you back with us</h2>
          </div>

          <div className="inputBox">
            <div className="inputFields">
              <img
                width="32"
                height="32"
                src="https://img.icons8.com/pastel-glyph/32/person-male--v1.png"
                alt="person-male--v1"
              />
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className="inputFields">
              <img
                width="30"
                height="30"
                src="https://img.icons8.com/small/30/lock-2.png"
                alt="lock-2"
              />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              value={password}
              />
            </div>
            <button onClick={loginHandler}>Login</button>
            <h3>
              <strong>Login</strong> with others
            </h3>
            <button className="auth">
              {" "}
              <img
                width="30"
                height="30"
                src="https://img.icons8.com/color/48/google-logo.png"
                alt="google-logo"
              />
              <p>
                Login with <strong>Google</strong>
              </p>
            </button>
          </div>
        </div>
        <div className="rightBox">
          <img src="images/logo.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default LoginBox;
