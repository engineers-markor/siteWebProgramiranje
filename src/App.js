import React, {Component} from 'react';
import './App.css';
import {Link, Route, Switch} from 'react-router-dom';
import {app, base} from './base';
import Home from './components/Home';
import Courses from './components/Courses';
import About from './components/About';
import Login from './components/Login';
import Logout from './components/Logout';
import Lessons from './components/Lessons';

class App extends Component {

  constructor() {
    super();

    this.state = {
      sideNav: 'sideNav',
      app: 'app',
      user: {},
      auth: false,
      coursePath: ''
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
    if (this.state.sideNav === 'sideNavHide' || this.state.sideNav === 'sideNav') {
      this.setState({sideNav: 'sideNavShow', app: 'app appSlideOut'});
      document
        .body
        .classList
        .add('fixHeight');
    }
  }

  navBarsHide() {
    if (this.state.sideNav === 'sideNavShow') {
      this.setState({sideNav: 'sideNavHide', app: 'app appSlideIn'});
      document
        .body
        .classList
        .remove('fixHeight');

    }
  }

  componentWillMount() {
    this.removeAuthListener = app
      .auth()
      .onAuthStateChanged(user => {
        if (user) {
          base
            .fetch(`users/${user.uid}`, {context: this})
            .then(data => {
              this.setState({
                auth: true,
                user: {
                  uid: user.uid,
                  username: data.username,
                  photoUrl: data.photoUrl,
                  email: data.email
                }
              });
            })
            .catch(error => {});
        } else {
          this.setState({auth: false});
        }
      })

  }

  componentWillUnmount() {
    base.removeBinding(this.messagesRef);
    this.removeAuthListener();
  }

  render() {
    return (
      <div className="appRoot">
        <div className={this.state.sideNav}>
          <h1>Menu</h1>
          <nav className="navMenu">
            <Link className="navLink" to="/">Home</Link>
            <Link className="navLink" to="/courses">Courses</Link>
            <Link to="/about" className="navLink">About</Link>
          </nav>
        </div>
        <div className={this.state.app}>
          <header className="header">
            <button className="nav" onClick={this.navBarsToggle}>
              <i className="fa fa-bars fa-2x" aria-hidden="true"></i>
            </button>
            <Link className="logo" to="/">
              {/* <img src={logo} alt="logo"/> */}
              <h1>Learn Code</h1>
            </Link>
            {!this.state.auth
              ? <button className="nav">
                  <Link to="/login">
                    <i className="fa fa-sign-in fa-2x" aria-hidden="true"></i>
                  </Link>
                </button>
              : <button className="nav">
                <Link to="/logout">
                  <i className="fa fa-sign-out fa-2x" aria-hidden="true"></i>
                </Link>
              </button>
}
          </header>
          <main className="main" onClick={this.navBarsHide}>
            <Switch>
              <Route path="/" exact render={() => (<Home navBarsHide={this.navBarsHide}/>)}/>
              <Route
                exact
                path="/courses"
                render={() => (<Courses navBarsHide={this.navBarsHide}/>)}/>
              <Route path="/about" render={() => (<About navBarsHide={this.navBarsHide}/>)}/>
              <Route
                path="/login"
                render={() => {
                this.login = true;
                return <Login navbarsHide={this.navBarsHide}/>;
              }}/>
              <Route
                path="/logout"
                render={() => (<Logout navbarsHide={this.navBarsHide}/>)}/>
              <Route
                path="/courses/:id"
                children={(props) => {
                return <Lessons id={props.match.params.id} auth={this.state.auth}/>;
              }}/>
            </Switch>
          </main>
        </div>
      </div>
    );
  }
}

export default App;
