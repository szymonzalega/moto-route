import React from "react";
import "./Dashboard.scss";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="dashboardPage">
      <div className="dashboardPage__background"></div>
      <div className="dashboardPage__content">
        <section>
          <h2>Welcome to moto route app!</h2>
          <br />
          <h4>
            The App was created by motorcyclist for motorcyclists.<br /> 
            Add, collect and share your favourites motorcycle route with your friends.<br /><br />
            Dashboard page in progress, check other...
          </h4>

          <Link
            to="/index/routes"
            className="dashboardPage__button"
            data-testid="routes"
          >
            Routes
          </Link>
        </section>
      </div>
    </div>
  );
}
