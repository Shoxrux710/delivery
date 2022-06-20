import axios from 'axios'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import OneProduct from './OneProduct'

const OneProductContainer = (props) => {

    const token = JSON.parse(window.localStorage.getItem('user'))?.token

    const { item, deleteProduct, getAllProducts } = props

    const [ menu, setMenu ] = useState(false)
    const [ isModalVisible, setIsModalVisible ] = useState(false)

    const [ editName, setEditName ] = useState('')
    const [ editPrice, setEditPrice ] = useState('')
    const [ id, setId ] = useState('')

    const getProductById = (id) => {
        axios.get(`/api/product/${id}`).then(res => {
            setEditName(res.data.name)
            setEditPrice(res.data.price)
            setId(res.data._id)
        }).catch(err => {
            console.log(err)
        })
    }

    const editProduct = (e) => {
        e.preventDefault()
        axios.put(`/api/product/update/${id}`, { name: editName, price: editPrice }, {
            headers: {
                'authorization': `Bearer ${token}`
            }
        }).then(res => {
            toast.success("Muvaffaqqiyatli o'zgartirildi!", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
            setIsModalVisible(false)
            getAllProducts()
        }).catch(err => {
            console.log(err)
            toast.error("Error!", {
                position: toast.POSITION.BOTTOM_RIGHT
            })
        })
    }
    
    return (
        <OneProduct
            menu={menu}
            setMenu={setMenu}
            isModalVisible={isModalVisible} 
            setIsModalVisible={setIsModalVisible}
            item={item}
            deleteProduct={deleteProduct}
            getProductById={getProductById}
            editName={editName}
            setEditName={setEditName}
            editPrice={editPrice}
            setEditPrice={setEditPrice}
            editProduct={editProduct}
        />
    )
}

export default OneProductContainer