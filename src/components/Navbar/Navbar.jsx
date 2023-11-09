import "./Navbar.css";
import React from "react";
import {Link, useNavigate } from "react-router-dom";

import Cookies from "js-cookie";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    Cookies.remove("user");
    navigate("/");
  };

  return (
    <section className="navbar">
      <Link to="/homepage">
        <img className="logo" src="images/logo.png" alt="Logo" />
      </Link>
      <button className="logout" onClick={handleLogout}>
        Logout
      </button>
    </section>
  );
};

export default Navbar;
