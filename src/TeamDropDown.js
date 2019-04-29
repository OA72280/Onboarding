import React, {Component} from 'react';

import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'mdbreact';

// import {Row, Col} from 'reactstrap'
// import {Input} from 'mdbreact'
import {firestore} from './base'

class TeamDropDown extends Component {

  constructor(props) {
    super(props)

    this.state = { 
      dropdownOpen: false,
      teams: [],
    }
  }

  componentWillMount() {
    let self = this
    firestore.collection('leaders').doc(this.props.uid).onSnapshot((doc) => {
      if (doc.data().teams !== null && doc.data().teams !== undefined)
        self.setState({teams: doc.data().teams}) 
    })
  }

  toggle = () => {
    this.setState({dropdownOpen: !this.state.dropdownOpen})
  }

  handleNewAtlas = () => {
    console.log('new!')
  }

  render() {
    return (
      <div>
        <Dropdown style={{marginTop: '15px', marginLeft: '15px'}} toggle={this.toggle}>
            <DropdownToggle caret className='dropdownColor' color='warning'>
              Test
            </DropdownToggle>
            <DropdownMenu>

              <DropdownItem header>My Accounts</DropdownItem>

              {this.state.teams.map((key) => {
                if (key === undefined) return null
                  return (
                    // <NavLink key={key} to={`/itatlas/Home/AtlasGrid/${this.props.uid}/${key}`}>
                      <DropdownItem onClick={() => {this.props.setTeamIDFromState(key)}} key={key}>
                        {key}
                      </DropdownItem>
                    // </NavLink>  
                  )
              })}
        
              <DropdownItem divider />

              <DropdownItem className='newLocation' onClick={this.props.toggleNewTeam} >New Account</DropdownItem>

            </DropdownMenu>
          </Dropdown>
        </div>
    );
  }
}

export default TeamDropDown;