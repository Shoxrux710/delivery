import React from 'react'
import { CgMenu } from 'react-icons/cg'
import logoPng from '../../img/logo.png'
import userPng from '../../img/user.png'
import { RiLogoutBoxRLine } from 'react-icons/ri'
import { showNavbar } from '../redux/actions/Actions'
import './navbar.css'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

const Navbar = (props) => {

    const { logout, menu } = props
    const dispatch = useDispatch()

    return (
        <div className='navbar-component'>
            <div className='top'>
                <CgMenu className='icon' onClick={() => dispatch(showNavbar(true))} />
                <img src={logoPng} alt='' />
                <Link to='/profile'>
                    <div className='bg' style={{backgroundImage: `url(${userPng})`}}></div>
                </Link>
            </div>
            
            <div className={menu ? 'navbar-menu navbar-menu-active' : 'navbar-menu'}>
                <div className='menu-top'>
                    <div className='bg'></div>
                    <div className='wrap'>
                        <h2>Azizbek Abduxalilov</h2>
                        <p>Admin</p>
                    </div>
                </div>

                <div className='links-wrapper'>
                    <div className='logout'>
                        <RiLogoutBoxRLine className='icon' onClick={logout} />
                    </div>
                </div>
            </div>
            <div className={menu ? 'navbar-menu-right navbar-menu-right-active' : 'navbar-menu-right'} onClick={() => dispatch(showNavbar(false))}></div>
        </div>
    )
}

export default Navbar