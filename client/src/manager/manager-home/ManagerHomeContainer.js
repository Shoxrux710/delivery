import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ManagerHome from './ManagerHome'

const ManagerHomeContainer = () => {

    const userId = JSON.parse(window.localStorage.getItem('user'))?.id

    const [ userBody, setUserBody ] = useState(false)
    const [ orderType, setOrderType ] = useState('active')

    const [ agentsCount, setAgentsCount ] = useState('')
    const [ kuryersCount, setKuryersCount ] = useState('')
    
    const [ userData, setUserData ] = useState()
    const getUserData = () => {
        axios.get(`/api/user/userId/${userId}`, ).then(res => {
            setUserData(res.data.userId)

            axios.get(`/api/user/each?position=agent&regionId=${res.data.userId.regionId._id}`).then(res => {
                setAgentsCount(res.data.count)
            }).catch(err => {
                console.log(err)
            })

            axios.get(`/api/user/each?position=courier&regionId=${res.data.userId.regionId._id}`).then(res => {
                setKuryersCount(res.data.count)
            }).catch(err => {
                console.log(err)
            })


        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getUserData()
    }, [])

    return (
        <ManagerHome 
            userBody={userBody}
            setUserBody={setUserBody}
            setOrderType={setOrderType} 
            orderType={orderType}
            agentsCount={agentsCount}
            kuryersCount={kuryersCount}
            userData={userData}
        />
    )
}

export default ManagerHomeContainer