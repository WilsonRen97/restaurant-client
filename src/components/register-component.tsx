import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthService from "../services/auth.service";

const RegisterComponent = () => {
  const navigate = useNavigate();
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [role, setRole] = useState("");
  let [message, setMessage] = useState("");

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };
  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleRole = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRole(e.target.value);
  };

  const handleRegister = () => {
    AuthService.register(username, email, password, role)
      .then(() => {
        window.alert(
          "Registration successful. You will now be redirected to the login page."
        );
        navigate("/login");
      })
      .catch((e) => {
        setMessage(e.response.data);
      });
  };

  return (
    <div style={{ padding: "3rem", fontFamily: "Inter" }}>
      <div>
        {message && <div className="alert alert-danger">{message}</div>}
        <div>
          <label htmlFor="username">Username:</label>
          <input
            onChange={handleUsername}
            type="text"
            className="form-control"
            name="username"
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="email">Email:</label>
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
            placeholder="The length must be at least 6 characters, including letters or numbers."
          />
        </div>
        <br />
        <div className="form-group">
          <label htmlFor="password">Role:</label>
          <input
            onChange={handleRole}
            type="text"
            className="form-control"
            placeholder="You can only select either customer or restaurateur."
            name="role"
          />
        </div>
        <br />
        <button onClick={handleRegister} className="btn btn-primary">
          <span>Register</span>
        </button>
      </div>
    </div>
  );
};

export default RegisterComponent;
