import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showNavbar } from '../redux/actions/Actions'
import Navbar from './Navbar'

const NavbarContainer = () => {

    const role = JSON.parse(window.localStorage.getItem('user'))?.position

    const { menu } = useSelector(state => state)
    const dispatch = useDispatch()

    const logout = () => {
        window.localStorage.removeItem('user')
        dispatch(showNavbar(false))
    }

    return (
        <Navbar 
            logout={logout} 
            menu={menu} 
            role={role}
        />
    )
}

export default NavbarContainer