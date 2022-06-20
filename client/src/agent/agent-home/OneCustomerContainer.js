import axios from 'axios'
import React, { useState } from 'react'
import OneCustomer from './OneCustomer'

const OneCustomerContainer = (props) => {

    const token = JSON.parse(window.localStorage.getItem('user'))?.token
    const { item } = props
    const [ isModalVisible, setIsModalVisible ] = useState(false)

    const getCustomerById = (id) => {
        setIsModalVisible(true)

        axios.get(`/api/customer/update/${id}`, {
            headers: {
                'authorization': `Bearer ${token}`
            }
        }).then(res => {
            console.log(res.data)
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <OneCustomer 
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
            item={item}
            getCustomerById={getCustomerById}
        />
    )
}

export default OneCustomerContainer