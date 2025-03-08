import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <h2>Travel Share</h2>
      <div>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/signup">Signup</Link>
      </div>
    </nav>
  );
}

export default Navbar;
