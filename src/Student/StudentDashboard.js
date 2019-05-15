import React, {Component} from 'react';


import {Row, Col} from 'reactstrap'
import {firestore} from '../base';
import {Card, Container, Modal, CardHeader, CardBody, CardTitle, Button, ModalFooter, Input} from "mdbreact"

import LocationPreference from '../LocationPreference'
import LiveComponent from './LiveComponent'
import Student from './Student'
import PearsonVue from '../PearsonVue';

class StudentDashboard extends Component {

  constructor(props) {
    super(props)

    this.state = {
      dashboard: true,
      components: [],
    }
  }

  componentWillMount = () => {
    firestore.collection(this.props.teamID).doc(this.props.uid).onSnapshot((doc) => {
      this.setState({components: doc.data().components})
    })
  }

  openTasks = () => {
    this.setState({dashboard: !this.state.dashboard})
  }

  render() {
    const userData = {
      user: this.props.user,
      uid: this.props.uid,
      userData: this.props.userData,
      teamID: this.props.teamID, 
    }
    
    if (this.state.dashboard) {
      return (

        <Row>
          <Col sm='9'>
            <Card>
              <CardBody>
                <Container>
                  <div>
                    <Student openTasks={this.openTasks} dashboard={this.state.dashboard} {...userData}/>
                  </div>
                </Container>
              </CardBody>
            </Card>
            <br />
          </Col>
          {this.state.components.map((task, id) => {
            return ( 
              <Col key={id} sm="3">
                <LiveComponent components={this.state.components} componentID={id} componentData={this.state.components[id]} {...userData} />
              </Col>
            )            
          })}
        </Row>
      );
    } else {
      return (
        <Student openTasks={this.openTasks} dashboard={this.state.dashboard} {...userData}/>
      );
    }
  }
}

export default StudentDashboard;