import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
//import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import addOrganisasi from "./components/organisasi-add.component";
import organisasi from "./components/organisasi.component";
import organisasiList from "./components/organisasi-list.component";

class App extends Component {
  render() {
    return (
       <Router>
        <div>
          <nav className="navbar navbar-expand navbar-dark bg-dark fixed-top">
            <a href="#"  className="navbar-brand">
              e-Administrasi
            </a>
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to={"/organisasi"} className="nav-link">
                List Organisasi
                </Link> 
              </li>
              <li className="nav-item">
                <Link to={"/add"} className="nav-link">
                Add Organisasi
                </Link> 
              </li>
            </div>
          </nav>

          <div className="container mt-3">
            <Switch>
              <Route exact path={["/", "/organisasi"]} component={organisasiList} />
              <Route exact path="/add" component={addOrganisasi} />
              <Route path="/organisasi/:id" component={organisasi} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;