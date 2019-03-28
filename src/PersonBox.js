import React, {Component} from 'react';
import './TaskBox.css'

import Angela from './Angela.jpeg';

class TaskBox extends Component {

  constructor(props) {
    super(props);

    this.state = {
      color: 'greenGrad',
    }
  }

  render() {

    return (
      <div className="clientBox z-depth-5">

        <div className={`clientColorbox ${this.state.color}`}>

        </div>
        
        <img className='circle z-depth-3' alt="i9" src={Angela} />

        <p className='name'>Angela Brown</p>

        <br />

        <p>
          <i style={{color: 'green', paddingRight: '10px'}} className="fas fa-check-square"></i>
          Complete i9
        </p>
        <p>
          <i style={{color: 'orange', paddingRight: '10px'}} className="fas fa-check-square"></i>
          Order Buisness Phone
        </p>
        <p>
          <i style={{color: 'red', paddingRight: '10px'}} className="fas fa-check-square"></i>
          Dell Technologies Advantage
        </p>
      

      </div>
    );
  }
}

export default TaskBox;