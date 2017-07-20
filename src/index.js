import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory  } from 'react-router';
import './index.css';
import App from './App';
import Profile from './Profile';
import * as firebase from 'firebase';

// Initialized Firebase here

var config = {
    apiKey: "AIzaSyDE6kvOb4x1Kkvk8SLUKMatERDrjJM4dD8",
    authDomain: "subhojits-project.firebaseapp.com",
    databaseURL: "https://subhojits-project.firebaseio.com",
    projectId: "subhojits-project",
    storageBucket: "subhojits-project.appspot.com",
    messagingSenderId: "709947698373"
};
firebase.initializeApp(config);

// Have set the route here

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={App}/> 
      <Route path="profile" component={Profile}/>
  </Router>
), document.getElementById('root'));

