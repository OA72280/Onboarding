import React, {Component} from 'react'

import Sidebar from 'react-sidebar'
import Side from './SideBar/Side.js'
import CalendarPage from './Calendar/CalendarPage.js'
import Leader from './Leader/Leader'
import StudentDashboard from './Student/StudentDashboard'
import Mentors from './Mentors/Mentors'
import MyMentors from './Mentors/MyMentors'
import Avatar from '@material-ui/core/Avatar'
import Chip from '@material-ui/core/Chip'
import PreviewBox from './Leader/PreviewBox'
import TeamDropDown from './TeamDropDown'

import 'react-datepicker/dist/react-datepicker.css'

import {Card, Container, Modal, CardHeader, CardBody, CardTitle, Button, ModalFooter, Input} from "mdbreact"
import {Row, Col} from 'reactstrap'
import DatePicker from 'react-datepicker'
import {firestore} from './base';

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
      mentorID: '',

      allEmployees: [],
      selectedEmployees: [],

      dashboard: false, 
      employeeID: '',

      newTeam: false,
      teamName: '',

      component: false,
      componentData: ["", {label: "", value: ""}],
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
          if (doc.data().tasks !== undefined && doc.data().tasks !== null) {
            let oldTasks = doc.data().tasks
            oldTasks.push({ 
              dueDate: this.state.dueDate,
              completion: 0,
              taskName: this.state.taskName,
            })
            firestore.collection(this.props.teamID).doc(doc.id).update({tasks: oldTasks})
          }
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
  getEmployeesFromLeader = () => {
    let self = this
    let employees = []
    let selected1 = []
    firestore.collection("leaders").doc(this.props.uid).get().then((doc) => {
      for (let i in doc.data().teams) {
        firestore.collection(doc.data().teams[i]).get().then((querySnapshot) => {
          querySnapshot.forEach((doc1) => {

            if (doc1.data().leader) return

            let bool = false
            let selected = doc1.data().mentors
            for (let j in selected) {
              if (selected[j].mentorPicture === self.state.mentorPicture) {
              
                if (doc1.data().name !== undefined && doc1.data().name !== null) {
                  let tmp = this.getInitals(doc1.data().name)

                  selected1.push({
                    id: doc1.id,
                    name: doc1.data().name,
                    initals: tmp
                  })
                  bool = true
                  self.setState({selectedEmployees: selected1})
                }
              }
            }

            if (!bool) {
              if (doc1.data().name !== undefined && doc1.data().name !== null) {
                let tmp = this.getInitals(doc1.data().name)

                employees.push({
                  id: doc1.id,
                  name: doc1.data().name,
                  initals: tmp
                })

                self.setState({allEmployees: employees})
              }
            }
          })
        })
      }
    })
  }

  getInitals = (name) => {
    let arr = name.split(' ');
    if (arr.length > 1) {
      return ( arr[0].charAt(0) + '' + arr[1].charAt(0) )
    } else {
      return name.charAt(0)
    }
  }

  handleSelectionOfEmployee = (person) => {
    let tmpEmployees = this.state.allEmployees
    let tmpSelected = this.state.selectedEmployees
    for (let i in this.state.allEmployees) {
      if (this.state.allEmployees[i].id === person.id) {
        
        if (i > -1) {
          tmpEmployees.splice(i, 1);
        }

        tmpSelected.push(person)
      }
    }
    this.setState({allEmployees: tmpEmployees, selectedEmployees: tmpSelected}, () => {
      this.saveMentee(person)
    })
  }

  handleDeSelectionOfEmployee = (person) => {
    let tmpEmployees = this.state.allEmployees
    let tmpSelected = this.state.selectedEmployees
    for (let i in this.state.selectedEmployees) {
      if (this.state.selectedEmployees[i].id === person.id) {
        
        if (i > -1) {
          tmpSelected.splice(i, 1);
        }

        tmpEmployees.push(person)
      }
    }
    this.setState({allEmployees: tmpEmployees, selectedEmployees: tmpSelected}, () => {
      this.removeMentee(person)
    })
  }

  saveMentee = (person) => {
    let self = this
    firestore.collection("leaders").doc(this.props.uid).get().then((doc) => {
      for (let i in doc.data().teams) {
        firestore.collection(doc.data().teams[i]).get().then((querySnapshot) => {
          querySnapshot.forEach((doc1) => {

            if (doc1.id === person.id) {
              let tmp = doc1.data().mentors

              tmp.push({
                mentorName: self.state.mentorName,
                mentorLocation: self.state.mentorLocation,
                mentorTitle: self.state.mentorTitle,
                mentorNotes: self.state.mentorNotes,
                mentorPicture: self.state.mentorPicture,
                mentorID: self.state.mentorID,
              })
            
              firestore.collection(doc.data().teams[i]).doc(person.id).update({mentors: tmp})
            }

          })
        })
      }
    })
  }

  removeMentee = (person) => {
    let self = this
    firestore.collection("leaders").doc(this.props.uid).get().then((doc) => {
      for (let i in doc.data().teams) {
        firestore.collection(doc.data().teams[i]).get().then((querySnapshot) => {
          querySnapshot.forEach((doc1) => {

            if (doc1.id === person.id) {
              let tmp = doc1.data().mentors

              for (let j in tmp) {
                if (tmp[j].mentorID === self.state.mentorID) {
                  if (j > -1) {
                    tmp.splice(j, 1);
                  }
                }
              }

              firestore.collection(doc.data().teams[i]).doc(person.id).update({mentors: tmp})
            }

          })
        })
      }
    })
  }

  toggleNewMentor = () => {
    this.setState({
      newMentor: !this.state.newMentor,
      mentorName: '',
      mentorLocation: '',
      mentorTitle: '',
      mentorNotes: '',
      mentorPicture: '',
      mentorID: '',
      selectedEmployees: [],
      allEmployees: [],
    }, () => {
      // this.getEmployeesFromLeader()
    }) 
  }

  exitNewMentor = () => {
    this.setState({
      newMentor: !this.state.newMentor,
      mentorName: '',
      mentorLocation: '',
      mentorTitle: '',
      mentorNotes: '',
      mentorPicture: '',
      mentorID: '',
      selectedEmployees: [],
      allEmployees: [],
    })
  }

  toggleNewMentorEdit = (mentorName, mentorLocation, mentorTitle, mentorNotes, mentorPicture, mentorID) => {
    // console.log(mentorID)
    this.setState({
      newMentor: !this.state.newMentor,
      mentorName: mentorName,
      mentorLocation: mentorLocation,
      mentorTitle: mentorTitle,
      mentorNotes: mentorNotes,
      mentorPicture: mentorPicture,
      mentorID: mentorID
    }, () => {
      this.getEmployeesFromLeader()
    }) 
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
        mentorID: self.makeid(10)
      })

      firestore.collection("leaders").doc(self.props.uid).update({mentors: oldMentors})
      self.exitNewMentor()
    })
  
  }

  // TODO Editing is overridding person to the next to them 
  // TODO Think it is calling the wrong method becauseo of the mentorID stuff
  handleMentorEdit = () => {
    let self = this
    firestore.collection("leaders").doc(this.props.uid).get().then((doc) => {
      let oldMentors = doc.data().mentors

      for (let i in oldMentors) {
        if (oldMentors[i].mentorID === self.state.mentorID) {
          oldMentors[i] = {
            mentorName: self.state.mentorName,
            mentorLocation: self.state.mentorLocation,
            mentorTitle: self.state.mentorTitle,
            mentorNotes: self.state.mentorNotes,
            mentorPicture: self.state.mentorPicture,
            mentorID: self.state.mentorID
          }
        }
      }
      // console.log(self.state.mentorID)
      // console.log(oldMentors)
      firestore.collection("leaders").doc(self.props.uid).update({mentors: oldMentors})
      self.exitNewMentor()
    })
  }

  makeid = (size) => {
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    
    for (var i = 0; i < size; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    
    return text;
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
  //======================================================== New Team Functions ========================================================
  handleNewTeam = () => {
    let code = this.makeid(10);

    let self = this
    firestore.collection("leaders").doc(this.props.uid).get().then((doc) => {
      let oldTeams = doc.data().teams

      oldTeams.push(code)

      firestore.collection("leaders").doc(self.props.uid).update({teams: oldTeams})
    })

    firestore.collection(code).doc('teamData').set({teamName: this.state.teamName, tasks: []})
    let tmp = this.props.userData
    tmp.tasks = []
    tmp.team = code
    firestore.collection(code).doc(this.props.uid).set(tmp)

    this.toggleNewTeam()
  }

  toggleNewTeam = () => {
    this.setState({newTeam: !this.state.newTeam})
  }

  handleTeamName = (ev) => {
    this.setState({teamName: ev.target.value})
  }

  //======================================================== New Team Functions ========================================================
  //======================================================== New Component Functions ========================================================

  saveNewComponent = () => {
    let self = this

    firestore.collection(self.props.teamID).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
          if (doc.data().components !== undefined && doc.data().components !== null) {
            let oldCom = doc.data().components

            let tmp = []
            for (let i in self.state.componentData) {
              if (i != 0) {
                let tmp1 = {}
                tmp1[self.state.componentData[i].label] = ""                
                tmp.push(tmp1)
              }
              // tmp.shift()
            }

            oldCom.push({ 
              blanks: tmp,
              name: this.state.componentData[0],
            })

            firestore.collection(self.props.teamID).doc(doc.id).update({components: oldCom})
          }
      });
    });
  }

  toggleNewComponent = () => {
    this.setState({component: !this.state.component})
  }

  handleComponentName = (ev) => {
    let tmp = this.state.componentData
    tmp[0] = ev.target.value
    this.setState({componentData: tmp})
  }

  handleNewInput = () => {
    let tmp = this.state.componentData
    tmp[tmp.length] = {label: "", value: ""}
    this.setState({componentData: tmp})
  }

  handleDeleteInput = () => {
    let tmp = this.state.componentData
    tmp.pop()
    this.setState({componentData: tmp})
  }

  handleComponentEdit = (ev) => {
    let tmp = this.state.componentData
    tmp[ev.target.name] = {label: ev.target.value, value: ev.target.value} 
    this.setState({componentData: tmp})
  }

  //======================================================== New Component Functions ========================================================

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

  handleEmployeeClick = (id) => {
    this.setState({
      dashboard: !this.state.dashboard,
      employeeID: id,
    })
  }

  hideDashboard = () => {
    this.setState({dashboard: !this.state.dashboard})
  }

  render() {

    const styles = theme => ({
      root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
      },
      chip: {
        margin: theme.spacing.unit,
        marginBottom: '50px',
     },
    });

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
        users: this.props.users
    }
    
    // Handle Routing for which main page to show
    // This is how the side bar laods the different components
    
    let PageRequested;   
    if (this.props.userData !== null) {
      if (this.props.page === 'calendar') {
        PageRequested = <CalendarPage {...data}/>
      } 
      // If Leader
      else if (this.props.userData.leader) {
        if (this.props.page === 'mentors') {
          PageRequested = <Mentors toggleNewMentorEdit={this.toggleNewMentorEdit} {...data} />
        } else {
          PageRequested = <Leader employeeID={this.state.employeeID} dashboard={this.state.dashboard} handleEmployeeClick={this.handleEmployeeClick} {...data}/>
        }
      // If employee
      } else {
        if (this.props.page === 'mentors') {
          PageRequested = <MyMentors {...data}/>
        } else {
          PageRequested = <StudentDashboard {...data}/>
        }
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
  

              {/* {this.state.mentorID === '' ? */}
                <div>
                <b>Mentees</b>
                <br/>
             
                {this.state.selectedEmployees.map((person) => {
                  return (
                    <Chip
                      onClick={() => this.handleDeSelectionOfEmployee(person)}
                      key={person.id}
                      avatar={<Avatar>{`${person.initals}`}</Avatar>}
                      label={`${person.name}`}
                      className={styles.chip}
                      style={{marginRight: '15px', marginBottom: '10px'}}
                    />
                  )
                })}

                <hr/>

                <b>All Employees</b>
                <br/>
                {this.state.allEmployees.map((person) => {
                  return (
                    <Chip
                      onClick={() => this.handleSelectionOfEmployee(person)}
                      key={person.id}
                      avatar={<Avatar>{`${person.initals}`}</Avatar>}
                      label={`${person.name}`}
                      className={styles.chip}
                      style={{marginRight: '15px', marginBottom: '10px'}}
                    />
                  )
                })}
                </div>
               {/* :
                null
              } */}
  
            </CardBody>

            <ModalFooter>
                <Button style={{width: '100px', height: '50px'}} className='closeButton' color="warning" onClick={this.exitNewMentor}>Exit</Button>{' '}
                {this.state.mentorID === '' ?
                  <Button style={{width: '100px', height: '50px'}} className='saveButton' color="info" onClick={this.handleNewMentor}> Save</Button>
                :
                  <Button style={{width: '100px', height: '50px'}} className='saveButton' color="info" onClick={this.handleMentorEdit}> Save</Button>

                }
            </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.newTeam} size="sm" toggle={this.toggleNewTeam} centered backdrop={false}>   
          <CardHeader className='gradient' color="info-color-dark lighten-1"></CardHeader>
            <CardBody>                   
              <CardTitle className='previewText'>New Task</CardTitle>  

              <Input onChange={(ev) => this.handleTeamName(ev)} value={this.state.teamName} name='name' label='Enter Task Name' />
  
            </CardBody>

            <ModalFooter>
                <Button style={{width: '100px', height: '50px'}} className='closeButton' color="warning" onClick={this.toggleNewTeam}>Exit</Button>{' '}
                <Button style={{width: '100px', height: '50px'}} className='saveButton' color="info" onClick={this.handleNewTeam}> Save</Button>
            </ModalFooter>
        </Modal>

        {/* <Form onSubmit={this.handleFormSubmit}> */}
        <Modal isOpen={this.state.component} size="lg" toggle={this.toggleNewComponent} centered backdrop={false}>   
          <CardHeader className='gradient' color="info-color-dark lighten-1">New Component</CardHeader>
            <CardBody>                   
              <CardTitle className='previewText'>Preview</CardTitle>  
              
                  <Card>
                    <CardBody>
                      <Container>
                        <Row>
                          <Col sm='3'></Col>
                            <Col sm='6'>
                              <PreviewBox handleComponentEdit={this.handleComponentEdit} componentData={this.state.componentData} title='Cool Title'/>
                            </Col>
                          <Col sm='3'></Col>
                        </Row>
                      </Container>
                    </CardBody>
                  </Card>
              <hr />

              <Input onChange={(ev) => this.handleComponentName(ev)} value={this.state.componentData[0]} name='componentName' label='Enter Component Name' />
              <Button onClick={this.handleNewInput} style={{width: '120px'}} className='saveButton' color="info">New Input</Button>
              <Button onClick={this.handleDeleteInput} style={{width: '120px'}} className='saveButton' color="info">Delete Input</Button>

            </CardBody>

            <ModalFooter>
                <Button style={{width: '100px', height: '50px'}} className='closeButton' color="warning" onClick={this.toggleNewComponent}>Exit</Button>{' '}
                <Button style={{width: '100px', height: '50px'}} className='saveButton'color="info" onClick={this.saveNewComponent}>Save</Button>
            </ModalFooter>
        </Modal>
        {/* </Form> */}

        <Row>
          {this.state.dashboard ?
            <h1 onClick={this.hideDashboard} className='ITAtlasText'> <b>LAUNCH</b></h1>
          :
            <h1 className='ITAtlasText'> <b>LAUNCH</b></h1>
          } 
          
          {this.props.userData !== null && this.props.userData.leader ?
            <TeamDropDown setTeamIDFromState={this.props.setTeamIDFromState} toggleNewTeam={this.toggleNewTeam} className='accountdropdown' {...data}/>
          :
            null
          }


          {this.props.userData !== null && this.props.userData.leader && this.props.page === 'home' ?
            <Button onClick={this.toggleNewTask} style={{right: '2em', float: 'right', position: 'absolute', marginTop: '21px', marginLeft: '15px'}} color='blue' className='shareButton'>Add Task</Button>              
          :
            null
          }

          {this.props.userData !== null && this.props.userData.leader && this.props.page === 'home' && this.state.dashboard ?
            <Button onClick={this.toggleNewComponent} style={{right: '13em', float: 'right', position: 'absolute', marginTop: '21px', marginLeft: '15px'}} color='blue' className='shareButton'>Add Component</Button>              
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