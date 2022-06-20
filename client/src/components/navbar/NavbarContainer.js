import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showNavbar } from '../redux/actions/Actions'
import Navbar from './Navbar'

const NavbarContainer = () => {

    const role = JSON.parse(window.localStorage.getItem('user'))?.position
    const userId = JSON.parse(window.localStorage.getItem('user'))?.id

    const { menu } = useSelector(state => state)
    const dispatch = useDispatch()

    const logout = () => {
        window.localStorage.removeItem('user')
        dispatch(showNavbar(false))
    }

    const [ userData, setUserData ] = useState()
    const getUserData = () => {
        axios.get(`/api/user/userId/${userId}`, ).then(res => {
            setUserData(res.data.userId)
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getUserData()
        //eslint-disable-next-line
    }, [])

    return (
        <Navbar 
            logout={logout} 
            menu={menu} 
            role={role}
            userData={userData}
        />
    )
}

export default NavbarContainer