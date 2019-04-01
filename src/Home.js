import React, {Component} from 'react'

import Sidebar from 'react-sidebar'
import Side from './SideBar/Side.js'
import CalendarPage from './CalendarPage.js';
import Leader from './Leader'
import Student from './Student'
import 'react-datepicker/dist/react-datepicker.css';

import {Modal, CardHeader, CardBody, CardTitle, Button, ModalFooter, Input} from "mdbreact";
// import {firestore} from './base.js'
import {Row, Col} from 'reactstrap'
import DatePicker from 'react-datepicker'
import {firestore} from './base';
// import {Redirect} from 'react-router-dom';

import './Home.css'
import moment from 'moment';

const mql = window.matchMedia(`(min-width: 600px)`)

class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      // Used to handle width changes 
      width: window.innerWidth,
      mql: mql,
      docked: props.docked,
      open: props.open,
      userData: null,

      newTask: false,
      taskName: '',
      dueDate: new Date(),
    };
  }

  componentWillMount() {
    // let self = this
    mql.addListener(this.mediaQueryChanged)
    window.addEventListener('resize', this.handleWindowChange)
    this.setState({
      mql: mql,
      sidebarDocked: mql.matches,
    })
  }

  handleNewTask = () => {
    let id = this.makeid(10)
    firestore.collection(this.props.teamID).onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          let oldTasks = doc.data().tasks
          oldTasks[id] = { 
            dueDate: this.state.dueDate,
            completion: 0,
            taskName: this.state.taskName,
          }
          firestore.collection(this.props.teamID).doc(doc.id).update({tasks: oldTasks})
      });
    });
    this.toggleNewTask()
  }

  toggleNewTask = () => { 
    this.setState({newTask: !this.state.newTask}) 
  }

  handleTaskName = (ev) => {
    this.setState({
      taskName: ev.target.value
    })
  }

  handleDueDate = (date) => {
    this.setState({
      dueDate: date
    })
  }

  makeid = (size) => {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    
    for (var i = 0; i < size; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    
    return text;
  }

  /**
   *
   * Toggle side bar from hidden side bar button
   *
   */
  dockSideBar = () => {
    if (this.state.sidebarDocked)
      this.setState({
        sidebarOpen: false,
      });
    else
      this.setState({
        sidebarOpen: true,
      });
  };

  /**
   *
   * Set state when side bar is open
   *
   * @param open: |Boolean|
   */
  onSetSidebarOpen = (open) => {
    this.setState({
      sidebarOpen: open,
    });
  };

  /**
   * 
   * Change side bar boolean to hide sidebar
   * 
   */
  mediaQueryChanged = () => {
    this.setState({
      sidebarDocked: this.state.mql.matches,
    });
  };


  render() {

    // Side bar loaded from Side component
    let sidebarContent = <Side />;

    // Side bar const styles
    const sidebarStyles = {
      sidebar: {
        backgroundColor: '#f2f2f2',
        width: '5em',
        textAlign: 'center',
      },
      overlay: {
        backgroundColor: '#f3f3f3'
      },
    };

    // Data about user and where they are
    // const data = {
    //   user: this.props.user,
    //   uid: this.props.uid,
    // }

    // Data used to show side bar 
    const sideData = {
      styles: sidebarStyles,
      sidebar: sidebarContent,
      open: this.state.sidebarOpen,
      docked: this.state.sidebarDocked,
      onSetOpen: this.onSetSidebarOpen,
    };

    const data = {
      user: this.props.user,
      uid: this.props.uid,
      userData: this.props.userData,
      teamID: this.props.teamID,
    }

    // Handle Routing for which main page to show
    // This is how the side bar laods the different components
    
    let PageRequested;   
    if (this.props.userData !== null) {
      if (!this.props.userData.leader) {
        if (this.props.page === 'calendar') {
          PageRequested = <CalendarPage />
        } else { 
          PageRequested = <Student {...data}/>
        }
      } else {
        PageRequested = <Leader {...data}/>
      }
    } else {
      PageRequested = null
    }

    
    return (
      <Sidebar {...sideData}> 

        <Modal isOpen={this.state.newTask} size="sm" toggle={this.toggleNewTask} centered backdrop={false}>   
          <CardHeader className='gradient' color="info-color-dark lighten-1"></CardHeader>
            <CardBody>                   
              <CardTitle className='previewText'>New Task</CardTitle>  

              <Input onChange={(ev) => this.handleTaskName(ev)} value={this.state.taskName} name='name' label='Enter Task Name' />
  
              <DatePicker
                selected={this.state.dueDate}
                onChange={this.handleDueDate}
              />

            </CardBody>

            <ModalFooter>
                <Button style={{width: '100px', height: '50px'}} className='closeButton' color="warning" onClick={this.toggleNewTask}>Exit</Button>{' '}
                <Button style={{width: '100px', height: '50px'}} className='saveButton' color="info" onClick={this.handleNewTask}> Save</Button>
            </ModalFooter>
          </Modal>

        <Row>
          <h1 className='ITAtlasText'> <b>LAUNCH</b></h1>
          <Button onClick={this.toggleNewTask} style={{right: '2em', float: 'right', position: 'absolute', marginTop: '21px', marginLeft: '15px'}} color='blue' className='shareButton'>Client Team</Button>    
        </Row>

        <hr/>
        <Row>
          <Col sm='1'/>
          <Col className='animated zoomIn live' sm='10'>
            {PageRequested}
          </Col>
          <Col sm='1'/>
        </Row>

        <br />
        <br />
        <br />

      </Sidebar>
    )
  }
}

export default Home;