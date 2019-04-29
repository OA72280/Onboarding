import React, {Component} from 'react';
import {firestore} from '../base';

import {Row, Col} from 'reactstrap';
import PersonBox from './PersonBox'
import StudentDashboard from '../Student/StudentDashboard';

class Leader extends Component {

  render() {
    let userData = {
      user: this.props.user,
      uid: this.props.uid,
      userData: this.props.userData,
      teamID: this.props.teamID,
      users: this.props.users
    }

    if (!this.props.dashboard) {
      return (
        <Row>
          {this.props.users !== null ?
            Object.keys(this.props.users).map((data) => {
              if (!this.props.users[data].leader && data !== 'teamData') {
                return ( 
                  <Col onClick={() => {this.props.handleEmployeeClick(data)}} key={data} xs='12' sm='6' md='6' lg='3'>
                    <PersonBox id={data} data={this.props.users[data]} {...userData}/> 
                  </Col>
                )
              } else {
                return null
              }
            })
          : 
            null
          }
        </Row>
      );
  } else {
    userData['uid'] = this.props.employeeID
    return (
      <StudentDashboard {...userData}/>
    );
  }
}}
  export default Leader;