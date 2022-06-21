import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Loader from '../../components/loader/Loader'
import AgentHome from './AgentHome'

const AgentHomeContainer = () => {

    const userId = JSON.parse(window.localStorage.getItem('user'))?.id

    const [ regionId, setRegionId ] = useState('')
    const getUserData = () => {
        axios.get(`/api/user/userId/${userId}`).then(res => {
            setRegionId(res.data.userId.regionId._id)
        }).catch(err => {
            console.log(err)
        })
    }

    const [ loading, setLoading ] = useState(true)
    const loader = loading ? <Loader /> : ''

    const [ h2, setH2 ] = useState('order')
    const [ isModalVisible, setIsModalVisible ] = useState(false)

    const [ allCustomer, setAllCustomer ] = useState([])
    const getAllCustomer = () => {
        if( regionId ) {
            axios.get(`/api/customer?regionId=${regionId}`).then(res => {
                setAllCustomer(res.data.customer)
                setLoading(false)
            }).catch(err => {
                console.log(err)
                setLoading(false)
            })
        }
    }

    useEffect(() => {
        getAllCustomer()
        getUserData()
        //eslint-disable-next-line
    }, [])

    useEffect(() => {
        getAllCustomer()
        //eslint-disable-next-line
    }, [ regionId ])

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