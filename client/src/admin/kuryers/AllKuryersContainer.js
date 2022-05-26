import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Loader from '../../components/loader/Loader';
import AllKuryers from './AllKuryers';

const AllKuryersContainer = () => {

    const token = JSON.parse(window.localStorage.getItem('user'))?.token

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

    const [ allKuryers, setAllKuryers ] = useState([])
    const getAllKuryers = () => {
        axios.get('/api/user/each?position=courier').then(res => {
            setAllKuryers(res.data.userEach)
            setLoading(false)
        }).catch(err => {
            console.log(err)
            setLoading(false)
        })
    }

    const addKuryer = (e) => {
        e.preventDefault()
        const kuryerData = {
            position: 'courier',
            fullname,
            login,
            password,
            regionId,
            phone
        }
        axios.post('/api/user/register', kuryerData, {
            headers: {
                'authorization': `Bearer ${token}`
            }
        }).then(res => {
            toast.success("Muvaffaqqiyatli qo'shildi!", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
            setIsModalVisible(false)
            getAllKuryers()
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
        getAllKuryers()
    }, [])

    return (
        <AllKuryers
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
            regions={regions} 
            addKuryer={addKuryer}
            allKuryers={allKuryers}
            loader={loader}
        />
    )
}

export default AllKuryersContainer