import React, {Component} from 'react'

import Sidebar from 'react-sidebar'
import Side from './SideBar/Side.js'
import CalendarPage from './CalendarPage.js';
import Leader from './Leader'
import Student from './Student'
import Mentors from './Mentors/Mentors'
// import DropZone from 'react-drop-zone'
import 'react-datepicker/dist/react-datepicker.css';

import {Modal, CardHeader, CardBody, CardTitle, Button, ModalFooter, Input} from "mdbreact";
import {Row, Col} from 'reactstrap'
import DatePicker from 'react-datepicker'
import {firestore, firestorage} from './base';

import './Home.css'
// import moment from 'moment';

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

      newMentor: false,
      mentorName: '',
      mentorLocation: '',
      mentorTitle: '',
      mentorNotes: '',
      mentorPicture: '',

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

  //======================================================== New Task Functions ========================================================
  handleNewTask = () => {
    // let id = this.makeid(10)
    firestore.collection(this.props.teamID).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          let oldTasks = doc.data().tasks
          oldTasks.push({ 
            dueDate: this.state.dueDate,
            completion: 0,
            taskName: this.state.taskName,
          })
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
  //======================================================== End New Task Functions ========================================================

  //======================================================== New Mentor Functions ========================================================
  toggleNewMentor = () => {
    this.setState({newMentor: !this.state.newMentor}) 
  }

  handleNewMentor = () => {
    let self = this
    firestore.collection("leaders").doc(this.props.uid).get().then((doc) => {
      let oldMentors = doc.data().mentors

      oldMentors.push({
        mentorName: self.state.mentorName,
        mentorLocation: self.state.mentorLocation,
        mentorTitle: self.state.mentorTitle,
        mentorNotes: self.state.mentorNotes,
        mentorPicture: self.state.mentorPicture,
      })

      firestore.collection("leaders").doc(self.props.uid).update({mentors: oldMentors})

    })
  
    this.toggleNewMentor()
  }

  handleMentorName = (ev) => {
    this.setState({mentorName: ev.target.value})
  }

  handleMentorLocation = (ev) => {
    this.setState({mentorLocation: ev.target.value})
  }

  handleMentorTitle = (ev) => {
    this.setState({mentorTitle: ev.target.value})
  }

  handleMentorNotes = (ev) => {
    this.setState({mentorNotes: ev.target.value})
  }

  handleMentorPicture = (ev) => {
    this.setState({mentorPicture: ev.target.value})
  }
  //======================================================== End New Mentor Functions ========================================================

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
      if (this.props.page === 'calendar') {
        PageRequested = <CalendarPage {...data}/>
      } else if (this.props.page === 'mentors') {
        PageRequested = <Mentors {...data} />
      }else if (!this.props.userData.leader) {
        PageRequested = <Student {...data}/>
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

        <Modal isOpen={this.state.newMentor} size="md" toggle={this.toggleNewMentor} centered backdrop={false}>   
          <CardHeader className='gradient' color="info-color-dark lighten-1"></CardHeader>
            <CardBody>                   
              <CardTitle className='previewText'>New Mentor</CardTitle>  

              <Input onChange={(ev) => this.handleMentorName(ev)} value={this.state.mentorName} name='name' label='Enter Mentor Name' />
              <Input onChange={(ev) => this.handleMentorLocation(ev)} value={this.state.mentorLocation} name='name' label='Enter Mentor Location' />
              <Input onChange={(ev) => this.handleMentorTitle(ev)} value={this.state.mentorTitle} name='name' label='Enter Mentor Title' />
              <Input onChange={(ev) => this.handleMentorPicture(ev)} value={this.state.mentorPicture} name='name' label='Enter Mentor Picture Link' />
              <Input onChange={(ev) => this.handleMentorNotes(ev)} value={this.state.mentorNotes} name='name' type='textarea' label='Enter Mentor Notes' />
  
            </CardBody>

            <ModalFooter>
                <Button style={{width: '100px', height: '50px'}} className='closeButton' color="warning" onClick={this.toggleNewMentor}>Exit</Button>{' '}
                <Button style={{width: '100px', height: '50px'}} className='saveButton' color="info" onClick={this.handleNewMentor}> Save</Button>
            </ModalFooter>
        </Modal>

        <Row>
          <h1 className='ITAtlasText'> <b>LAUNCH</b></h1>

          {this.props.userData !== null && this.props.userData.leader && this.props.page === 'home' ?
            <Button onClick={this.toggleNewTask} style={{right: '2em', float: 'right', position: 'absolute', marginTop: '21px', marginLeft: '15px'}} color='blue' className='shareButton'>Add Task</Button>              
          :
            null
          }

          {this.props.userData !== null && this.props.userData.leader && this.props.page === 'mentors' ?
            <Button onClick={this.toggleNewMentor} style={{right: '2em', float: 'right', position: 'absolute', marginTop: '21px', marginLeft: '15px'}} color='blue' className='shareButton'>Add Mentor</Button>              
          :
            null
          }
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