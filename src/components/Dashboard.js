import React from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import RoutePage from "./routes/RoutePage";
import UserProfile from "./UserProfile";
import UpdateProfile from "./UpdateProfile";
import ManageRoute from "./routes/ManageRoute";
import RoutesGalleryPage from "./routes/RoutesGalleryPage";

export default function Dashboard() {

  return (
    <>
      <Header />
      <Switch>
        <Route path="/index/routes" component={RoutePage} />
        <Route path="/index/gallery/:id" component={RoutesGalleryPage} />
        {/* <Route path="/index/route/:id" component={ManageRoute} /> */}
        {/* <Route path="/index/route" component={ManageRoute} /> */}
        <Route exact path="/index/user-profile" component={UserProfile} />
        <Route
          path="/index/user-profile/update-profile"
          component={UpdateProfile}
        />
      </Switch>
    </>
  );
}
