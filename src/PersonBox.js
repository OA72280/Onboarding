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
        
        <img className='circle z-depth-3' alt="i9" src={this.props.data.picture} />

        <p className='name'>{this.props.data.name}</p>

        <br />

        {Object.keys(this.props.data.tasks).map((data) => {
          let value = this.props.data.tasks[data];
          let color = 'red'

          if (value === 0) 
            color = 'red'
          else if (value === 1) 
            color = 'orange'
          else 
            color = 'green'
          

          return (
            <p key={data}>
              <i style={{color: `${color}`, paddingRight: '10px'}} className="fas fa-check-square"></i>
              {data}
            </p>
          )
        })}

      </div>
    );
  }
}

export default TaskBox;