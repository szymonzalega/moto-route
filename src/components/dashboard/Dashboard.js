import React from "react";
import "./Dashboard.scss";
import { Link } from "react-router-dom";
import { SecondaryButton } from "../buttons/Button";

export default function Dashboard() {
  return (
    <div className="dashboardPage">
      <div className="dashboardPage__background"></div>
      <div className="dashboardPage__content">
        <section>
          <h2>Welcome to moto route app!</h2>
          <br />
          <h4>
            The App was created by motorcyclist for motorcyclists.
            <br />
            Add, collect and share your favourites motorcycle routes with your
            friends.
            <br />
            <br />
            Dashboard page in progress, check other...
          </h4>

          <div className="content__buttonRow">
            <Link to="/index/routes" data-testid="routes">
              <SecondaryButton>Routes</SecondaryButton>
            </Link>
            <Link to="/index/gallery/routes" data-testid="routes">
              <SecondaryButton>Gallery</SecondaryButton>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
