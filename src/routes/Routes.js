import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import Loader from "components/Loader/Loader.component";

const Header = lazy(() => import("components/Header/Header.component"));
const Home = lazy(() => import("containers/Home"));
const Profile = lazy(() => import("containers/Profile"));
export default () => (
  <div>
    <Suspense fallback={<Loader />} >
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/me" component={Profile} />
        <Route render={props => (
          <h1> 404 No Page Found on this route</h1>
        )} />
      </Switch>
    </Suspense>
  </div>
);