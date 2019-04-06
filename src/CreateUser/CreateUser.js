import React, {Component} from 'react';
import './CreateUser.css';

import {Input, Button} from 'mdbreact';
import {Form, Row, Col, Alert} from 'reactstrap';
import DropZone from 'react-drop-zone'

import {fireauth, firestore, firestorage} from '../base';
// import {database} from './base';

class CreateUser extends Component {

  constructor(props) {
    super(props);

    this.state = {
      //Hides message when opening create user | object | ex. error message
      visible: false,
      message: '',
      checked: false,

      uploadedImage: '',
      showImageDrop: true,
    };
  }

  /**
     * 
     * Submits user information in create user form
     * 
     * @param ev: |event| Ex: {click}
     * 
     */

  onSubmit = (ev) => {
    let self = this
    ev.preventDefault();
    let target = ev.target;

    if ( target.firstName.value === ''
      || target.lastName.value === ''
      || target.email.value === ''
      || target.password.value === ''
      || target.confirmPassword.value === '') {

        this.setState({visible: true, message: 'Please fill out the entire form!'});
    } else {

      if (target.password.value !== target.confirmPassword.value)
        this.setState({visible: true, message: 'Passwords Don\'t Match!'});
      else {

        //creates user with email and password
        fireauth.createUserWithEmailAndPassword(target.email.value, target.password.value).then(() => {

          // If Team Leader
          if (this.state.checked) {

            let code = this.makeid(6)

            this.props.setTeamIDFromState(code)

            firestore.collection('leaders').doc(fireauth.currentUser.uid).set({
              name: `${target.firstName.value} ${target.lastName.value}`,
              email: target.email.value,
              leader: true,
              teams: [code],
              mentors: [],
              tasks: [],
              picture: self.state.uploadedImage,
            })

            firestore.collection("peopleData").doc(fireauth.currentUser.uid).set({
              name: `${target.firstName.value} ${target.lastName.value}`,
              email: target.email.value,
              leader: true, 
              team: code,
              picture: self.state.uploadedImage,
            })

          // Not Team Leader
          } else {

            this.props.setTeamIDFromState(target.teamCode.value)

            firestore.collection(target.teamCode.value).doc(fireauth.currentUser.uid).set({
              name: `${target.firstName.value} ${target.lastName.value}`,
              email: target.email.value,
              leader: false, 
              team: target.teamCode.value,
              tasks: [],
              picture: self.state.uploadedImage,
            })

            firestore.collection("peopleData").doc(fireauth.currentUser.uid).set({
              name: `${target.firstName.value} ${target.lastName.value}`,
              email: target.email.value,
              leader: false, 
              team: target.teamCode.value,
              picture: self.state.uploadedImage,
            })

          }
        })
      }
    }
  };
  
  /**
     * 
     * dismisses alert
     * 
     * @param ev: |event| Ex: {click}
     * 
     */

  onDismiss = () => {
    this.setState({ visible: false });
  };

  /**
     * 
     * Creates random ID for user in database
     * 
     * 
     */

  makeid = (size) => {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    
    for (var i = 0; i < size; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    
    return text;
  }

  toggleCheckbox = () => {
    this.setState({
      checked: !this.state.checked,
    })
  }

  makeid = () => {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    
    for (var i = 0; i < 10; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    
    return text;
  }

  handleImage = (file, text) => {
    let self = this
    var portImageRef = firestorage.child(`user/${file.name}${this.makeid()}`);
    portImageRef.put(file).then(function(snapshot) {
      snapshot.ref.getDownloadURL().then(function(downloadURL) {
          self.setState({
            uploadedImage: downloadURL,
            showImageDrop: false,
        })
      });
    })
  }

  render() {
    return (
      <section className="container">
        <div className="left-half tall" />
        <div className="right-half tall">
          <article>
            <Row>
              <Col className='imgCol' sm='0' md='3'>
                <img className='logo' src={'https://upload.wikimedia.org/wikipedia/commons/7/7a/Dell_EMC_logo.svg'} alt="Dell EMC" />
              </Col>
              {/* <Col xs='0' md='1'/> */}
              <Col className='text' sm='12' md='7'>
                Lets Start by Signing Up!
              </Col>
            </Row>
            <br/>
            <Alert color="primary" isOpen={this.state.visible} toggle={this.onDismiss}>
              {this.state.message}
            </Alert>
            <Form onSubmit={this.onSubmit}>
              <Row>
                <Col xs='12' md='6'>
                  <Input name='firstName' className='firstName' style={{fontSize: '0.85em'}} label="First Name"/>
                </Col>
                <Col xs='12' md='6'>
                  <Input name='lastName' className='lastName' style={{fontSize: '0.85em'}} label="Last Name"/>
                </Col>
              </Row>
              <Input name='email' style={{fontSize: '0.85em'}} label="Email"/>
              <Input name='password' label="Password" type="password"/>
              <Input name='confirmPassword' label="Confirm Password" type="password"/>
              
              {!this.state.checked ? 
                  <Input name='teamCode' label="Team Code" />
                :
                  null
              }

              {this.state.uploadedImage === '' ?
                <DropZone onDrop={(file, text) => this.handleImage(file, text)}>
                {({ over, overDocument }) =>
                  <div className='drop-zone'>
                    {
                      over ?
                        'We got the Image, Let it go!' :
                      overDocument ?
                        'Please Place the Image in the Gray Box' :
                        'Upload An Image'
                    }
                  </div>
                }
                </DropZone>
              :
                <Row>
                  <Col>
                    <img className='droppedImage' style={{width: '100px'}} alt='img' src={this.state.uploadedImage} />  
                  </Col>
                  <br />
                </Row>
              }

              <input onChange={this.toggleCheckbox} defaultChecked={this.state.checked} type="checkbox" /> Team Leader
              <br />
              <br /> 
              <Button type='submit' className='signInButton' color="blue">Sign Up!</Button>

            </Form>
          </article>
        </div>
      </section>
    );
  }
}

export default CreateUser;