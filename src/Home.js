import React, {Component} from 'react'

import Sidebar from 'react-sidebar'
import Side from './SideBar/Side.js'
import TaskBox from './TaskBox.js';
import CalendarPage from './CalendarPage.js';

import {firestore} from './base.js'
import {Row, Col} from 'reactstrap'
// import {Redirect} from 'react-router-dom';

import './Home.css'

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

    // this.isLeader()
  }

  isLeader = () => {
    let self = this
    if (this.props.teamID === null || this.props.teamID === undefined) return
    firestore.collection(this.props.teamID).doc(this.props.uid).onSnapshot((snapshot) => {
      self.setState({
        userData: snapshot.data()
      })
    })
  }

  /**
   * 
   * Remove sizing listener
   * 
   */
  // componentWillUnMount() {
  //   window.removeEventListener('resize', this.handleWindowChange)
  // }

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

  
    // Handle Routing for which main page to show
    // This is how the side bar laods the different components
    
    let PageRequested;   
    if (this.props.userData !== null) {
      if (!this.props.userData.leader) {
        if (this.props.page === 'calendar') {
          PageRequested = <CalendarPage />
        } else { 
          PageRequested = <TaskBox color='redGrad' />
        }
      } else {
        PageRequested = <p>LEADER!</p>
      }
    } else {
      PageRequested = null
    }

    
    return (
      <Sidebar {...sideData}> 

        <Row>
          <h1 className='ITAtlasText'> <b>LAUNCH</b></h1>
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