import React, {Component} from 'react';

import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'mdbreact';

import {firestore} from './base'

class TeamDropDown extends Component {

  constructor(props) {
    super(props)

    this.state = { 
      dropdownOpen: false,
      teams: [],
      teamNames: [],
      translator: {},
    }
  }

  componentWillMount() {
    let self = this
    firestore.collection('leaders').doc(this.props.uid).onSnapshot((doc) => {
      if (doc.data().teams !== null && doc.data().teams !== undefined)
        self.setState({teams: doc.data().teams}, this.getTeamNames(doc.data().teams)) 
    })
  }

  getTeamNames = (teams) => {
    let self = this
    for (let i in teams) {
      firestore.collection(teams[i]).doc('teamData').onSnapshot((doc) => {
        let tmp = this.state.teamNames
        tmp[i] = doc.data().teamName
        let tmp2 = this.state.translator
        tmp2[teams[i]] = tmp[i]
        self.setState({teamName: tmp, translator: tmp2})
      })
    }
  }

  toggle = () => {
    this.setState({dropdownOpen: !this.state.dropdownOpen})
  }

  render() {
    return (
      <div>
        <Dropdown toggle={this.toggle}>
            <DropdownToggle caret className='dropdownColor' color='warning'>
              {this.state.translator[this.props.teamID]}
            </DropdownToggle>
            <DropdownMenu>

              <DropdownItem header>My Accounts</DropdownItem>

              {this.state.teams.map((key, id) => {
                if (key === undefined) return null
                  return (
                    <DropdownItem onClick={() => {this.props.setTeamIDFromState(key)}} key={key}>
                     {this.state.teamNames[id]} ({key})
                    </DropdownItem>
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