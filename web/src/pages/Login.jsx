import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

import "../styles/Login.css";
import { decodeToken } from "react-jwt";

export const Login = () => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // sprecuva defaulten refresh na formata
    try {
      const res = await axios.post(
        "http://localhost:10000/api/v1/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      // { success: true, token: "nasiot token" }

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        const decoded = decodeToken(res.data.token);
        if (decoded.role === "admin") {
          navigate("/users");
        } else {
          navigate("/");
        }
      } else {
        setError(res.data.error || "Login error!");
      }
    } catch (err) {
      console.log(err);
      setError("Server erorr!");
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form className="form-container" onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password</label>
        <input
          type="password"
          placeholder="Your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <div style={{ color: "red", marginBottom: 8 }}>{error}</div>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
