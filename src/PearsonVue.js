import React, {Component} from 'react';
import './Student/TaskBox.css'

import {Row, Col} from 'reactstrap'
import {Input} from 'mdbreact'

class PearsonVue extends Component {

  render() {

    return (
      <div stlye={{height: '5em'}} className="z-depth-5">

        <div style={{height: '50px', width: '100%'}} className={`clientColorbox dropdownColor`}></div>
        
        <p style={{paddingLeft: '20px', paddingRight: '20px'}} className='name'>Pearson Vue</p>

        <hr className='clientHR' />

        <Row>
          <Col sm='1' />
          <Col sm='10'>
            <Input label='Pearson Vue ID'/>
          </Col>
          <Col sm='1' />
        </Row>

      </div>
    );
  }
}

export default PearsonVue;