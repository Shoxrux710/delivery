import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import AddCustomer from './AddCustomer'

const AddCustomerContainer = (props) => {

    const token = JSON.parse(window.localStorage.getItem('user'))?.token

    const { setIsModalVisible, isModalVisible } = props
    const [ image, setImage ] = useState(null)
    const [ imageFileUrl, setImageFileUrl ] = useState()

    const getUrl = (e) => {
        const files = Array.from(e.target.files);
        setImageFileUrl(URL.createObjectURL(files[0]));
        setImage(e.target.files);
    }

    const [ fullname, setFullname ] = useState('')
    const [ region, setRegion ] = useState('')
    const [ fog, setFog ] = useState('')
    const [ address, setAddress ] = useState('')
    const [ shopNumber, setShopNumber ] = useState('')
    const [ phone, setPhone ] = useState('')
    const [ phoneTwo, setPhoneTwo ] = useState('')

    const addCustomerr = (e) => {

        e.preventDefault()

        const formData =  new FormData()
        formData.append('customerImage', image[0])
        formData.append('fullname', fullname)
        formData.append('region', region)
        formData.append('fog', fog)
        formData.append('address', address)
        formData.append('shopNumber', shopNumber)
        formData.append('phone', phone)
        formData.append('phoneTwo', phoneTwo)
        
        axios.post('/api/customer/all', formData, {
            headers: {
                'authorization': `Bearer ${token}`
            }
        })
        .then(res => {
            toast.success("Muvaffaqqiyatli qo'shildi!", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
            setIsModalVisible(false)
            setFullname('')
            setRegion('')
            setFog('')
            setAddress('')
            setShopNumber('')
            setPhone('')
            setPhoneTwo('')
        }).catch(err => {
            toast.error("Error!", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
    } 

    return (
        <AddCustomer 
            isModalVisible={isModalVisible} 
            setIsModalVisible={setIsModalVisible} 
            image={image}
            imageFileUrl={imageFileUrl}
            getUrl={getUrl}
            fullname={fullname}
            setFullname={setFullname}
            region={region}
            setRegion={setRegion}
            fog={fog}
            setFog={setFog}
            address={address}
            setAddress={setAddress}
            shopNumber={shopNumber}
            setShopNumber={setShopNumber}
            phone={phone}
            setPhone={setPhone}
            phoneTwo={phoneTwo}
            setPhoneTwo={setPhoneTwo}
            addCustomerr={addCustomerr}
        />
    )
}

export default AddCustomerContainer