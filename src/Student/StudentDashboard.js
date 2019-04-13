import React, {Component} from 'react';

// import {Input, Button} from 'mdbreact';

import TaskBox from './TaskBox.js';
import {firestore} from '../base';
import {Row, Col} from 'reactstrap'

class StudentDashboard extends Component {

  render() {
    const userData = {
      user: this.props.user,
      uid: this.props.uid,
      userData: this.props.userData,
      teamID: this.props.teamID,
    }
    return (
      <div>
        <p>Hello!</p>
      </div>
    );
  }
}

export default StudentDashboard;