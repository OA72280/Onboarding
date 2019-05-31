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
      userData: null,
      teamID: null,
      users: null,
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
          self.setState({uid: null, teamID: null, userData: null}, () => {
            // window.location.reload();
          });
        }
      }
    )
  }

  // getTeamIDFromFirebase = () => {
  //   let self = this
  //   firestore.collection('leaders').doc(self.state.uid).onSnapshot((doc) => {
  //     self.setTeamIDFromState(doc.data().currentTeam)
  //   });
  // }

  getTeamIDFromFirebase = () => {
    let self = this
    firestore.collection("peopleData").onSnapshot((querySnapshot) => {
      querySnapshot.forEach(function(doc) {
        if(self.state.uid === doc.id) {
          self.setTeamIDFromState(doc.data().team)
          return
        }
      });
    });
  }

  getUserData = (teamID) => {
    let self = this
    if (teamID === null || teamID === undefined) return
    if (this.state.uid === null || this.state.uid === undefined) return
    firestore.collection(teamID).doc(this.state.uid).onSnapshot((snapshot) => {
      self.setState({
        userData: snapshot.data()
      })
    })
  }

  getUserFromsessionStorage = () => {
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
    this.getUserData(teamID);
    this.getUsers(teamID);
  }

  setTeamIDFromState = (teamID) => {
    sessionStorage.setItem("teamID", teamID);
    this.setState({teamID: teamID});
    this.getUserData(teamID);
    this.getUsers(teamID);
  }

  authHandler = (user) => {
    sessionStorage.setItem('uid', user.uid);
    this.setState({uid: user.uid, user: user}, () => {
      this.getTeamIDFromFirebase();
    })
  };

  getUsers = (teamID) => {
    let self = this
    let users = {}
    firestore.collection(teamID).onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          users[doc.id] = doc.data()
          self.setState({users: users})
      });
    });
  }

  signedIn = () => {
    return this.state.uid
  };

  render() {
    const data = {
      user: this.state.user,
      uid: this.state.uid,
      userData: this.state.userData,
      teamID: this.state.teamID,
      users: this.state.users
    }

    const methods = {
      setTeamIDFromState: this.setTeamIDFromState,
    }
  
    return (
      <Switch>

        <Route exact path='/Home' render={(match) => (
          this.signedIn()
            ? (this.state.user
              ?
                <Home page='home' {...methods} {...data}/>
              :
               null
            )
            // eslint-disable-next-line
            : <Redirect to="/SignIn"/>
        )}/>

        <Route exact path='/Calendar' render={() => (
          this.signedIn()
            ? (this.state.user
              ?
                <Home page='calendar' {...methods} {...data}/>
              :
               null
            )
            // eslint-disable-next-line
            : <Redirect to="/SignIn"/>
        )}/>

        <Route exact path='/Mentors' render={() => (
          this.signedIn()
            ? (this.state.user
              ?
                <Home page='mentors' {...methods} {...data}/>
              :
               null
            )
            // eslint-disable-next-line
            : <Redirect to="/SignIn"/>
        )}/>

        <Route exact path='/SignIn' render={() => (
          !this.signedIn()
            ? <SignIn/>
            // eslint-disable-next-line
            : <Redirect to={`/Home`}/>
        )}/>
        
        <Route exact path='/CreateAccount' render={() => (
          !this.signedIn()
            ? <CreateUser {...methods} />
            // eslint-disable-next-line
            : <Redirect to={`/Home`}/>
        )}/>

        <Route render={() => {
          return (
            // eslint-disable-next-line
            <Redirect to={`/Home`} />
          )
        }}/>

      </Switch>
    );
  }
}

export default App;