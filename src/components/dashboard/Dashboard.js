import React from "react";
import "./Dashboard.scss";
import { Link } from "react-router-dom";
import { SecondaryButton } from "../buttons/Button";
import ContentElement from "../content/ContentElement";

export default function Dashboard() {
  return (
    <div className="dashboardPage">
      <div className="dashboardPage__background"></div>
      <div className="dashboardPage__content">
        <ContentElement>
          <section>
            <h3>Welcome to moto route app!</h3>
            <br />
            <h5>
              The App was created by motorcyclist for motorcyclists.
              <br />
              Add, collect and share your favourites motorcycle routes with your
              friends.
              <br />
              <br />
              Pssst... Dashboard page is in progress, check other...
            </h5>

            <div className="content__buttonRow">
              <Link to="/index/routes">
                <SecondaryButton>Routes</SecondaryButton>
              </Link>
              <Link to="/index/gallery/routes">
                <SecondaryButton>Gallery</SecondaryButton>
              </Link>
            </div>
          </section>
        </ContentElement>
      </div>
    </div>
  );
}
