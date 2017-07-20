import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import Card from 'material-ui/Card/Card';
import injectTapEventPlugin from 'react-tap-event-plugin';
import './App.css';
import * as firebase from 'firebase';

class App extends Component {

/* Initialized the state */

  constructor() {
    super();
    injectTapEventPlugin();
    this.state = {user: null, isLoggedIn: false};
  }

/* Google Sign-In Authentication */

  handleClick() {
    var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
          window.location = '/profile';
        }).catch(function(error) {
      });
  }

  componentDidMount() {
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <Card style={{background:'#fff'}}>                     
            <h1>DASHBOARD</h1>
            <div className="container text-center">
              <div className="col-xs-offset-9 col-sm-4">
                <div className="row"> 
                  <FlatButton type="submit" label='Sign In' primary={true} onClick={this.handleClick.bind(this)} />
                </div>
              </div>
            </div>  
          </Card>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;