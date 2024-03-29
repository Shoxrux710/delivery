import React from 'react'
import { CgMenu } from 'react-icons/cg'
import logoPng from '../../img/logo.png'
import userPng from '../../img/user.png'
import { RiLogoutBoxRLine } from 'react-icons/ri'
import { showNavbar } from '../redux/actions/Actions'
import './navbar.css'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { BsGlobe, BsPlusLg } from 'react-icons/bs'
import { BiDollarCircle } from 'react-icons/bi'

const Navbar = (props) => {

    const { logout, menu, role, userData } = props
    const dispatch = useDispatch()

    return (
        <div className='navbar-component'>
            <div className='top'>
                <CgMenu className='icon' onClick={() => dispatch(showNavbar(true))} />
                <Link to='/'>
                    <img src={logoPng} alt='' />
                </Link>
                <Link to={role === 'agent' ? '/profile' : '/'}>
                    <div className='bg' style={{backgroundImage: `url(${userPng})`}}></div>
                </Link>
            </div>
            
            <div className={menu ? 'navbar-menu navbar-menu-active' : 'navbar-menu'}>
                <div className='menu-top'>
                    <div className='bg'></div>
                    <div className='wrap'>
                        <h2>{userData ? userData.fullname : ''}</h2>
                        <p>{userData ? userData.position : ''}</p>
                    </div>
                </div>

                <div className='menus'>
                    {
                        role === 'admin' || role === 'super-admin' ? (
                            <Link to='/add-product' className='qator' onClick={() => dispatch(showNavbar(false))}>
                                <BsPlusLg className='icon' />
                                <h3>Mahsulot qo’shish</h3>
                            </Link>
                        ) : null
                    }

                    {
                        role === 'admin' || role === 'super-admin' || role === 'manager' ? (
                            <Link to='/all-money' className='qator last' onClick={() => dispatch(showNavbar(false))}>
                                <BiDollarCircle className='icon' style={{fontSize: '20px'}} />
                                <h3>Qo'ldagi pullar</h3>
                            </Link>
                        ) : null
                    }

                    <Link to='/' className='qator' onClick={() => dispatch(showNavbar(false))}>
                        <BsGlobe className='icon' style={{fontSize: '20px'}} />
                        <h3>Til</h3>
                    </Link>
                </div>

                <div className='logout' onClick={logout}>
                    <RiLogoutBoxRLine className='icon' />
                    <h3>Chiqish</h3>
                </div>
                
            </div>
            <div className={menu ? 'navbar-menu-right navbar-menu-right-active' : 'navbar-menu-right'} onClick={() => dispatch(showNavbar(false))}></div>
        </div>
    )
}

export default Navbar