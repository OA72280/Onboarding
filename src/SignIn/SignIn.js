import React, {Component} from 'react';
import './SignIn.css';

import {Input, Button} from 'mdbreact';
import {Form, Row, Col, Alert} from 'reactstrap';
import {NavLink} from 'react-router-dom';

import {fireauth} from '../base'

class SignIn extends Component {

  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      errorMessage: '',
    }
  }

  /**
     * 
     * Allows user to sign in with email and password when submitted
     * 
     * @param ev: |event| Ex: {click}
     * 
     */

  handleSignIn = (ev) => {
    ev.preventDefault();

    let self = this;
    fireauth.signInWithEmailAndPassword(ev.target.email.value, ev.target.password.value)
      .catch(function(err) {
        self.setState({visible: true, errorMessage: err.message})
      });
  };

  /**
     * 
     * Dismiss error box
     * 
     * @param : |event| Ex: {click}
     * 
     */

  onDismiss = () => {
    this.setState({visible: false})
  };

  render() {
    return (
      <section className="container">
        <div className="left-half tall" />
        <div className="right-half tall">
          <article>
            <Row>
              <Col className='imgCol' sm='0' md='4'>
                <img className='logo' src={'https://upload.wikimedia.org/wikipedia/commons/7/7a/Dell_EMC_logo.svg'} alt="Dell EMC" />
              </Col>
              <Col className='text' sm='12' md='7'>Welcome to the LAUNCH!
              </Col>
            </Row>
            <Alert color="primary" isOpen={this.state.visible} toggle={this.onDismiss}>
              {this.state.errorMessage}
            </Alert>
            <Form onSubmit={this.handleSignIn}>
              <Input name='email' style={{fontSize: '0.85em'}} label="Email"/>
              <Input name='password' label="Password" type="password"/>
              <br/>
              <Button className='signInButton' type='submit' color="blue" >Sign In!</Button>
              <NavLink style={{textDecoration: 'none'}} to="/CreateAccount">Sign Up!</NavLink>
            </Form>
          </article>
        </div>
      </section>
    );
  }
}

export default SignIn;