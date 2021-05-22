import React, { useState, useContext } from "react";
import Input1 from "../../common/inputs";
import Api from "../../config/settings";
import { UserContext } from "../context";

const LoginForm = () => {
  const context = useContext(UserContext);
  const [email, setEmail] = useState("stevekaruma@gmail.com");
  const [password, setPassword] = useState("Kazee1233");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const errorMsg = (msg) => {
    var errDiv = document.getElementById("errorDiv");
    errDiv.style.visibility = "visible";
    errDiv.innerHTML = `<p>${msg}</p>`;
    setTimeout(() => {
      errDiv.innerHTML = "&nbsp;";
      errDiv.style.visibility = "hidden";
    }, 5000);
  };

  const disableBtn = (msg) => {
    var btn = document.getElementById("subBtn");
    btn.disabled = "disabled";
    btn.innerText = `${msg}`;
  };

  const enableBtn = (msg) => {
    var btn = document.getElementById("subBtn");
    btn.disabled = "";
    btn.innerText = `${msg}`;
  };

  const updateContext = () => {
    Api.me.get().then((res) => {
      if (res.data.is_staff) {
        context.setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
      } else {
        errorMsg("Authorization Failed!");
        disableBtn("Login failed!");
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      errorMsg("Email and Password are required!");
      console.log("try again");
    } else {
      disableBtn("logging in ...");
      var payload = {
        email: email,
        password: password,
      };

      Api.auth
        .post(payload)
        .then((res) => {
          localStorage.setItem("tokens", JSON.stringify(res.data));
          updateContext();
        })
        .catch((error) => {
          if (!error.response) {
            errorMsg("Network Error! Try again Later.");
          } else {
            errorMsg("Incorrect Email or password");
          }
          enableBtn("Login");
          console.log(JSON.stringify(error));
        });
    }
  };

  return (
    <form id="loginForm" onSubmit={handleSubmit}>
      <h1 className="playfair-xlg mg-v-50">Login</h1>
      <Input1
        label="Email Address"
        type="email"
        ph="Your email here"
        id="authEmail"
        value={email}
        onChange={handleEmail}
        required="required"
      />
      <Input1
        label="Password"
        type="password"
        ph="Your password"
        id="authPass"
        value={password}
        onChange={handlePassword}
        required="required"
      />
      <div id="errorDiv" className="lato-sm mg-v-20">
        &nbsp;
      </div>
      <button className="btn btn-full mg-v-50" id="subBtn">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
