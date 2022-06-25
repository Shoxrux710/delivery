import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loader from '../../components/loader/Loader'
import AgentProfile from './AgentProfile'

const AgentProfileContainer = () => {

    const token = JSON.parse(window.localStorage.getItem('user'))?.token
    const userId = JSON.parse(window.localStorage.getItem('user'))?.id

    const [ loading, setLoading ] = useState(true)
    const loader = loading ? <Loader /> : ''

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

    const [ allOrders, setAllOrders ] = useState([])
    const [ activeCount, setActiveCount ] = useState(0)
    const [ courierCount, setCourierCount ] = useState(0)
    const [ completedCount, setCompletedCount ] = useState(0)
    const [ rejectedCount, setrejectedCount ] = useState(0)
    const [ activePrice, setActivePrice ] = useState(0)
    const [ courierPrice, setCourierPrice ] = useState(0)
    const [ completedPrice, setCompletedPrice ] = useState(0)
    const [ rejectedPrice, setRejectedPrice ] = useState(0)

    const getAllOrders = () => {
        axios.get('/api/order/each', {
            headers: {
                'authorization': `Bearer ${token}`
            },
            params: { 
                status: orderType 
            }
        }).then(res => {
            res.data.orderCount.forEach(item => {
                if( item._id === 'active' ) {
                    setActiveCount(item.count)
                    setActivePrice(item.totalPrice)
                }
                if( item._id === 'courier' ) {
                    setCourierCount(item.count)
                    setCourierPrice(item.totalPrice)
                }
                if( item._id === 'completed' ) {
                    setCompletedCount(item.count)
                    setCompletedPrice(item.totalPrice)
                }
                if( item._id === 'rejected' ) {
                    setrejectedCount(item.count)
                    setRejectedPrice(item.totalPrice)
                }
            })

            setAllOrders(res.data.orderStatus)
            setLoading(false)
        }).catch(err => {
            console.log(err)
            setLoading(false)
        })
    }

    useEffect(() => {
        getUserData()
        //eslint-disable-next-line
    }, [])

    useEffect(() => {
        getAllOrders()
        //eslint-disable-next-line
    }, [ orderType ])

    return (
        <AgentProfile 
            userBody={userBody}
            setUserBody={setUserBody}
            setOrderType={setOrderType} 
            orderType={orderType}
            userData={userData}
            allOrders={allOrders}
            loader={loader}
            activeCount={activeCount}
            activePrice={activePrice}
            courierCount={courierCount}
            courierPrice={courierPrice}
            completedCount={completedCount}
            completedPrice={completedPrice}
            rejectedCount={rejectedCount}
            rejectedPrice={rejectedPrice}
        />
    )
}

export default AgentProfileContainer