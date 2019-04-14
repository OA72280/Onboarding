import React, {Component} from 'react';

// import {Input, Button} from 'mdbreact';

import TaskBox from './TaskBox.js';
import {firestore} from '../base';
import {Row, Col} from 'reactstrap'

import LocationPreference from '../LocationPreference'
import Student from './Student'

class StudentDashboard extends Component {

  render() {
    const userData = {
      user: this.props.user,
      uid: this.props.uid,
      userData: this.props.userData,
      teamID: this.props.teamID,
    }
    return (
        <Row>
          <Col sm='3'>
            <LocationPreference {...userData}/>
          </Col>

          <Col sm='9'>
            <div>
              <Student dashboard={true} {...userData}/>
            </div>
          </Col>

        </Row>
    );
  }
}

export default StudentDashboard;