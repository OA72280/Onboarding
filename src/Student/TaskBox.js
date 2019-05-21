import React, {Component} from 'react';
import './TaskBox.css'

import {Row, Col} from 'reactstrap';
import {firestore} from '../base';

import Select from 'react-select'

class TaskBox extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedOption: { value: 'Not Started', label: 'Not Started' },
      color: 'redGrad',
    }
  } 

  componentWillMount = () => {
    if (this.props.task.completion === 0) {
      this.setState({ selectedOption: { value: 'Not Started', label: 'Not Started' }, color: "redGrad"});
    } else if (this.props.task.completion === 1) {
      this.setState({ selectedOption: { value: 'In Progress', label: 'In Progress' }, color: "dropdownColor"});
    } else {
      this.setState({ selectedOption: { value: 'Complete', label: 'Complete' }, color: "greenGrad"});
    }
  } 

  handleChange = (selectedOption) => {
    let completion = 0
    if (selectedOption.value === 'Not Started') {
      this.setState({ selectedOption: selectedOption, color: "redGrad"});
      completion = 0
    } else if (selectedOption.value === "In Progress") {
      this.setState({ selectedOption: selectedOption, color: 'dropdownColor'});
      completion = 1
    } else if (selectedOption.value === "Complete") {
      this.setState({ selectedOption: selectedOption, color: 'greenGrad' });
      completion = 2
    }

    let oldTasks = this.props.tasks
    oldTasks.map((data) => {
      if (data.taskName === this.props.task.taskName)
        return data.completion = completion
      else 
        return null
    })
    firestore.collection(this.props.teamID).doc(this.props.uid).update({tasks: oldTasks})

  }

  deleteTask = () => {
    let self = this
    firestore.collection(self.props.teamID).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          if (doc.data().tasks !== undefined && doc.data().tasks !== null) {
              
              let tmp = self.props.tasks
              for (let i in self.props.tasks) {
                  if (self.props.tasks[i].taskName === self.props.task.taskName) {
                      if (i > -1) {
                          tmp.splice(i, 1);
                      }
                  }
              }

              firestore.collection(self.props.teamID).doc(doc.id).update({tasks: tmp})
            }
        })
    })
    
  }

  render() {
    const options = [
      { value: 'Not Started', label: 'Not Started' },
      { value: 'In Progress', label: 'In Progress' },
      { value: 'Complete', label: 'Complete' }
    ]
  
    return (
      <div className="clientBox z-depth-5">

        <div className={`clientColorbox ${this.state.color}`}></div>
        
        {this.props.userData.leader ?
          <p style={{paddingLeft: '20px', paddingRight: '20px'}} className='name'>{this.props.task.taskName} <i onClick={this.deleteTask} style={{marginTop: '5px', float: "right"}} className="fas fa-times"></i></p>
          :
          <p style={{paddingLeft: '20px', paddingRight: '20px'}} className='name'>{this.props.task.taskName}</p>
        }

        <hr className='clientHR' />

        <Row>
          <Col sm='1' />
          <Col sm='10'>
            <Select 
              value={this.state.selectedOption}
              onChange={this.handleChange}
              options={options}
            />
          </Col>
          <Col sm='1' />
        </Row>

        <br />

        <div>
          <i className="fas fa-calendar-alt" />
          <p>Due {new Date(this.props.task.dueDate.seconds * 1000).toLocaleDateString()}</p>
        </div>

      </div>
    );
  }
}

export default TaskBox;