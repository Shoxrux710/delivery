import axios from 'axios'
import React, { useEffect, useState } from 'react'
import KuryerHome from './KuryerHome'

const KuryerHomeContainer = () => {

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

    const getEachOrders = () => {
        axios.get(`/api/order/each`, {
            headers: { "Authorization":  "Bearer " + JSON.parse(localStorage.getItem("user")).token },
            params: { status: 'courier' }
        })
        .then(({data}) => {
            console.log(data)
        })
    }

    useEffect(() => {
        getUserData()
        getEachOrders()
        //eslint-disable-next-line
    }, [])

    return (
        <KuryerHome 
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

export default KuryerHomeContainer