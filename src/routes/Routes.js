import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import Loader from "components/Loader/Loader.component";

const Header = lazy(() => import("components/Header/Header.component"));
const Home = lazy(() => import("containers/Home"));
const Profile = lazy(() => import("containers/Profile"));
const AddQuestion = lazy(() => import("containers/AddQuestion"));
const QuestionWithAnswer = lazy(() => import("components/Questions/Question.component"));
export default () => (
  <div>
    <Suspense fallback={<Loader />} >
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/me" component={Profile} />
        <Route exact path="/question/edit/:id" component={Home} />
        <Route exact path="/question/:id" component={QuestionWithAnswer} />
        <Route exact path="/add-question" component={AddQuestion} />
        <Route render={props => (
          <h1> 404 No Page Found on this route</h1>
        )} />
      </Switch>
    </Suspense>
  </div>
);
