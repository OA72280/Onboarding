import React, {Component} from 'react';

import SignIn from './SignIn/SignIn';
import CreateUser from './CreateUser/CreateUser';
import Home from './Home';
import firebase from './base';
import {firestore} from './base';

import {Route, Switch, Redirect} from 'react-router-dom';

// How to disable warnings in a file /* eslint-disable */

import './App.css';
import 'font-awesome/css/font-awesome.min.css';

class App extends Component {

  constructor() {
    super();

    this.state = {
      uid: null,
      user: null,
      teamID: null,
    }
  }

  componentWillMount() {
    this.getUserFromsessionStorage();
    this.getTeamIDFromSessionStorage();
    
    let self = this;
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          // finished signing in
          self.authHandler(user)
        } else {
          // finished signing out
          self.setState({uid: null, teamID: null}, () => {
            // window.location.reload();
          });
        }
      }
    )
  }

  getTeamIDFromFirebase = () => {
    let self = this
    firestore.collection("peopleData").get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        if(self.state.uid === doc.data().team) {
          self.setTeamIDFromState(doc.data().team)
          // console.log(doc.data().team)
        }
      });
    });
  }

  getUserFromsessionStorage() {
    const uid = sessionStorage.getItem('uid');
    if (!uid) return;
    this.setState({uid}, () => {
      this.getTeamIDFromFirebase();
    })
  }

  getTeamIDFromSessionStorage = () => {
    const teamID = sessionStorage.getItem('teamID');
    if (!teamID) return;
    this.setState({teamID: teamID});
  }

  setTeamIDFromState = (teamID) => {
    sessionStorage.setItem('teamID', teamID)
    this.setState({teamID: teamID});
  }

  authHandler = (user) => {
    sessionStorage.setItem('uid', user.uid);
    this.setState({uid: user.uid, user: user})
  };

  signedIn = () => {
    return this.state.uid
  };

  render() {
    const data = {
      user: this.state.user,
      uid: this.state.uid,
      teamID: this.state.teamID,
    }

    const methods = {
      setTeamIDFromState: this.setTeamIDFromState,
    }
  
    return (
      <Switch>

        <Route exact path='/launch/Home' render={(match) => (
          this.signedIn()
            ? (this.state.user
              ?
                <Home {...data}/>
              :
               null
            )
            // eslint-disable-next-line
            : <Redirect to="/launch/SignIn"/>
        )}/>

        <Route exact path='/launch/Calendar' render={() => (
          this.signedIn()
            ? (this.state.user
              ?
                <Home page='calendar' {...data}/>
              :
               null
            )
            // eslint-disable-next-line
            : <Redirect to="/launch/SignIn"/>
        )}/>

        <Route exact path='/launch/SignIn' render={() => (
          !this.signedIn()
            ? <SignIn/>
            // eslint-disable-next-line
            : <Redirect to={`/launch/Home`}/>
        )}/>
        
        <Route exact path='/launch/CreateAccount' render={() => (
          !this.signedIn()
            ? <CreateUser {...methods} />
            // eslint-disable-next-line
            : <Redirect to={`/launch/Home`}/>
        )}/>

        <Route render={() => {
          return (
            // eslint-disable-next-line
            <Redirect to={`/launch/Home`} />
          )
        }}/>

      </Switch>
    );
  }
}

export default App;