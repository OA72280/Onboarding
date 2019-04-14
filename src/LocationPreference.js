import React, {Component} from 'react';
import './Student/TaskBox.css'

import {firestore} from './base';
import {Row, Col} from 'reactstrap'
import {Input} from 'mdbreact'

class LocationPreference extends Component {

  render() {
    const userData = {
      user: this.props.user,
      uid: this.props.uid,
      userData: this.props.userData,
      teamID: this.props.teamID,
    }

    return (
      <div className="clientBox z-depth-5">

        <div style={{height: '50px'}} className={`clientColorbox green`}></div>
        
        <p style={{paddingLeft: '20px', paddingRight: '20px'}} className='name'>Location Preferences</p>

        <hr className='clientHR' />

        <Row>
          <Col sm='1' />
          <Col sm='10'>
            <Input label='Preference 1'/>
          </Col>
          <Col sm='1' />
        </Row>

        <Row>
          <Col sm='1' />
          <Col sm='10'>
            <Input label='Preference 2'/>
          </Col>
          <Col sm='1' />
        </Row>

        <Row>
          <Col sm='1' />
          <Col sm='10'>
            <Input label='Preference 3'/>
          </Col>
          <Col sm='1' />
        </Row>

      </div>
    );
  }
}

export default LocationPreference;