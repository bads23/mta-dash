import React, { Component } from 'react'
import './sass/main.scss'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Sidebar from './components/sidebar'

import Stats from './components/stats'
import Products from './components/products'
import Orders from './components/orders'
import Users from './components/users'
import Clients from './components/clients'
import Posts from './components/posts'
import Events from './components/events'
import About from './components/about'


class Dashboard extends Component {
  render() {
    return (
      <>
        <Router>
          <Sidebar />
        </Router>
        
        <div className="middle">
          <Router>
            <Route exact path="/" component={Stats} />
            <Route path="/products/" component={Products} />
            <Route path="/orders/" component={Orders} />
            <Route path="/users/" component={Users} />
            <Route path="/clients/" component={Clients} />
            <Route path="/posts/" component={Posts} />
            <Route path="/events/" component={Events} />
            <Route path="/about/" component={About} />
          </Router>
        </div>
      </>
    )
  }
}

export default Dashboard