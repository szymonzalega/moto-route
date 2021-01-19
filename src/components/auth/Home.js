import React from "react";
import "./Home.scss";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="animate view home">
      <div className="animate home__content">
        <div className="home__title" data-testid="title">
          <span>Ride.</span>
          <span>Collect.</span>
          <span>Repeat.</span>
        </div>
        <nav className="home__buttonBox">
          <Link to="/auth/login" className="home__button" data-testid="login">
            Login
          </Link>
          <Link
            to="/auth/signup"
            className="home__button home__button--primary"
            data-testid="signup"
          >
            Signup
          </Link>
        </nav>
      </div>
    </div>
  );
}
