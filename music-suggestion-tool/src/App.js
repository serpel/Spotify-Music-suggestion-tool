import React, { Component } from 'react';
import Playlist from './Components/Playlist'
import Login from './Components/Login'
import { BrowserRouter as Router, Route } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';

class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
        <CssBaseline />
          <div>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/playlist" component={Playlist}/>
          </div>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;
