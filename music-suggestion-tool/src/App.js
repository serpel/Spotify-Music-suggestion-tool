import React, { Component } from 'react';
import Playlist from './Components/Playlist'
import Login from './Components/Login'
import { BrowserRouter as Router, Route } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import blue from '@material-ui/core/colors/blue';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue,
    },
    secondary: {
      main: '#f50057',
    },
  },
});

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <React.Fragment>
            <div>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/playlist" component={Playlist}/>
            </div>
          </React.Fragment>
        </Router>
      </MuiThemeProvider>
    );
  }
}

export default App;
