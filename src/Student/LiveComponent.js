import React, {Component} from 'react';
import './TaskBox.css'

import {Row, Col} from 'reactstrap'
import {Card, Container, Modal, CardHeader, CardBody, CardTitle, Button, ModalFooter, Input} from "mdbreact"
import {firestore} from '../base'
import FirebaseInput from './FirebaseInput';

class LiveComponent extends Component {

  constructor(props) {
    super(props) 

    this.state = {
        
    }
  }

  deleteComponent = () => {
    let self = this

    firestore.collection(self.props.teamID).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if (doc.data().components !== undefined && doc.data().components !== null) {
                
                let tmp = self.props.components
                for (let i in self.props.components) {
                    if (self.props.components[i].name === self.props.componentData.name) {
                        if (i > -1) {
                            tmp.splice(i, 1);
                            console.log(tmp);
                        }
                    }
                }

                firestore.collection(self.props.teamID).doc(doc.id).update({components: tmp})
            }
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
        <Card>
            {this.props.userData.leader ?
                <CardHeader style={{paddingTop: '1.5em', fontSize: '1.1em'}} className='gradient name' color="info-color-dark lighten-1">{this.props.componentData.name} <i onClick={this.deleteComponent} style={{float: "right"}} className="fas fa-times"></i></CardHeader>
            :
                <CardHeader style={{paddingTop: '1.5em', fontSize: '1.1em'}} className='gradient name' color="info-color-dark lighten-1">{this.props.componentData.name}</CardHeader>
            }
            <CardBody>
                <Container>
                    {this.props.componentData.blanks.map((blank, id) => {
                        return (
                            <Row>
                                <Col sm='1' />
                                <Col sm='10'>
                                    {/* <Input onChange={(ev) => this.handleLocationOne(ev)} value={this.state.location1} name='preference1' label='Preference 1' /> */}
                                    <FirebaseInput {...userData} components={this.props.components} componentID={this.props.componentID} blankID={id} componentData={this.props.componentData} blank={blank} id={id} />
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