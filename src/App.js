import React, { Suspense } from "react";
// import logo from "./logo.svg";
// import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import "font-awesome/css/font-awesome.css";
// import LoginComponent from "../src/auth/LoginComponent";
import Login from "../src/auth";
import { BrowserRouter, Route, Switch } from "react-router-dom";

const Registration = React.lazy(() =>
  import("../src/auth/RegistrationComponent")
);
const Home = React.lazy(() => import("../src/components/HomeComponent"));
const Watch = React.lazy(() => import("../src/components/WatchedMoviesList"));

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact strict component={Login} />
        <Suspense fallback={<div>Loading...</div>}>
          <Route path="/registration" exact render={() => <Registration />} />
          <Route path="/home" exact render={() => <Home />} />
          <Route path="/watchedMovies" exact render={() => <Watch />} />
        </Suspense>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
