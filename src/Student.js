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

    if (this.props.teamID === null || this.props.teamID === undefined) return
    firestore.collection(this.props.teamID).doc(this.props.uid).onSnapshot((doc) => {
      self.setState({tasks: doc.data().tasks}, () => {
        self.sortDates();
      })
    });
  }

  sortDates = () => {
    let unsortedDates = this.state.tasks
    unsortedDates.sort((a,b) => {
      return (new Date(a.dueDate.seconds * 1000)) - (new Date(b.dueDate.seconds * 1000))
    });

    this.setState({tasks: unsortedDates})
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
          this.state.tasks.map((task, id) => {
              return ( 
                <Col key={id} sm='3'>
                  <TaskBox tasks={this.state.tasks} task={task} id={id} {...userData}/> 
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