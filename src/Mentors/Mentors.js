import React, {Component} from 'react';

import MentorBox from './MentorBox'
import {firestore} from '../base';
import {Row, Col} from 'reactstrap';

class Mentors extends Component {

  constructor(props) {
    super(props)

    this.state = {
      mentors: null
    }
  }

  componentWillMount = () => {
    let self = this
    firestore.collection("leaders").doc(this.props.uid).onSnapshot((doc) => {
      self.setState({
        mentors: doc.data().mentors
      })
    })
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
        {this.state.mentors !== null ?
          this.state.mentors.map((data) => {
              return ( 
                <Col key={data.mentorName} xs='12' sm='6' md='6' lg='3'>
                  <MentorBox toggleNewMentorEdit={this.props.toggleNewMentorEdit} mentor={data} {...userData}/> 
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

export default Mentors;