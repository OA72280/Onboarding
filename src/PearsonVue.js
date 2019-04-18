import React, {Component} from 'react';
import './Student/TaskBox.css'

import {Row, Col} from 'reactstrap'
import {Input} from 'mdbreact'
import {firestore} from './base'

class PearsonVue extends Component {

  constructor(props) {
    super(props)

    this.state = { 
      pearsonVueID: '',
    }
  }

  componentWillMount() {
    let self = this
    firestore.collection(this.props.teamID).doc(this.props.uid).onSnapshot((doc) => {
      if (doc.data().pearsonVueID !== null && doc.data().pearsonVueID !== undefined)
        self.setState({pearsonVueID: doc.data().pearsonVueID}) 
    })
  }
  
  saveToFirebase = () => {      
    firestore.collection(this.props.teamID).doc(this.props.uid).update({pearsonVueID: this.state.pearsonVueID})
  }

  handlePearsonVueID = (ev) => {
    this.setState({pearsonVueID: ev.target.value}, () => {this.saveToFirebase()})
  }

  render() {
    return (
      <div stlye={{height: '5em'}} className="z-depth-5">

        <div style={{height: '50px', width: '100%'}} className={`clientColorbox dropdownColor`}></div>
        
        <p style={{paddingLeft: '20px', paddingRight: '20px'}} className='name'>Pearson Vue</p>

        <hr className='clientHR' />

        <Row>
          <Col sm='1' />
          <Col sm='10'>
          <Input onChange={(ev) => this.handlePearsonVueID(ev)} value={this.state.pearsonVueID} name='preference1' label='Pearson Vue ID' />
          </Col>
          <Col sm='1' />
        </Row>

      </div>
    );
  }
}

export default PearsonVue;