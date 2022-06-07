import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AgentProfile from './AgentProfile'

const AgentProfileContainer = () => {

    const userId = JSON.parse(window.localStorage.getItem('user'))?.id

    const [ userBody, setUserBody ] = useState(false)
    const [ orderType, setOrderType ] = useState('active')
    const [ orderMenu, setOrderMenu ] = useState(false)
    const [ leftNames, setLeftNames ] = useState(false)

    const [ userData, setUserData ] = useState()
    const getUserData = () => {
        axios.get(`/api/user/userId/${userId}`).then(res => {
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
        <AgentProfile 
            userBody={userBody}
            setUserBody={setUserBody}
            setOrderType={setOrderType} 
            orderType={orderType}
            userData={userData}
            leftNames={leftNames}
            setLeftNames={setLeftNames}
            orderMenu={orderMenu}
            setOrderMenu={setOrderMenu}
        />
    )
}

export default AgentProfileContainer