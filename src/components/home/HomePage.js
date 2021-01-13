import React from "react";
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
        <div>
          Witaj!
          <Link to="/login" className="btn btn-primary w-100 mt-3" data-testid="login">
            Login
          </Link>
          <Link to="/signup" className="btn btn-primary w-100 mt-3" data-testid="signup">
            Signup
          </Link>
        </div>
      )}
    </>
  );
}
