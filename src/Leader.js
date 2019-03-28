import React, {Component} from 'react';
import {firestore} from './base';

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

    firestore.collection(this.props.teamID).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          users[doc.id] = doc.data()
          self.setState({users: users})
      });
    });
  }  

  render() {
    return (
      <Row>
        {this.state.users !== null ?
          Object.keys(this.state.users).map((data) => {
            return ( 
              <Col sm='3'>
                <PersonBox key={data}/> 
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

export default Leader;