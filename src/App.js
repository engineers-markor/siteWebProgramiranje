import React, {Component} from 'react';
import './App.css';
import logo from './logo.svg';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <button className="nav" href="#">
          <i className="fa fa-bars fa-2x"></i>
          </button>
          <img className="logo" src={logo} alt="logo"/>
        </header>
        <main>
          <h1>work</h1>
        </main>
      </div>
    );
  }
}

export default App;
