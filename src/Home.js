import React, {Component} from 'react'

import Sidebar from 'react-sidebar'
import Side from './SideBar/Side.js'

// import {firestore} from './Backend/base.js'
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
    };
  }

  componentWillMount() {

    let self = this
    mql.addListener(this.mediaQueryChanged)
    window.addEventListener('resize', this.handleWindowChange)
    this.setState({
      mql: mql,
      sidebarDocked: mql.matches,
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
    const data = {
      user: this.props.user,
      uid: this.props.uid,
    }

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
    // if (this.props.path === 'AtlasGrid') {
    let PageRequested = <p>LAUNCH</p>
    // } 
    // else if (this.props.path === 'ClientTeam') {
    //   PageRequested = <ClientTeam owner={this.props.uid} account={this.props.account} />
    // }
    // } else {
    //   PageRequested = <ClientTeam {...data}/>
    // }

    
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