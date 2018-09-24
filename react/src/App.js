import React, { Component } from 'react';
import './App.css';
import { RoutesListContainer } from './components/routes-list.container';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-intro">
          <RoutesListContainer token={process.env.REACT_APP_STRAVA_TOKEN}/>
        </div>
      </div>
    );
  }
}

export default App;
