import React, {Component} from 'react';
import './App.css';
import logo from './logo.svg';

class App extends Component {

  constructor() {
    super();

    this.state = {
      sideNav: 'sideNav',
      app: 'app'
    }

    this.navBars = this
      .navBars
      .bind(this);
  }
  navBars() {
    if (this.state.sideNav === 'sideNavShow') {
      this.setState({sideNav: 'sideNavHide', app: 'appSlideIn'});
    } else {
      this.setState({sideNav: 'sideNavShow', app: 'appSlideOut'});
    }
  }
  render() {
    return (
      <div className="appRoot">
        <div className={this.state.app}>
          <header>
            <button className="nav" onClick={this.navBars}>
              <i className="fa fa-bars fa-2x"></i>
            </button>
            <img className="logo" src={logo} alt="logo"/>
            <div className="nav"></div>
          </header>
          <main>
            <h1>Main</h1>
          </main>
        </div>
        <div className={this.state.sideNav}>
          <h1>sideNav</h1>
        </div>
      </div>
    );
  }
}

export default App;
