import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AdminHome from './AdminHome'

const AdminHomeContainer = () => {

    const userId = JSON.parse(window.localStorage.getItem('user'))?.id
    const userRole = JSON.parse(window.localStorage.getItem('user'))?.position

    const [ userBody, setUserBody ] = useState(false)
    const [ orderType, setOrderType ] = useState('active')

    const [ adminsCount, setAdminsCount ] = useState('')
    const getAdminsCount = () => {
        axios.get('/api/user/each?position=admin').then(res => {
            setAdminsCount(res.data.count)
        }).catch(err => {
            console.log(err)
        })
    }

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

    const [ userData, setUserData ] = useState()
    const getUserData = () => {
        axios.get(`/api/user/userId/${userId}`, ).then(res => {
            setUserData(res.data.userId)
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getAgentsCount()
        getKuryersCount()
        getManagersCount()
        getUserData()
        getAdminsCount()
        //eslint-disable-next-line
    }, [])

    return (
        <AdminHome 
            userBody={userBody} 
            setUserBody={setUserBody} 
            setOrderType={setOrderType} 
            orderType={orderType} 
            agentsCount={agentsCount} 
            kuryersCount={kuryersCount} 
            adminsCount={adminsCount}
            managersCount={managersCount} 
            userData={userData}
            userRole={userRole}
        />
    )
}

export default AdminHomeContainer