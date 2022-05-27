import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AdminHome from './AdminHome'

const AdminHomeContainer = () => {

    const [ userBody, setUserBody ] = useState(false)
    const [ orderType, setOrderType ] = useState('active')

    const [ managersCount, setManagersCount ] = useState('')
    const getManagersCount = () => {
        axios.get('/api/user/each?position=manager').then(res => {
            setManagersCount(res.data.count)
        }).catch(err => {
            console.log(err)
        })
    }

    const [ agentsCount, setAgentsCount ] = useState('')
    const getAgentsCount = () => {
        axios.get('/api/user/each?position=agent').then(res => {
            setAgentsCount(res.data.count)
        }).catch(err => {
            console.log(err)
        })
    }

    const [ kuryersCount, setKuryersCount ] = useState('')
    const getKuryersCount = () => {
        axios.get('/api/user/each?position=courier').then(res => {
            setKuryersCount(res.data.count)
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getAgentsCount()
        getKuryersCount()
        getManagersCount()
    })

    return (
        <AdminHome 
            userBody={userBody} 
            setUserBody={setUserBody} 
            setOrderType={setOrderType} 
            orderType={orderType} 
            agentsCount={agentsCount} 
            kuryersCount={kuryersCount} 
            managersCount={managersCount} 
        />
    )
}

export default AdminHomeContainer