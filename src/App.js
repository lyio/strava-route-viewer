import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { RoutesListContainer } from './components/routes-list.container';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      points: "23,45 55,34 55,33"
    };
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <div className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
          <RoutesListContainer />
        </div>
      </div>
    );
  }
}

export default App;
