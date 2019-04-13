import React, {Component} from 'react';
import {firestore} from '../base';

import {Row, Col} from 'reactstrap';
import PersonBox from './PersonBox'

class Leader extends Component {

  constructor(props) {
    super(props);

    this.state = {
      users: null
    }
  }

  componentWillMount() {
    let self = this

    let users = {}

    firestore.collection(this.props.teamID).onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          users[doc.id] = doc.data()
          self.setState({users: users})
      });
    });
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
        {this.state.users !== null ?
          Object.keys(this.state.users).map((data) => {
            if (!this.state.users[data].leader) {
              return ( 
                <Col key={data} xs='12' sm='6' md='6' lg='3'>
                  <PersonBox id={data} data={this.state.users[data]} {...userData}/> 
                </Col>
              )
            } else {
              return null
            }
          })
        : 
          null
        }
      </Row>
    );
  }
}

export default Leader;