import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Crypto from './Crypto';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Crypto Rate</h1>
        </header>
        <Crypto />
      </div>
    );
  }
}

export default App;