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
      selectedOption: null,
    }
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  }

  render() {

    const options = [
      { value: 'Not Started', label: 'Not Started' },
      { value: 'In Progress', label: 'In Progress' },
      { value: 'Complete', label: 'Complete' }
    ]
    const { selectedOption } = this.state;

  
    return (
      <div className="clientBox z-depth-5">

        <div className={`clientColorbox dropdownColor`}>
          {/* <a href={`mailto:${this.props.email}`}>
            <i className="fas fa-envelope email"></i>
          </a>
          <i className="fas fa-plus-square add"></i> */}
        </div>
        
        {/* <div className='circle z-depth-3'></div> */}
        <img className='circle z-depth-3' alt="Fitz" src={iNine} />

        <p className='name'>Complete I9</p>

        <hr className='clientHR' />

        <Row>
          <Col sm='1' />
          <Col sm='10'>
            <Select 
              value={selectedOption}
              onChange={this.handleChange}
              options={options}
            />
          </Col>
          <Col sm='1' />
        </Row>

        <br />

        <div>
          <i className="fas fa-calendar-alt" />
          <p>Due 03/15/2018</p>
        </div>

      </div>
    );
  }
}

export default TaskBox;