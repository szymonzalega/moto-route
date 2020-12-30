import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import Header from "./Header";
import RoutePage from "./routes/RoutePage";
import UserProfile from "./UserProfile";
import UpdateProfile from "./UpdateProfile";
import RoutesGalleryPage from "./routes/gallery/RoutesGalleryPage";

export default function Dashboard() {
  let { path } = useRouteMatch();

  return (
    <>
      <Router>
        <Header />
        <Switch>
          <Route exact path={`${path}`}>
            <h3>Dashboard</h3>
          </Route>
          <Route path={`${path}/routes`}>
            <RoutePage />
          </Route>
          <Route path={`${path}/gallery/:id`}>
            <RoutesGalleryPage />
          </Route>
          {/* TODO - do poprawy - nested */}
          {/* <Route exact path="/index/user-profile" component={UserProfile} />
          <Route
            path="/index/user-profile/update-profile"
            component={UpdateProfile}
          /> */}
        </Switch>
      </Router>
    </>
  );
}
