import React from "react";
import "./Home.scss";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="auth">
      <div className="auth__title" data-testid="title">
        <span>Ride.</span>
        <span>Collect.</span>
        <span>Repeat.</span>
      </div>
      <nav className="auth__buttonBox">
        <Link to="/auth/login" className="auth__button" data-testid="login">
          Login
        </Link>
        <Link
          to="/auth/signup"
          className="auth__button auth__button--primary"
          data-testid="signup"
        >
          Signup
        </Link>
      </nav>
    </div>
  );
}
