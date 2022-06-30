import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loader from '../../components/loader/Loader'
import KuryerHome from './KuryerHome'

const KuryerHomeContainer = () => {

    const token = JSON.parse(window.localStorage.getItem('user'))?.token
    const userId = JSON.parse(window.localStorage.getItem('user'))?.id

    const [ loading, setLoading ] = useState(true)
    const loader = loading ? <Loader /> : ''

    const [ userBody, setUserBody ] = useState(false)
    const [ orderType, setOrderType ] = useState('courier')

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
    const [ completedCount, setCompletedCount ] = useState(0)
    const [ rejectedCount, setrejectedCount ] = useState(0)
    const [ activePrice, setActivePrice ] = useState(0)
    const [ completedPrice, setCompletedPrice ] = useState(0)
    const [ rejectedPrice, setRejectedPrice ] = useState(0)

    const getAllOrders = () => {
        axios.get('/api/deliver/each', {
            headers: {
                'authorization': `Bearer ${token}`
            },
            params: { 
                status: orderType 
            }
        }).then(res => {
            console.log(res.data)
            res.data.deliverTotal.forEach(item => {
                if( item._id === 'courier' ) {
                    setActiveCount(item.count)
                    setActivePrice(item.totalPrice)
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

            setAllOrders(res.data.deliver)
            setLoading(false)
        }).catch(err => {
            console.log(err)
            setLoading(false)
        })
    }

    const getOrderStatusData = () => {
        axios
            .get('/api/order/card', {
                headers: { "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user")).token } })
            .then(({ data }) => {
                console.log(data)
                // data.orderCount.map(order => {
                //     if(order._id === "active") {
                //         setActiveCount(order.count)
                //         setActivePrice(order.totalPrize)
                //     }
                //     if(order._id === "courier") {
                //         setCourierCount(order.count)
                //         setCourierPrice(order.totalPrize)
                //     }
                //     if(order._id === "rejected") {
                //         setrejectedCount(order.count)
                //         setRejectedPrice(order.totalPrize)
                //     }
                //     if(order._id === "completed") {
                //         setCompletedCount(order.count)
                //         setCompletedPrice(order.totalPrize)
                //     }
                //     return null
                // })
            })
    }

    useEffect(() => {
        getUserData()
        getOrderStatusData()
        //eslint-disable-next-line
    }, [])

    useEffect(() => {
        getAllOrders()
        //eslint-disable-next-line
    }, [ orderType ])

    return (
        <KuryerHome 
            userBody={userBody}
            setUserBody={setUserBody}
            setOrderType={setOrderType} 
            orderType={orderType}
            userData={userData}
            allOrders={allOrders}
            loader={loader}
            activeCount={activeCount}
            activePrice={activePrice}
            completedCount={completedCount}
            completedPrice={completedPrice}
            rejectedCount={rejectedCount}
            rejectedPrice={rejectedPrice}
        />
    )
}

export default KuryerHomeContainer