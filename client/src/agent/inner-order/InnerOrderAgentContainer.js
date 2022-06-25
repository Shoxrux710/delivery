import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import InnerOrderAgent from './InnerOrderAgent'

const InnerOrderAgentContainer = () => {

    const params = useParams()
    const id = params.id

    const [ orderById, setOrderById ] = useState()
    const [ orderProducts, setOrderProducts ] = useState([])
    const [ price, setPrice ] = useState(0)

    const getOrderById = () => {
        axios.get(`/api/order/${id}`).then(res => {
            setOrderById(res.data.orderId)
            setOrderProducts(res.data.orderId.products)

            setPrice(res.data.orderId.products.reduce((price, product) => {
                return price + product.count * product.productId?.price
            }, 0))

        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getOrderById()
        //eslint-disable-next-line
    }, [])

    return (
        <InnerOrderAgent 
            orderById={orderById}
            orderProducts={orderProducts}
            price={price}
        />
    )
}

export default InnerOrderAgentContainer