import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Loader from '../../components/loader/Loader'
import ManagerHome from './ManagerHome'

const ManagerHomeContainer = () => {

    const token = JSON.parse(window.localStorage.getItem('user'))?.token
    const userId = JSON.parse(window.localStorage.getItem('user'))?.id

    const [ loading, setLoading ] = useState(true)
    const loader = loading ? <Loader /> : ''

    const [ userBody, setUserBody ] = useState(false)
    const [ orderType, setOrderType ] = useState('active')

    const [ agentsCount, setAgentsCount ] = useState('')
    const [ kuryersCount, setKuryersCount ] = useState('')
    const [ isModalVisible, setIsModalVisible ] = useState(false)
    
    const [ userData, setUserData ] = useState()
    const [ couriers, setCouriers ] = useState([])

    const getUserData = () => {
        axios.get(`/api/user/userId/${userId}`, ).then(res => {
            setUserData(res.data.userId)

            axios.get(`/api/user/each?position=agent&regionId=${res.data.userId.regionId._id}`).then(res => {
                setAgentsCount(res.data.count)
            }).catch(err => {
                console.log(err)
            })

            axios.get(`/api/user/each?position=courier&regionId=${res.data.userId.regionId._id}`).then(res => {
                setCouriers(res.data.userEach)
                setKuryersCount(res.data.count)
            }).catch(err => {
                console.log(err)
            })


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
            setAllOrders(res.data.orderManger)
            setLoading(false)
        }).catch(err => {
            console.log(err)
            setLoading(false)
        })
    }

    const [ curOrder, setCurOrder ] = useState(null)

    const getCurOrder = (order) => {
        setCurOrder(order)
        setIsModalVisible(true)
    }

    const getOrderStatusData = () => {
        axios
            .get('/api/order/card', {
                headers: { "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user")).token } })
            .then(({ data }) => {
                data.orderCount.map(order => {
                    if(order._id === "active") {
                        setActiveCount(order.count)
                        setActivePrice(order.totalPrice)
                    }
                    if(order._id === "courier") {
                        setCourierCount(order.count)
                        setCourierPrice(order.totalPrice)
                    }
                    if(order._id === "rejected") {
                        setrejectedCount(order.count)
                        setRejectedPrice(order.totalPrice)
                    }
                    if(order._id === "completed") {
                        setCompletedCount(order.count)
                        setCompletedPrice(order.totalPrice)
                    }
                    return null
                })
            })
    }

    const [ selectedCourier, setSelectedCourier ] = useState(null)

    const giveOrderToCourier = () => {
        if(selectedCourier) {
            axios
                .post('/api/deliver/all', 
                    { orderId: curOrder._id, courierId: selectedCourier },
                    { headers: { "Authorization": "Bearer " + token } })
                .then(({ data }) => {
                    toast.success("Muvaffaqqiyatli biriktirildi!", {
                        position: toast.POSITION.BOTTOM_RIGHT
                    })
                    getAllOrders()
                    setIsModalVisible(false)
                    getOrderStatusData()
                })
                .catch((err) => { console.log(err) })
        } else {
            alert("Kuryerni tanlang!")
        } 
    }

    const [ debt, setDebt ] = useState(0)
    const getDebt = () => {
        axios
            .get('/api/cheque/debt', {
                headers: { "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user")).token },
            })
            .then(({data}) => {
                setDebt(data.chequeDebt[0].count)
            })
    }

    useEffect(() => {
        getDebt()
        getUserData()
        getOrderStatusData()
        //eslint-disable-next-line
    }, [])

    useEffect(() => {
        getAllOrders()
        //eslint-disable-next-line
    }, [ orderType ])


    return (
        <ManagerHome 
            couriers={couriers}
            curOrder={curOrder}
            getCurOrder={getCurOrder}
            setSelectedCourier={setSelectedCourier}
            giveOrderToCourier={giveOrderToCourier}
            userBody={userBody}
            setUserBody={setUserBody}
            setOrderType={setOrderType} 
            orderType={orderType}
            agentsCount={agentsCount}
            kuryersCount={kuryersCount}
            userData={userData}
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
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
            debt={ debt }
        />
    )
}

export default ManagerHomeContainer