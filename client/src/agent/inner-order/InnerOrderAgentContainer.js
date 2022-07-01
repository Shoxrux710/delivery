import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Loader from '../../components/loader/Loader'
import InnerOrderAgent from './InnerOrderAgent'

const InnerOrderAgentContainer = () => {

    const params = useParams()
    const id = params.id

    const [ loading, setLoading ] = useState(true)
    const loader = loading ? <Loader /> : ''


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
        }).finally(fin => setLoading(false))
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
            loader={loader}
            loading={loading}
        />
    )
}

export default InnerOrderAgentContainer