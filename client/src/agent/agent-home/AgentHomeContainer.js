import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Loader from '../../components/loader/Loader'
import AgentHome from './AgentHome'

const AgentHomeContainer = () => {

    const token = JSON.parse(window.localStorage.getItem('user'))?.token
    const userId = JSON.parse(window.localStorage.getItem('user'))?.id

    const [ regionId, setRegionId ] = useState('')
    const getUserData = () => {
        axios.get(`/api/user/userId/${userId}`).then(res => {
            setRegionId(res.data.userId.regionId._id)
        }).catch(err => {
            console.log(err)
        })
    }

    const [ loading, setLoading ] = useState(true)
    const loader = loading ? <Loader /> : ''

    const [ h2, setH2 ] = useState('order')
    const [ isModalVisible, setIsModalVisible ] = useState(false)

    const [ allCustomer, setAllCustomer ] = useState([])
    const getAllCustomer = () => {
        if( regionId ) {
            axios.get(`/api/customer?regionId=${regionId}`).then(res => {
                setAllCustomer(res.data.customer)
                setLoading(false)
            }).catch(err => {
                console.log(err)
                setLoading(false)
            })
        }
    }

    const [ allProducts, setAllProducts ] = useState([])
    const getAllProducts = () => {
        axios.get('/api/product').then(res => {
            setAllProducts(res.data.product)
        }).catch(err => {
            console.log(err)
        })
    }

    const [ product, setProduct ] = useState('')
    const [ count, setCount ] = useState('')

    const [ allAddedProducts, setAllAddedProducts ] = useState([])
    const addProductArray = () => {
        if( product.length > 0 && count > 0 ) {
            const [ productId, name, price ] = product.split('/')
            const data = allAddedProducts.filter(item => item.productId !== productId)
            setAllAddedProducts([...data, { productId, name, count, price }])
            setProduct('')
            setCount('')
        }
    }

    const deleteAddedProduct = (id) => {
        const data = allAddedProducts.filter(item => item.productId !== id)
        setAllAddedProducts(data)
    }

    const [ allSearchs, setAllSearchs ] = useState([])
    const [ fullname, setFullname ] = useState('')
    const searchCustomer = () => {
        axios.get(`/api/customer/filter?regionId=${regionId}&filter=${fullname}`).then(res => {
            setAllSearchs(res.data.customersFilter)
        }).catch(err => {
            console.log(err)
        })
    }

    const [ region, setRegion ] = useState('')
    const [ fog, setFog ] = useState('')
    const [ address, setAddress ] = useState('')
    const [ shop, setShop ] = useState('')
    const [ phone, setPhone ] = useState('')
    const [ phoneTwo, setPhoneTwo ] = useState('')
    const [ customerId, setCustomerId ] = useState('')
    const getUserById = (id) => {
        axios.get(`/api/customer/${id}`).then(res => {
            setFullname(res.data.customerId.fullname)
            setRegion(res.data.customerId.regionId.name)
            setFog(res.data.customerId.fog)
            setAddress(res.data.customerId.address)
            setShop(res.data.customerId.shopNumber)
            setPhone(res.data.customerId.phone)
            setPhoneTwo(res.data.customerId.phoneTwo)
            setCustomerId(res.data.customerId._id)
            setAllSearchs([])
        }).catch(err => {
            console.log(err)
        })
    }

    const submitHandler = (e) => {
        e.preventDefault()

        axios.post('/api/order/add', { customerId, products: allAddedProducts }, {
            headers: {
                'authorization': `Bearer ${token}`
            }
        }).then(res => {
            toast.success("Muvaffaqqiyatli qo'shildi!", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        }).catch(err => {
            toast.error("Error!", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
    }

    useEffect(() => {
        getAllCustomer()
        getUserData()
        getAllProducts()
        //eslint-disable-next-line
    }, [])

    useEffect(() => {
        getAllCustomer()
        //eslint-disable-next-line
    }, [ regionId ])

    return (
        <AgentHome 
            h2={h2} 
            setH2={setH2} 
            isModalVisible={isModalVisible} 
            setIsModalVisible={setIsModalVisible} 
            allCustomer={allCustomer}
            getAllCustomer={getAllCustomer}
            loader={loader}
            allProducts={allProducts}
            product={product}
            setProduct={setProduct}
            count={count}
            setCount={setCount}
            allAddedProducts={allAddedProducts}
            addProductArray={addProductArray}
            deleteAddedProduct={deleteAddedProduct}
            setFullname={setFullname}
            fullname={fullname}
            searchCustomer={searchCustomer}
            allSearchs={allSearchs}
            getUserById={getUserById}
            region={region}
            setRegion={setRegion}
            fog={fog}
            setFog={setFog}
            address={address}
            setAddress={setAddress}
            shop={shop}
            setShop={setShop}
            phone={phone}
            setPhone={setPhone}
            phoneTwo={phoneTwo}
            setPhoneTwo={setPhoneTwo}
            submitHandler={submitHandler}
        />
    )
}

export default AgentHomeContainer