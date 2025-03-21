import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";
import { ComponentInterface } from "../interfaces/component-interface";
import { ErrorResponse } from "../interfaces/error-interface";

const LoginComponent: React.FC<ComponentInterface> = ({
  currentUser,
  setCurrentUser,
}) => {
  const nagivate = useNavigate();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [message, setMessage] = useState("");

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    try {
      let response = await AuthService.login(email, password);
      localStorage.setItem("user", JSON.stringify(response.data));
      window.alert(
        "Login successful. You will now be redirected to your profile page.。"
      );
      setCurrentUser(AuthService.getCurrentUser());
      nagivate("/profile");
    } catch (e: unknown) {
      if (typeof e === "object" && e !== null && "response" in e) {
        const error = e as ErrorResponse;
        setMessage(error.response.data);
      } else {
        setMessage("An unexpected error occurred.");
      }
    }
  };

  return (
    <div style={{ padding: "3rem" }} className="col-md-12 inter-font">
      <div>
        {message && <div className="alert alert-danger">{message}</div>}
        <div className="form-group">
          <label htmlFor="username">Email:</label>
          <input
            onChange={handleEmail}
            type="text"
            className="form-control"
            name="email"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            onChange={handlePassword}
            type="password"
            className="form-control"
            name="password"
          />
        </div>
        <br />
        <div className="form-group">
          <button onClick={handleLogin} className="btn btn-primary btn-block">
            <span>Login</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
