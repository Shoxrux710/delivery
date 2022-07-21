import axios from 'axios';
import Loader from '../../components/loader/Loader'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import AllAgents from './AllAgents';

const AllAgentsContainer = () => {

    const headers = { "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user"))?.token }

    const [ loading, setLoading ] = useState(true)
    const loader = loading ? <Loader /> : ''

    const [ isModalVisible, setIsModalVisible ] = useState(false)
    const [ fullname, setFullname ] = useState('')
    const [ login, setLogin ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ regionId, setRegionId ] = useState('')
    const [ phone, setPhone ] = useState('')

    const [ regions, setRegions ] = useState([])
    const getRegions = () => {
        axios.get('/api/region/all').then(res => {
            setRegions(res.data.region)
        }).catch(err => {
            console.log(err)
        })
    }

    const [ allAgents, setAllAgents ] = useState([])
    const getAllAgents = () => {
        axios.get('/api/user/each?position=agent', { headers }).then(res => {
            setAllAgents(res.data.userEach)
            setLoading(false)
        }).catch(err => {
            console.log(err)
            setLoading(false)
        })
    }

    const addAgent = (e) => {
        e.preventDefault()
        const agentData = {
            position: 'agent',
            fullname,
            login,
            password,
            regionId,
            phone
        }
        axios.post('/api/user/register', agentData, { headers }).then(res => {
            toast.success("Muvaffaqqiyatli qo'shildi!", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
            setIsModalVisible(false)
            getAllAgents()
            setFullname('')
            setLogin('')
            setPassword('')
            setRegionId('')
            setPhone('')
        }).catch(err => {
            toast.error(`${err.response.data.errorMessage}`, {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
    }

    useEffect(() => {
        getRegions()
        getAllAgents()
    }, [])

    return (
        <AllAgents 
            isModalVisible={isModalVisible} 
            setIsModalVisible={setIsModalVisible} 
            fullname={fullname}
            setFullname={setFullname}
            login={login}
            setLogin={setLogin}
            password={password}
            setPassword={setPassword}
            regionId={regionId}
            setRegionId={setRegionId}
            phone={phone}
            setPhone={setPhone}
            addAgent={addAgent}
            regions={regions}
            allAgents={allAgents}
            loader={loader}
        />
    )
}

export default AllAgentsContainer