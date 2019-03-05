import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { fireauth } from "../base";
import { Container, Fa, Row, Col, Input, CardHeader, CardBody, CardTitle, Button, Modal, ModalFooter} from 'mdbreact'
import './Side.css'

class Side extends Component {

    constructor(props) {
        super(props)

        this.state = {
            modal: false,
            name: '',
            email: '',
            message: '',
        }
    }
  
    firebaseOut = () => {
        fireauth.signOut().then(() => {
            console.log("User Signed out")
        })
    };
        //handles user logout
    handleSignOut = () => {
        localStorage.removeItem('uid')
        sessionStorage.removeItem('user')
        this.firebaseOut()
        window.location.reload()
    };
  
    render() {
        return (

            <div>
                
                <div>
                    <NavLink style={{textDecoration: 'none'}} to={`/launch/Home`}>
                        <img className='sideLogo' src={'https://upload.wikimedia.org/wikipedia/commons/7/7a/Dell_EMC_logo.svg'} alt="Dell EMC" />
                    </NavLink>

                    {/* <NavLink style={{textDecoration: 'none'}} to={`/itatlas/Home/MyTeam`}>
                        <div className='sideHover'>
                            <i className="fas fa-users"></i>
                            <h6 style={{margin: '0', padding: '0', fontSize: '0.5em'}}>My Team</h6>
                        </div>
                    </NavLink>

                    <NavLink style={{textDecoration: 'none'}} to={`/itatlas/Home/ClientTeam`}>
                        <div className='sideHover'>
                            <i className="fab fa-hubspot"></i>
                            <h6 style={{margin: '0', padding: '0', fontSize: '0.5em'}}>Client Team</h6>
                        </div>
                    </NavLink> */}

                    {/* <NavLink style={{textDecoration: 'none'}} to={`/www.youtube.com`}> */}
                    <a href="https://support.emc.com/myservice360/">
                        <div className='sideHover'>
                            <i className="fab fa-hubspot"></i>
                            <h6 style={{margin: '0', padding: '0', fontSize: '0.5em'}}>Service 360</h6>
                        </div>
                    </a>
                    {/* </NavLink> */}
{/* 

                    <NavLink style={{textDecoration: 'none'}} to={`/itatlas/Home/SEC`}>
                        <div style={{cursor: 'pointer'}} className='sideHover'>
                            <i className="fa fa-money" />
                            <h6 style={{margin: '0', padding: '0', fontSize: '0.5em'}}>SEC Fillings</h6>
                        </div>
                    </NavLink>

                    <NavLink style={{textDecoration: 'none'}} to={`/itatlas/Home/Portfolio`}>
                        <div style={{cursor: 'pointer'}} className='sideHover'>
                            <i className="fa fa-camera-retro" />
                            <h6 style={{margin: '0', padding: '0', fontSize: '0.5em'}}>Dell Tech</h6>
                        </div>
                    </NavLink> */}


                    <NavLink onClick={this.handleSignOut} style={{textDecoration: 'none'}} to={`/launch/SignIn`}>
                        <i className="fas fa-sign-out-alt singOutIcon"/>
                    </NavLink>

                </div>
            </div>
         )
    }
}

export default Side