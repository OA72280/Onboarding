import React, {Component} from 'react';

// import {Input, Button} from 'mdbreact';

import TaskBox from './TaskBox.js';
import {firestore} from './base';
import {Row, Col} from 'reactstrap'

class Student extends Component {

  constructor(props) {
    super(props)

    this.state = {
      tasks: null,
    }
  }

  componentWillMount = () => {
    let self = this

    let tasks = {}

    if (this.props.teamID === null || this.props.teamID === undefined) return
    firestore.collection(this.props.teamID).doc(this.props.uid).onSnapshot((doc) => {
      self.setState({tasks: doc.data().tasks})
    });
  }

  render() {
    const userData = {
      user: this.props.user,
      uid: this.props.uid,
      userData: this.props.userData,
      teamID: this.props.teamID,
    }
    return (
      <Row>
        {this.state.tasks !== null ?
          Object.keys(this.state.tasks).map((data) => {
              return ( 
                <Col key={data} sm='3'>
                  <TaskBox data={this.state.tasks[data]} key={data} {...userData}/> 
                </Col>
              )            
          })
        : 
          null
        }
      </Row>
    );
  }
}

export default Student;