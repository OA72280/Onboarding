import React, {Component} from 'react';
import '../Student/TaskBox.css'

import {Row, Col} from 'reactstrap'
import {Input} from 'mdbreact'
class PreviewBox extends Component {

  render() {
    return (
      <div stlye={{height: '5em'}} className="z-depth-5">

        <div style={{height: '50px', width: '100%'}} className={`clientColorbox dropdownColor`}></div>
        
        <p style={{paddingLeft: '20px', paddingRight: '20px'}} className='name'>{this.props.componentData[0]}</p>

        <hr className='clientHR' />

        <Row>
          <Col sm='1' />
          <Col sm='10'>

            {this.props.componentData.map((data, id) => {
              console.log(data)
              if (id != 0)
                return (
                  <Input key={id} onChange={(ev) => this.props.handleComponentEdit(ev)} value={data.value} name={id} style={{fontSize: '0.85em'}} />
                )
            })}
          </Col>
          <Col sm='1' />
        </Row>

      </div>
    );
  }
}

export default PreviewBox;