import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Loader from '../../components/loader/Loader'
import AddProduct from './AddProduct'

const AddProductContainer = () => {
    
    const token = JSON.parse(window.localStorage.getItem('user'))?.token

    const [ loading, setLoading ] = useState(true)
    const loader = loading ? <Loader /> : ''

    const [ isModalVisible, setIsModalVisible ] = useState(false)
    const [ name, setName ] = useState('')
    const [ price, setPrice ] = useState('')

    const [ allProducts, setAllProducts ] = useState([])
    const getAllProducts = () => {
        axios.get('api/product').then(res => {
            setAllProducts(res.data.product)
            setLoading(false)
        }).catch(err => {
            console.log(err)
            setLoading(false)
        })
    }

    const addProduct = (e) => {
        e.preventDefault()

        axios.post('/api/product/all', { name, price } , {
            headers: {
                'authorization': `Bearer ${token}`
            }
        }).then(res => {
            toast.success("Muvaffaqqiyatli qo'shildi!", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
            setIsModalVisible(false)
            getAllProducts()
            setName('')
            setPrice('')
        }).catch(err => {
            console.log(err)
            toast.error("Error!", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
    }

    const cancel = () => {
        setName('')
        setPrice('')
        setIsModalVisible(false)
    }

    const deleteProduct = (id) => {
        axios.delete(`/api/product/delete/${id}`, {
            headers: {
                'authorization': `Bearer ${token}`
            }
        }).then(res => {
            toast.success("Muvaffaqqiyatli o'chirildi!", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
            getAllProducts()
        }).catch(err => {
            console.log(err)
            toast.error("Error!", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
    }

    useEffect(() => {
        getAllProducts()
        //eslint-disable-next-line
    }, [])

    return (
        <AddProduct 
            isModalVisible={isModalVisible} 
            setIsModalVisible={setIsModalVisible}
            name={name}
            setName={setName}
            price={price}
            setPrice={setPrice}
            addProduct={addProduct}
            cancel={cancel}
            allProducts={allProducts}
            loader={loader}
            deleteProduct={deleteProduct}
            getAllProducts={getAllProducts}
        />
    )
}

export default AddProductContainer