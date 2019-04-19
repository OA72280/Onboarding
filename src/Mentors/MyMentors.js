import React, {Component} from 'react';

import MentorBox from './MentorBox'
import {firestore} from '../base';
import {Row, Col} from 'reactstrap';

class MyMentors extends Component {

  constructor(props) {
    super(props)

    this.state = {
      mentors: null
    }
  }

  componentWillMount = () => {
    let self = this
    firestore.collection(this.props.teamID).doc(this.props.uid).onSnapshot((doc) => {
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
      <div>
        <h1 className='ITAtlasText' style={{paddingLeft: '0px', marginLeft: '0px'}} > <b>Mentors</b></h1>
        <hr/>
        <Row>
          {this.state.mentors !== null && this.state.mentors !== undefined ?
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
      </div>
    );
  }
}

export default MyMentors;