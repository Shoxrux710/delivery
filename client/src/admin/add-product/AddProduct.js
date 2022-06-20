import { Modal } from 'antd'
import React from 'react'
import { HiFilter } from 'react-icons/hi'
import { MdArrowBack } from 'react-icons/md'
import { Link } from 'react-router-dom'
import './addProduct.css'
import OneProductContainer from './OneProductContainer'

const AddProduct = (props) => {

    const { setIsModalVisible, isModalVisible, name, setName, price, setPrice, 
        addProduct, cancel, allProducts, loader, deleteProduct, getAllProducts
    } = props

    return (
        <div className='add-product-component'>

            <Modal 
                title={null} 
                visible={isModalVisible} 
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                className='add-modal'
                centered
            >
                <form onSubmit={addProduct} className='add-pruduct-form'>
                    <div className='input-text'>
                        <p>Mahsulot nomi</p>
                        <input type='text' value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className='input-text'>
                        <p>Mahsulot puli</p>
                        <input type='number' value={price} onChange={(e) => setPrice(e.target.value)} required />
                    </div>
                    <div className='buttons-wrap'>
                        <div className='p'>
                            <p onClick={cancel}>O'chirish</p>
                        </div>
                        <button type='submit'>Qo'shish</button>
                    </div>
                </form>
            </Modal>

             <div className='top'>
                <div>
                    <Link to='/'>
                        <MdArrowBack className='icon' />
                    </Link>
                    <h2>Mahsulotlar</h2>
                </div>
                <div>
                    <HiFilter className='icon' />
                </div>
            </div>
            <div className='btn-wrap'>
                <button className='add-btn' onClick={() => setIsModalVisible(true)}>Mahsulot qo’shish +</button>
            </div>

            <div className='wrapper'>
            {loader}
                {
                    allProducts && Array.isArray(allProducts) ? allProducts.map(( item, index ) => {
                        return (
                            <OneProductContainer 
                                key={index} 
                                item={item} 
                                deleteProduct={deleteProduct} 
                                getAllProducts={getAllProducts}
                            />
                        )
                    }) : ''
                }
            </div>
        </div>
    )
}

export default AddProduct