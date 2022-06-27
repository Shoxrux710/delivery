import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import InnerOrder from './InnerOrder'

const InnerOrderContainer = () => {

    const token = JSON.parse(window.localStorage.getItem('user'))?.token

    const params = useParams()
    const id = params.id

    const [ isModalVisible, setIsModalVisible ] = useState(false)

    const [ orderById, setOrderById ] = useState()
    const [ orderProducts, setOrderProducts ] = useState([])
    const [ price, setPrice ] = useState(0)

    const getOrderById = () => {
        axios.get(`/api/deliver/${id}`).then(res => {
            setOrderById(res.data.deliverId)
            setOrderProducts(res.data.deliverId.products)

            setPrice(res.data.deliverId.orderId.products.reduce((price, product) => {
                return price + product.count * product.productId?.price
            }, 0))

        }).catch(err => {
            console.log(err)
        })
    }

    const [ comment, setComment ] = useState('')
    const [ cash, setCash ] = useState('')
    const [ debt, setDebt ] = useState('')
    const [ card, setCard ] = useState('')

    const completeOrder = (e) => {
        e.preventDefault()

        const formData = {
            deliveryId: id,
            comment,
            cash,
            card,
            debt
        }

        axios.post(`/api/cheque/all`, formData, {
            headers: {
                'authorization': `Bearer ${token}`
            }
        }).then(res => {
            toast.success("Muvaffaqqiyatli yakunlandi!", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
            setCard('')
            setCash('')
            setDebt('')
            setComment('')
            setIsModalVisible(false)
        }).catch(err => {
            toast.error("Error!", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
    }

    const rejectOrder = () => {
        axios.put(`/api/order/${id}`, {}, {
            headers: {
                'authorization': `Bearer ${token}`
            }
        }).then(res => {
            toast.success("Rad etildi!", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        }).catch(err => {
            toast.error("Error!", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
    }

    useEffect(() => {
        getOrderById()
        //eslint-disable-next-line
    }, [])

    return (
        <InnerOrder
            isModalVisible={isModalVisible} 
            setIsModalVisible={setIsModalVisible} 
            orderById={orderById}
            orderProducts={orderProducts}
            price={price}
            comment={comment}
            setComment={setComment}
            cash={cash}
            setCash={setCash}
            card={card}
            setCard={setCard}
            debt={debt}
            setDebt={setDebt}
            completeOrder={completeOrder}
            rejectOrder={rejectOrder}
        />
    )
}

export default InnerOrderContainer