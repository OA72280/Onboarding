import React, {Component} from 'react';
import './TaskBox.css'

class TaskBox extends Component {

  constructor(props) {
    super(props);

    this.state = {
      color: 'greenGrad',
    }
  }

  render() {

    console.log((Object.keys(this.props.data.tasks).length * 5) + 'em')
    let tmp = Object.keys(this.props.data.tasks).length * 5 + 'em'
    let tmp2 = '25em'
    console.log(tmp)
    console.log(tmp2)

    return (
      <div style={{overflow: 'scroll'}} className="clientBox z-depth-5">

        <div className={`clientColorbox ${this.state.color}`}>

        </div>
        
        <img className='circle z-depth-3' alt="i9" src={this.props.data.picture} />

        <p className='name'>{this.props.data.name}</p>

        <br />

        {Object.keys(this.props.data.tasks).map((data) => {
          let value = this.props.data.tasks[data];
          let color = 'red'

          if (value.completion === 0) 
            color = 'red'
          else if (value.completion === 1) 
            color = 'orange'
          else 
            color = 'green'
          

          return (
            <div>
              <i style={{color: `${color}`, float: 'left', paddingTop: '5px', paddingLeft: '20px'}} className="fas fa-check-square"></i>
              <p key={value.taskName}>
                {value.taskName}
              </p>
            </div>
          )
        })}

      </div>
    );
  }
}

export default TaskBox;