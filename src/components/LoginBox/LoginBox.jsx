import React from "react";
import "./LoginBox.css";

const LoginBox = () => {
  return (
    <div className="loginMainBox">
      <div className="loginBox">
        <div className="leftBox">
          {/* <img className="logo" src="images/logo.png" alt="logo" /> */}
          <div className="loginIntro">
            <h1>Welcome</h1>
            <h2>We are glad to see you back with us</h2>
          </div>
          {/* <div className="loginIntro">
            <h1>Login</h1>
          </div> */}
          <div className="inputBox">
            <div className="inputFields">
              <img
                width="32"
                height="32"
                src="https://img.icons8.com/pastel-glyph/32/person-male--v1.png"
                alt="person-male--v1"
              />
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Username"
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
              />
            </div>
            <button>Login</button>
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
