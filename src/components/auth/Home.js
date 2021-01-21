import React from "react";
import "./Home.scss";
import { Link } from "react-router-dom";
import { PrimaryButton, SecondaryButton } from "../buttons/Button";

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
          <Link to="/auth/login" data-testid="login">
            <SecondaryButton>Login</SecondaryButton>
          </Link>
          <Link
            to="/auth/signup"
            data-testid="signup"
          >
            <PrimaryButton>Signup</PrimaryButton>
          </Link>
        </nav>
      </div>
    </div>
  );
}
