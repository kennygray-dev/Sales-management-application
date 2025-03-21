import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiShoppingCart, FiBarChart2, FiPlusCircle, FiLogOut } from "react-icons/fi";
import "./Navbar.scss";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setIsAuthenticated(localStorage.getItem("token") !== null);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setIsOpen(false);
    navigate("/");
  };

  if (location.pathname === "/") return null;

  return (
    <>
      {/* Mobile Navigation */}
      <nav className="navbar mobile-only">
        <FiMenu className="menu-icon" onClick={() => setIsOpen(true)} />
      </nav>

      {/* Desktop Navigation */}
      <nav className="desktop-navbar">
        <div className="desktop-navbar-container">
          <img src="/icons/logo1-192x192.png" alt="Dakestel Logo" className="desktop-logo" />
          <div className="desktop-nav-links">
            {location.pathname !== "/orders" && (
              <Link to="/orders" className="desktop-nav-link">
                <FiShoppingCart className="desktop-nav-icon" /> Orders
              </Link>
            )}
            {location.pathname !== "/metrics" && (
              <Link to="/metrics" className="desktop-nav-link">
                <FiBarChart2 className="desktop-nav-icon" /> Dashboard
              </Link>
            )}
            {location.pathname !== "/create-order" && (
              <Link to="/create-order" className="desktop-nav-link">
                <FiPlusCircle className="desktop-nav-icon" /> Create Order
              </Link>
            )}
            {isAuthenticated && (
              <button className="desktop-logout-button" onClick={handleLogout}>
                <FiLogOut className="desktop-nav-icon" /> Logout
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Sidebar Navigation */}
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <FiX className="close-icon" onClick={() => setIsOpen(false)} />
        <img src="/icons/logo1-192x192.png" alt="Dakestel Logo" className="sidebar-logo" />
        <ul>
          {location.pathname !== "/orders" && (
            <li>
              <Link to="/orders" onClick={() => setIsOpen(false)}>
                <FiShoppingCart className="nav-icon" /> Orders
              </Link>
            </li>
          )}
          {location.pathname !== "/metrics" && (
            <li>
              <Link to="/metrics" onClick={() => setIsOpen(false)}>
                <FiBarChart2 className="nav-icon" /> Dashboard
              </Link>
            </li>
          )}
          {location.pathname !== "/create-order" && (
            <li>
              <Link to="/create-order" onClick={() => setIsOpen(false)}>
                <FiPlusCircle className="nav-icon" /> Create Order
              </Link>
            </li>
          )}
        </ul>
        {isAuthenticated && (
          <button className="logout-button" onClick={handleLogout}>
            <FiLogOut className="logout-icon" /> Logout
          </button>
        )}
      </div>
    </>
  );
};

export default Navbar;