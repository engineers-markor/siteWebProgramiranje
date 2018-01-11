import React, {Component} from 'react';
import './App.css';
import logo from './logo.svg';
import {Link, Route, Switch} from 'react-router-dom';
import Home from './components/Home';
import Lesson from './components/Lesson';
import About from './components/About';

class App extends Component {

  constructor() {
    super();

    this.state = {
      sideNav: 'sideNav',
      app: 'app'
    }

    this.navBarsToggle = this
      .navBarsToggle
      .bind(this);
    this.navBarsShow = this
      .navBarsShow
      .bind(this);
    this.navBarsHide = this
      .navBarsHide
      .bind(this);
  }
  navBarsToggle() {
    if (this.state.sideNav === 'sideNavShow') {
      this.navBarsHide();
    } else {
      this.navBarsShow();
    }
  }

  navBarsShow() {
    this.setState({sideNav: 'sideNavShow', app: 'appSlideOut'});
    document
      .body
      .classList
      .add('fixHeight');
  }

  navBarsHide() {
    this.setState({sideNav: 'sideNavHide', app: 'appSlideIn'});
    document
      .body
      .classList
      .remove('fixHeight');
  }

  render() {
    return (
      <div className="appRoot">
        <div className={this.state.sideNav}>
          <h1>Title</h1>
          <nav className="navMenu">
            <Link className="navLink" to="/">Home</Link>
            <Link className="navLink" to="/lessons">Lessons</Link>
            <Link to="/about" className="navLink">About</Link>
          </nav>
        </div>
        <div className={this.state.app}>
          <header>
            <button className="nav" onClick={this.navBarsToggle}>
              <i className="fa fa-bars fa-2x" aria-hidden="true"></i>
            </button>
            <img className="logo" src={logo} alt="logo"/>
            <button className="nav">
              <Link to="/login">
                <i className="fa fa-sign-in fa-2x" aria-hidden="true"></i>
              </Link>
            </button>
          </header>
          <main>
            <Switch>
              <Route
                path="/"
                exact
                render={() => (<Home sideNav={this.state.sideNav} navBarsHide={this.navBarsHide}/>)}/>
              <Route
                path="/lessons"
                render={() => (<Lesson sideNav={this.state.sideNav} navBarsHide={this.navBarsHide}/>)}/>

              <Route
                path="/about"
                render={() => (<About sideNav={this.state.sideNav} navBarsHide={this.navBarsHide}/>)}/>
            </Switch>
          </main>
        </div>
      </div>
    );
  }
}

export default App;
