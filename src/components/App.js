import React from "react";
import Login from "./Login";
import Notifications from "./Notifications";
import Eisenhower from "./Eisenhower";
import Header from "./Header";
import { BrowserRouter as Router, Route } from "react-router-dom";

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div className="app">
          <Notifications /> 
          <Header />
          <Route path="/login" component={Login} />
          <Route exact path="/" component={Eisenhower} />
        </div>
      </Router>
    );
  }
}

