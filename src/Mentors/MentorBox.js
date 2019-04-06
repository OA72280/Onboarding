import React, {Component} from 'react';

// import {firestore} from '../base';

class MentorBox extends Component {
  constructor(props) {
    super(props);

    this.state = {
      color: 'greenGrad',
    }
  }

  handleMentorEdit = () => {
    this.props.toggleNewMentorEdit(this.props.mentor.mentorName, 
                                    this.props.mentor.mentorLocation, 
                                    this.props.mentor.mentorTitle, 
                                    this.props.mentor.mentorNotes, 
                                    this.props.mentor.mentorPicture, 
                                    this.props.mentor.mentorID)
  }

  render() {

    return (
      <div onClick={this.handleMentorEdit} style={{overflowY: 'scroll'}} className="clientBox scrollStuff z-depth-5">

        <div className={`clientColorbox ${this.state.color}`}></div>
        
        <img className='circle z-depth-3' alt="pic" src={this.props.mentor.mentorPicture} />

        <p className='name'>{this.props.mentor.mentorName}</p>

        <hr />
       
        <p>Title: {this.props.mentor.mentorTitle}</p>
        <p>Location: {this.props.mentor.mentorLocation}</p>
        <p>Notes: {this.props.mentor.mentorNotes}</p>

      </div>
    );
  }
}

export default MentorBox;