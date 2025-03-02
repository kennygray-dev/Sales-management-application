import { BrowserRouter as Router, Route, Routes, Link, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import PropTypes from "prop-types"; // ✅ Import PropTypes
import Register from "./components/Register";
import Login from "./components/Login";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import { FaSun, FaMoon } from "react-icons/fa";
import "./Nav.css";
import "./App.css";

// NavBar Component
const NavBar = ({ isAuthenticated, handleLogout, toggleTheme, isDarkMode }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  if (!isAuthenticated) {
    return isLoginPage ? null : (
      <nav className="navbar">
        <Link to="/login" className="nav-link">Login</Link>
      </nav>
    );
  }

  return (
    <nav className="navbar">
      {location.pathname === "/tasks" ? (
        <Link to="/task-form" className="nav-link">Add Task</Link>
      ) : location.pathname === "/task-form" ? (
        <Link to="/tasks" className="nav-link">My Tasks</Link>
      ) : null}
      <button className="logout-button" onClick={handleLogout}>Logout</button>
      <button className="theme-toggle-button" onClick={toggleTheme}>
        {isDarkMode ? <FaSun /> : <FaMoon />} 
      </button>
    </nav>
  );
};

// ✅ Add PropTypes validation
NavBar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  handleLogout: PropTypes.func.isRequired,
  toggleTheme: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return setIsAuthenticated(false);

        const response = await fetch("http://localhost:5000/api/auth/status", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        setIsAuthenticated(data.isAuthenticated);
      } catch {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  // Load theme preference from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
    }
  }, []);

  // Toggle theme and save preference to localStorage
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem("theme", newMode ? "dark" : "light");
      return newMode;
    });
  };

  const handleLogin = async (email, password) => {
    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  const handleRegister = (user) => {
    console.log("Registered user:", user);
  };

  return (
    <div className={isDarkMode ? "dark-mode" : "light-mode"}>
      <Router>
        <NavBar
          isAuthenticated={isAuthenticated}
          handleLogout={handleLogout}
          toggleTheme={toggleTheme}
          isDarkMode={isDarkMode}
        />
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register onRegister={handleRegister} />} />
          <Route path="/task-form" element={isAuthenticated ? <TaskForm /> : <Navigate to="/login" />} />
          <Route path="/tasks" element={isAuthenticated ? <TaskList /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to={isAuthenticated ? "/task-form" : "/login"} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
