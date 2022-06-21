import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import OneCustomer from './OneCustomer'

const OneCustomerContainer = (props) => {

    const token = JSON.parse(window.localStorage.getItem('user'))?.token
    const { item, getAllCustomer } = props
    const [ isModalVisible, setIsModalVisible ] = useState(false)

    const [ id, setId ] = useState('')
    const [ shop, setShop ] = useState('')
    const [ fullname, setFullname ] = useState('')
    const [ region, setRegion ] = useState('')
    const [ regionId, setRegionId ] = useState('')
    const [ fog, setFog ] = useState('')
    const [ address, setAddress ] = useState('')
    const [ phone, setPhone ] = useState('')
    const [ phoneTwo, setPhoneTwo ] = useState('')

    const getCustomerById = (id) => {
        setIsModalVisible(true)
        axios.get(`/api/customer/${id}`, {
            headers: {
                'authorization': `Bearer ${token}`
            }
        }).then(res => {
            setId(res.data.customerId._id)
            setShop(res.data.customerId.shopNumber)
            setFullname(res.data.customerId.fullname)
            setRegion(res.data.customerId.regionId.name)
            setRegionId(res.data.customerId.regionId._id)
            setFog(res.data.customerId.fog)
            setAddress(res.data.customerId.address)
            setPhone(res.data.customerId.phone)
            setPhoneTwo(res.data.customerId.phoneTwo)
        }).catch(err => {
            console.log(err)
        })
    }

    const editCustomer = (e) => {
        e.preventDefault()

        const formData = {
            fullname,
            regionId,
            fog,
            address,
            shopNumber: shop,
            phone,
            phoneTwo
        }

        axios.put(`/api/customer/update/${id}`, formData, {
            headers: {
                'authorization': `Bearer ${token}`
            }
        }).then(res => {
            toast.success("Muvaffaqqiyatli o'zgartirildi!", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
            setIsModalVisible(false)
            getAllCustomer()
        }).catch(err => {
            toast.error("Error!", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
    }

    return (
        <OneCustomer 
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
            item={item}
            getCustomerById={getCustomerById}
            shop={shop}
            setShop={setShop}
            fullname={fullname}
            setFullname={setFullname}
            region={region}
            fog={fog}
            setFog={setFog}
            address={address}
            setAddress={setAddress}
            phone={phone}
            setPhone={setPhone}
            phoneTwo={phoneTwo}
            setPhoneTwo={setPhoneTwo}
            editCustomer={editCustomer}
        />
    )
}

export default OneCustomerContainer