import axios from 'axios'
import React, { useEffect, useState } from 'react'
import KuryerHome from './KuryerHome'

const KuryerHomeContainer = () => {

    const userId = JSON.parse(window.localStorage.getItem('user'))?.id

    const [ userBody, setUserBody ] = useState(false)
    const [ orderType, setOrderType ] = useState('active')

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
        <KuryerHome 
            userBody={userBody}
            setUserBody={setUserBody}
            setOrderType={setOrderType} 
            orderType={orderType}
            userData={userData}
        />
    )
}

export default KuryerHomeContainer