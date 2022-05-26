import React from 'react'
import { CgMenu } from 'react-icons/cg'
import logoPng from '../../img/logo.png'
import userPng from '../../img/user.png'
import './navbar.css'

const Navbar = () => {
    return (
        <div className='navbar-component'>
            <div className='top'>
                <CgMenu className='icon' />
                <img src={logoPng} alt='' />
                <div className='bg' style={{backgroundImage: `url(${userPng})`}}></div>
            </div>
        </div>
    )
}

export default Navbar