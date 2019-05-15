import React, {Component} from 'react';
import './TaskBox.css'

import {Input} from "mdbreact"
import {firestore} from '../base'

class FirebaseInput extends Component {

  constructor(props) {
    super(props) 

    this.state = {
      value: this.props.components[this.props.componentID].blanks[this.props.blankID][Object.keys(this.props.components[this.props.componentID].blanks[this.props.blankID])[0]],
    }
  }

  saveToFirebase = () => {
    let self = this

    let tmp = this.props.components
    tmp[this.props.componentID].blanks[this.props.blankID][Object.keys(tmp[this.props.componentID].blanks[this.props.blankID])[0]] = this.state.value

    firestore.collection(self.props.teamID).doc(self.props.uid).update({components: tmp})
  }

  handleInput = (ev) => {
    this.setState({value: ev.target.value})
  }

  render() {
    return (
        <Input onBlur={this.saveToFirebase} onChange={(ev) => this.handleInput(ev)} value={this.state.value} name='value' 
        label={Object.keys(this.props.components[this.props.componentID].blanks[this.props.blankID])[0]} />
    );
  }
}

export default FirebaseInput;