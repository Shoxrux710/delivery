import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Loader from '../../components/loader/Loader'
import AllKuryersInManager from './AllKuryersInManager'

const AllKuryersInManagerContainer = () => {

    const token = JSON.parse(window.localStorage.getItem('user'))?.token
    const userId = JSON.parse(window.localStorage.getItem('user'))?.id

    const [ userData, setUserData ] = useState()
    const [ allKuryers, setAllKuryers ] = useState([])

    const getUserData = () => {
        const headers = { "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user")).token }
        axios
            .get(`/api/user/userId/${userId}`, { headers })
            .then(res => {
                setUserData(res.data.userId.regionId)

                axios
                    .get(`/api/user/each?position=courier`, { headers } )
                    .then(res => {
                        setAllKuryers(res.data.userEach)
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

    const addKuryer = (e) => {
        e.preventDefault()
        const kuryerData = {
            position: 'courier',
            fullname,
            login,
            password,
            phone,
            regionId: userData ? userData._id : ''
        }
        axios.post('/api/user/manager', kuryerData, {
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
        //eslint-disable-next-line
    }, [])

    return (
        <AllKuryersInManager
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
            addKuryer={addKuryer}
            allKuryers={allKuryers}
            loader={loader}
            userData={userData}
        />
    )
}

export default AllKuryersInManagerContainer