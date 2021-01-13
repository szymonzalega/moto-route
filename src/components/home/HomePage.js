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
            <h1 className="homePage__title" data-testid="title">Ride. Collect. Repeat.</h1>
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
