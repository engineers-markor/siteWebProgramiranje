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
      document
        .body
        .classList
        .remove('fixHeight');
    } else {
      this.setState({sideNav: 'sideNavShow', app: 'appSlideOut'});
      document
        .body
        .classList
        .add('fixHeight');
    }
  }
  render() {
    return (
      <div className="appRoot">
        <div className={this.state.sideNav}>

          <h1>Title</h1>
          <nav
            style={{
            display: 'flex',
            flexDirection: "column"
          }}>
            <a>Link 1</a>
            <a>Link 2</a>
            <a>Link 3</a>
          </nav>
        </div>

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
          <main>
            <h1>Main</h1>
          </main>
          <main>
            <h1>Main</h1>
          </main>
          <main>
            <h1>Main</h1>
          </main>
          <main>
            <h1>Main</h1>
          </main>
          <main>
            <h1>Main</h1>
          </main>
          <main>
            <h1>Main</h1>
          </main>
          <main>
            <h1>Main</h1>
          </main>
          <main>
            <h1>Main</h1>
          </main>
          <main>
            <h1>Main</h1>
          </main>
          <main>
            <h1>Main</h1>
          </main>
        </div>
      </div>
    );
  }
}

export default App;
