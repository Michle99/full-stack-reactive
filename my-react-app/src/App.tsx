import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ProfileList from './ProfileList';
import ProfileListPollInterval from './ProfileListPollInterval';
import ProfileListRxJs from './ProfileListRxJs';
import ProfileListWebSocket from './ProfileListWebSocket';
import ProfileListServerSentEvent from './ProfileListServerSentEvent';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {/* <ProfileList/> */}
          {/* <ProfileListPollInterval/> */}
          <ProfileListServerSentEvent/>
        </header>
      </div>
    );
  }
}

export default App;