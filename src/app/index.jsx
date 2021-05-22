import React, { Component } from "react";
import "./sass/main.scss";
import { BrowserRouter as Router, Redirect, Route } from "react-router-dom";
import Sidebar from "./common/sidebar";

import Products from "./pages/products";
import Orders from "./pages/orders";
import Users from "./pages/users";
import Clients from "./pages/clients";
import Posts from "./pages/posts";
import Events from "./pages/events";
import About from "./pages/about";
import Music from "./pages/music";

class Dashboard extends Component {
  render() {
    return (
      <>
        <Router>
          <Sidebar />
        </Router>

        <div className="middle">
          <Router>
            <Route exact path="/">
              <Redirect to="/products/"></Redirect>
            </Route>
            <Route path="/products/" component={Products} />
            <Route path="/orders/" component={Orders} />
            <Route path="/users/" component={Users} />
            <Route path="/clients/" component={Clients} />
            <Route path="/posts/" component={Posts} />
            <Route path="/events/" component={Events} />
            <Route path="/about/" component={About} />
            <Route path="/music/" component={Music} />
          </Router>
        </div>
      </>
    );
  }
}

export default Dashboard;
