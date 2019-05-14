import React, {Component} from 'react';
import './TaskBox.css'

import {Row, Col} from 'reactstrap'
import {Card, Container, Modal, CardHeader, CardBody, CardTitle, Button, ModalFooter, Input} from "mdbreact"
import {firestore} from '../base'

class LiveComponent extends Component {

  constructor(props) {
    super(props) 

    this.state = {
      
    }
  }

  componentWillMount() {
    let self = this
    
  }
  

  saveToFirebase = () => {
    let self = this
    let oldLocations = []

    oldLocations[0] = self.state.location1
    oldLocations[1] = self.state.location2
    oldLocations[2] = self.state.location3
      
    firestore.collection(self.props.teamID).doc(self.props.uid).update({locations: oldLocations})
  }

  handleLocationOne = (ev) => {
    this.setState({location1: ev.target.value}, () => {this.saveToFirebase()})
  }

  handleLocationTwo = (ev) => {
    this.setState({location2: ev.target.value}, () => {this.saveToFirebase()})
  }

  handleLocationThree = (ev) => {
    this.setState({location3: ev.target.value}, () => {this.saveToFirebase()})
  }

  render() {
    return (
        <Card>
            <CardHeader style={{paddingTop: '1.5em', fontSize: '1.1em'}} className='gradient name' color="info-color-dark lighten-1">{this.props.componentData.name}</CardHeader>
            <CardBody>
                <Container>
                    {this.props.componentData.blanks.map(() => {
                        return (
                            <Row>
                                <Col sm='1' />
                                <Col sm='10'>
                                    <Input onChange={(ev) => this.handleLocationOne(ev)} value={this.state.location1} name='preference1' label='Preference 1' />
                                </Col>
                                <Col sm='1' />
                            </Row>
                        )
                    })}
                </Container>
            </CardBody>
        </Card>

     
    );
  }
}

export default LiveComponent;