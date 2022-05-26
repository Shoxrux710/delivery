import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Loader from '../../components/loader/Loader'
import AllManagers from './AllManagers'

const AllManagersContainer = () => {

    const token = JSON.parse(window.localStorage.getItem('user'))?.token

    const [ loading, setLoading ] = useState(true)
    const loader = loading ? <Loader /> : ''

    const [ isModalVisible, setIsModalVisible ] = useState(false)
    const [ fullname, setFullname ] = useState('')
    const [ login, setLogin ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ regionId, setRegionId ] = useState('')
    const [ phone, setPhone ] = useState('')
    const [ radio, setRadio ] = useState('agent')

    const [ regions, setRegions ] = useState([])
    const getRegions = () => {
        axios.get('/api/region/all').then(res => {
            setRegions(res.data.region)
        }).catch(err => {
            console.log(err)
        })
    }

    const [ employeers, setEmployeers ] = useState([])
    const getEmployee = () => {
        if( regionId ) {
            axios.get(`/api/user/employee?userId=${regionId}&attach=${radio}`).then(res => {
                setEmployeers(res.data.employee)
            }).catch(err => {
                console.log(err)
            })
        }
    }

    const [ allEmployeers, setAllEmployeers ] = useState([])
    const [ allEmployeersId, setAllEmployeersId ] = useState([])
    const attachEmployee = (id) => {
        const arr = id.split('/')
        setAllEmployeers(prev => [...prev, arr])
        setAllEmployeersId(prev => [...prev, arr[0]])
    }
    const deleleteAttach = (item) => {
        setAllEmployeersId(allEmployeersId.filter(it => it !== item))
        allEmployeers.forEach((f, num) => {
            const el = f.includes(item, 0)
            if( el ) {
                allEmployeers.splice(num, 1)
            }
        })
    }

    const addManager = (e) => {
        e.preventDefault()

        const managerData = {
            position: 'manager',
            fullname,
            login,
            password,
            regionId,
            worker: allEmployeersId,
            phone: phone
        }
        axios.post('/api/user/register', managerData, {
            headers: {
                'authorization': `Bearer ${token}`
            }
        }).then(res => {
            toast.success("Muvaffaqqiyatli qo'shildi!", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
            setIsModalVisible(false)
            setFullname('')
            setLogin('')
            setPassword('')
            setRegionId('')
            setPhone('')
            setAllEmployeers([])
            setAllEmployeersId([])
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getRegions()
    }, [])

    useEffect(() => {
        getEmployee()
    }, [ radio, regionId ])

    return (
        <AllManagers 
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
            radio={radio}
            setRadio={setRadio}
            regions={regions}
            loader={loader}
            employeers={employeers}
            attachEmployee={attachEmployee}
            allEmployeers={allEmployeers}
            deleleteAttach={deleleteAttach}
            addManager={addManager}
        />
    )
}

export default AllManagersContainer