import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loader from '../../components/loader/Loader'
import AgentHome from './AgentHome'

const AgentHomeContainer = () => {

    const [ loading, setLoading ] = useState(true)
    const loader = loading ? <Loader /> : ''

    const [ h2, setH2 ] = useState('order')
    const [ isModalVisible, setIsModalVisible ] = useState(false)

    const [ allCustomer, setAllCustomer ] = useState([])
    const getAllCustomer = () => {
        axios.get('/api/customer').then(res => {
            setAllCustomer(res.data.customer)
            setLoading(false)
        }).catch(err => {
            console.log(err)
            setLoading(false)
        })
    }

    useEffect(() => {
        getAllCustomer()
        //eslint-disable-next-line
    }, [])

    return (
        <AgentHome 
            h2={h2} 
            setH2={setH2} 
            isModalVisible={isModalVisible} 
            setIsModalVisible={setIsModalVisible} 
            allCustomer={allCustomer}
            getAllCustomer={getAllCustomer}
            loader={loader}
        />
    )
}

export default AgentHomeContainer