import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { BrowserRouter } from 'react-router-dom';
import AppBar from './components/AppBar';
import Content from './components/Content';
import BottomNavigation from './components/BottomNavigation';


import './App.css'

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <BrowserRouter>
          <div className="App-container">
            <div className="App-top-menu">
              <AppBar />
            </div>
            <div className="App-content-container">
              <Content />
            </div>
            <div className="App-bottom-menu">
              <BottomNavigation />
            </div>
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    );
  }
}

export default App;
