import { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link
import { FaEnvelope, FaLock } from "react-icons/fa"; // Import icons
import "./Login.css";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Include cookies
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Store token in localStorage
        localStorage.setItem("token", data.token);
  
        // Update authentication state
        onLogin(data.user);
  
        // Redirect to task form
        navigate("/task-form");
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      setError("Network error, please try again");
    }
  };
  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Login to your account</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              className="login-input"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              className="login-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">Login</button>
          {error && <p className="error-message">{error}</p>}
        </form>

        {/* Link to Registration Page */}
        <p className="register-link">
          Don't have an account?{" "}
          <Link to="/register">Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;