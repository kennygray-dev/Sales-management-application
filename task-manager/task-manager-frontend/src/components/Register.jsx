import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa"; 
import PropTypes from "prop-types"; // Import PropTypes
import "./Register.css";

const Register = ({ onRegister }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        onRegister(data.user); // Pass user data to parent component
        navigate("/login"); // Redirect to login page
      } else {
        setError(data.error || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error); // Log the error to the console
      setError("Network error, please try again");
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2 className="register-title">Create an account</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <FaUser className="input-icon" />
            <input
              type="text"
              className="register-input"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              className="register-input"
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
              className="register-input"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="register-button">Register</button>
          {error && <p className="error-message">{error}</p>}
        </form>
      </div>
    </div>
  );
};

// Define PropTypes for props validation
Register.propTypes = {
  onRegister: PropTypes.func.isRequired, // Ensures onRegister is a required function
};

export default Register;
