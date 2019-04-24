import React, {Component} from 'react';


import {Row, Col} from 'reactstrap'

import LocationPreference from '../LocationPreference'
import Student from './Student'
import PearsonVue from '../PearsonVue';

class StudentDashboard extends Component {

  constructor(props) {
    super(props)

    this.state = {
      dashboard: true,
    }
  }

  openTasks = () => {
    this.setState({dashboard: !this.state.dashboard})
  }

  render() {
    const userData = {
      user: this.props.user,
      uid: this.props.uid,
      userData: this.props.userData,
      teamID: this.props.teamID, 
    }
    
    if (this.state.dashboard) {
      return (
          <Row>
            <Col sm='3'>
              <br/> <br />
              <LocationPreference {...userData}/>
            </Col>

            <Col sm='9'>
              <div>
                <Student openTasks={this.openTasks} dashboard={this.state.dashboard} {...userData}/>
              </div>
            </Col>

            <Col sm='3'>
              <br/> <br />
              <PearsonVue {...userData}/>
            </Col>

          </Row>
      );
    } else {
      return (
        <Student openTasks={this.openTasks} dashboard={this.state.dashboard} {...userData}/>
      );
    }
  }
}

export default StudentDashboard;