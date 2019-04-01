import React, {Component} from 'react';
import './TaskBox.css'

import {Row, Col} from 'reactstrap';

import Select from 'react-select'
import iNine from './i9.png';

// import firebase from './base';

class TaskBox extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedOption: { value: 'Not Started', label: 'Not Started' },
      color: 'redGrad',
    }
  }

  handleChange = (selectedOption) => {
    if (selectedOption.value === 'Not Started') {
      this.setState({ selectedOption: selectedOption, color: "redGrad"});
    } else if (selectedOption.value === "In Progress") {
      this.setState({ selectedOption: selectedOption, color: 'dropdownColor'});
    } else if (selectedOption.value === "Complete") {
      this.setState({ selectedOption: selectedOption, color: 'greenGrad' });
    }
  }

  render() {


    const options = [
      { value: 'Not Started', label: 'Not Started' },
      { value: 'In Progress', label: 'In Progress' },
      { value: 'Complete', label: 'Complete' }
    ]
    // const { selectedOption } = this.state;

  
    return (
      <div className="clientBox z-depth-5">

        <div className={`clientColorbox ${this.state.color}`}>

        </div>
        
        {/* <img className='circle z-depth-3' alt="i9" src={iNine} /> */}

        <p className='name'>{this.props.data.taskName}</p>

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
          {/* <p>Due {new Date(this.props.data.dueDate.seconds).toDateString()}</p> */}
        </div>

      </div>
    );
  }
}

export default TaskBox;