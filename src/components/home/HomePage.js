import React from "react";
import "./HomePage.scss";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function HomePage() {
  const { currentUser } = useAuth();
  const history = useHistory();

  const redirectToIndex = function () {
    history.push("/index");
  };

  return (
    <>
      {currentUser ? (
        redirectToIndex()
      ) : (
        <>
          <header>
            <div className="homePage__title" data-testid="title">
              <span>Ride.</span>
              <span>Collect.</span>
              <span>Repeat.</span>
            </div>
            <nav className="homePage__buttonBox">
              <Link
                to="/login"
                className="homePage__button"
                data-testid="login"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="homePage__button homePage__button--primary"
                data-testid="signup"
              >
                Signup
              </Link>
            </nav>
          </header>
          <div className="homePage__background"></div>
        </>
      )}
    </>
  );
}
