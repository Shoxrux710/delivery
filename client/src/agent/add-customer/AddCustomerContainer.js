import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import AddCustomer from './AddCustomer'

const AddCustomerContainer = (props) => {

    const token = JSON.parse(window.localStorage.getItem('user'))?.token
    const userId = JSON.parse(window.localStorage.getItem('user'))?.id

    const [ regionId, setRegionId ] = useState('')
    const [ regionName, setRegionName ] = useState('')
    const getUserData = () => {
        axios.get(`/api/user/userId/${userId}`).then(res => {
            setRegionId(res.data.userId.regionId._id)
            setRegionName(res.data.userId.regionId.name)
        }).catch(err => {
            console.log(err)
        })
    }

    const { setIsModalVisible, isModalVisible, getAllCustomer } = props
    const [ image, setImage ] = useState(null)
    const [ imageFileUrl, setImageFileUrl ] = useState()

    const getUrl = (e) => {
        const files = Array.from(e.target.files);
        setImageFileUrl(URL.createObjectURL(files[0]));
        setImage(e.target.files);
    }

    const [ fullname, setFullname ] = useState('')
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
        formData.append('regionId', regionId)
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
            getAllCustomer()
            setImage(null)
            setImageFileUrl()
            setFullname('')
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

    useEffect(() => {
        getUserData()
        //eslint-disable-next-line
    }, [])

    return (
        <AddCustomer 
            isModalVisible={isModalVisible} 
            setIsModalVisible={setIsModalVisible} 
            image={image}
            imageFileUrl={imageFileUrl}
            getUrl={getUrl}
            fullname={fullname}
            setFullname={setFullname}
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
            regionName={regionName}
        />
    )
}

export default AddCustomerContainer