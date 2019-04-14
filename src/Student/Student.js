import React, {Component} from 'react';

import TaskBox from './TaskBox.js';
import {firestore} from '../base';
import {Row, Col} from 'reactstrap'

class Student extends Component {

  constructor(props) {
    super(props)

    this.state = {
      tasks: null,
      thisWeek: [],
      nextWeek: [],
      lookingAhead: [],
      completed: [], 
    }
  }

  componentWillMount = () => {
    let self = this

    if (this.props.teamID === null || this.props.teamID === undefined) return
    firestore.collection(this.props.teamID).doc(this.props.uid).onSnapshot((doc) => {
      self.setState({
        tasks: doc.data().tasks,
        thisWeek: [],
        nextWeek: [],
        lookingAhead: [],
        completed: [], 
      }, () => {
        self.sortDates();
      })
    });
  }

  sortDates = () => {
    let unsortedDates = this.state.tasks
    unsortedDates.sort((a,b) => {
      return (new Date(a.dueDate.seconds * 1000)) - (new Date(b.dueDate.seconds * 1000))
    });

    this.setState({tasks: unsortedDates}, () => {
      this.splitByDate()
    })
  }

  splitByDate = () => {
    this.state.tasks.forEach((task) => {
      let date = this.convertToDate(task.dueDate.seconds)
      let today = new Date()
      //Coming Up
      if (date > today) {
        let diffDays = this.findDifference(date, today)
        // console.log(diffDays);

        if (diffDays <= 7) {
          this.setThisWeek(task)
        } else if (diffDays <= 14) {
          this.setNextWeek(task)
        } else {
          this.setUpcoming(task)
        }
      }
      // LATE 
      else {
        this.setCompleted(task)
      }
    })
  }

  setThisWeek = (task) => {
    let tmp = this.state.thisWeek
    tmp.push(task)
    this.setState({thisWeek: tmp})
  }

  setNextWeek = (task) => {
    let tmp = this.state.nextWeek
    tmp.push(task)
    this.setState({nextWeek: tmp})
  }

  setUpcoming = (task) => {
    let tmp = this.state.lookingAhead
    tmp.push(task)
    this.setState({lookingAhead: tmp})
  }

  setCompleted = (task) => {
    let tmp = this.state.completed
    tmp.push(task)
    this.setState({completed: tmp})
  }

  convertToDate = (seconds) => {
    return new Date(seconds * 1000)
  }

  findDifference = (date, today) => {
    let diffTime = Math.abs(date.getTime() - today.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
  }
  
  render() {
    const userData = {
      user: this.props.user,
      uid: this.props.uid,
      userData: this.props.userData,
      teamID: this.props.teamID,
    }
    return (
      <div>

        <h1 onClick={this.props.openTasks} className='ITAtlasText' style={{paddingLeft: '0px', marginLeft: '0px'}} > <b>This Week</b></h1>
        <hr/>
        <Row>
          {this.state.thisWeek !== [] ?
            this.state.thisWeek.map((task, id) => {
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

        <br/>

        {!this.props.dashboard ?
        <div>
          <h1 className='ITAtlasText' style={{paddingLeft: '0px', marginLeft: '0px'}} > <b>Next Week</b></h1>
          <hr/>
          <Row>
            {this.state.nextWeek !== [] ?
              this.state.nextWeek.map((task, id) => {
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

          <br/>
          <h1 className='ITAtlasText' style={{paddingLeft: '0px', marginLeft: '0px'}} > <b>Looking Ahead</b></h1>
          <hr/>
          <Row>
            {this.state.lookingAhead !== [] ?
              this.state.lookingAhead.map((task, id) => {
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

          <br/>
          <h1 className='ITAtlasText' style={{paddingLeft: '0px', marginLeft: '0px'}} ><b>Past Due</b></h1>
          <hr/>
          <Row>
            {this.state.completed !== [] ?
              this.state.completed.map((task, id) => {
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
          </div>
        :
          null  
        }

      </div>
    );
  }
}

export default Student;