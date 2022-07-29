import AllAdmins from './AllAdmins'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Loader from '../../components/loader/Loader'

const AllAdminsContainer = () => {

    const headers = { "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user")).token }

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
        axios.get('/api/region/all', { headers }).then(res => {
            setRegions(res.data.region)
        }).catch(err => {
            console.log(err)
        })
    }

    const [ allAdmins, setAllAdmins ] = useState([])
    const getAllAdmins = () => {
        axios.get('/api/user/each?position=admin', { headers }).then(res => {
            setAllAdmins(res.data.userEach)
            setLoading(false)
        }).catch(err => {
            console.log(err)
            setLoading(false)
        })
    }

    const addAdmin = (e) => {
        e.preventDefault()

        const managerData = {
            position: 'admin',
            fullname,
            login,
            password,
            regionId,
            phone: phone
        }
        axios.post('/api/user/register', managerData, { headers }).then(res => {
            toast.success("Muvaffaqqiyatli qo'shildi!", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
            setIsModalVisible(false)
            getAllAdmins()
            setFullname('')
            setLogin('')
            setPassword('')
            setRegionId('')
            setPhone('')
        }).catch(err => {
            console.log(err)
            toast.error("Error!", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
    }

    useEffect(() => {
        getRegions()
        getAllAdmins()
    }, [])

    return (
        <AllAdmins 
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
            regionId={regionId}
            setRegionId={setRegionId}
            regions={regions}
            loader={loader}
            addAdmin={addAdmin}
            allAdmins={allAdmins}
        />
    )
}

export default AllAdminsContainer