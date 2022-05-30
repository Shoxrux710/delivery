import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Loader from '../../components/loader/Loader'
import AllAgentsInManager from './AllAgentsInManager'

const AllAgentsInManegerContainer = () => {

    const token = JSON.parse(window.localStorage.getItem('user'))?.token
    const userId = JSON.parse(window.localStorage.getItem('user'))?.id

    const [ userData, setUserData ] = useState()
    const [ allAgents, setAllAgents ] = useState([])

    const getUserData = () => {
        axios.get(`/api/user/userId/${userId}`, ).then(res => {
            setUserData(res.data.userId.regionId)

            axios.get(`/api/user/each?position=agent&regionId=${res.data.userId.regionId._id}`).then(res => {
                setAllAgents(res.data.userEach)
                setLoading(false)
            }).catch(err => {
                console.log(err)
                setLoading(false)
            })

        }).catch(err => {
            console.log(err)
        })
    }

    const [ loading, setLoading ] = useState(true)
    const loader = loading ? <Loader /> : ''

    const [ isModalVisible, setIsModalVisible ] = useState(false)
    const [ fullname, setFullname ] = useState('')
    const [ login, setLogin ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ phone, setPhone ] = useState('')

    const addAgent = (e) => {
        e.preventDefault()
        const agentData = {
            position: 'agent',
            fullname,
            login,
            password,
            phone,
            regionId: userData ? userData._id : ''
        }
        axios.post('/api/user/register', agentData, {
            headers: {
                'authorization': `Bearer ${token}`
            }
        }).then(res => {
            toast.success("Muvaffaqqiyatli qo'shildi!", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
            setIsModalVisible(false)
            getUserData()
            setFullname('')
            setLogin('')
            setPassword('')
            setPhone('')
        }).catch(err => {
            toast.error(`${err.response.data.errorMessage}`, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
    }

    useEffect(() => {
        getUserData()
    }, [])

    return (
        <AllAgentsInManager
            isModalVisible={isModalVisible} 
            setIsModalVisible={setIsModalVisible} 
            fullname={fullname}
            setFullname={setFullname}
            login={login}
            setLogin={setLogin}
            password={password}
            setPassword={setPassword}
            phone={phone}
            setPhone={setPhone}
            addAgent={addAgent}
            allAgents={allAgents}
            loader={loader}
            userData={userData}
        />
    )
}

export default AllAgentsInManegerContainer