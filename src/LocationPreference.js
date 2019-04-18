import React, {Component} from 'react';
import './Student/TaskBox.css'

import {Row, Col} from 'reactstrap'
import {Input} from 'mdbreact'
import {firestore} from './base'

class LocationPreference extends Component {

  constructor(props) {
    super(props) 

    this.state = {
      location1: '',
      location2: '',
      location3: ''
    }
  }

  componentWillMount() {
    let self = this
    firestore.collection(this.props.teamID).doc(this.props.uid).onSnapshot((doc) => {
      let oldLocations = doc.data().locations
      if (oldLocations !== null && oldLocations !== undefined)
        self.setState({
          location1: oldLocations[0],
          location2: oldLocations[1],
          location3: oldLocations[2]
        }) 
    })
  }
  

  saveToFirebase = () => {
    let self = this
    let oldLocations = []

    oldLocations[0] = self.state.location1
    oldLocations[1] = self.state.location2
    oldLocations[2] = self.state.location3
      
    firestore.collection(self.props.teamID).doc(self.props.uid).update({locations: oldLocations})
  }

  handleLocationOne = (ev) => {
    this.setState({location1: ev.target.value}, () => {this.saveToFirebase()})
  }

  handleLocationTwo = (ev) => {
    this.setState({location2: ev.target.value}, () => {this.saveToFirebase()})
  }

  handleLocationThree = (ev) => {
    this.setState({location3: ev.target.value}, () => {this.saveToFirebase()})
  }

  render() {
    return (
      <div className="clientBox z-depth-5">

        <div style={{height: '50px'}} className={`clientColorbox greenGrad`}></div>
        
        <p style={{paddingLeft: '20px', paddingRight: '20px'}} className='name'>Location Preferences</p>

        <hr className='clientHR' />

        <Row>
          <Col sm='1' />
          <Col sm='10'>
            <Input onChange={(ev) => this.handleLocationOne(ev)} value={this.state.location1} name='preference1' label='Preference 1' />
          </Col>
          <Col sm='1' />
        </Row>

        <Row>
          <Col sm='1' />
          <Col sm='10'>
          <Input onChange={(ev) => this.handleLocationTwo(ev)} value={this.state.location2} name='preference2' label='Preference 2' />
          </Col>
          <Col sm='1' />
        </Row>

        <Row>
          <Col sm='1' />
          <Col sm='10'>
          <Input onChange={(ev) => this.handleLocationThree(ev)} value={this.state.location3} name='preference3' label='Preference 3' />
          </Col>
          <Col sm='1' />
        </Row>

      </div>
    );
  }
}

export default LocationPreference;