import { Modal } from 'antd'
import React from 'react'
import { HiFilter } from 'react-icons/hi'
import { MdArrowBack } from 'react-icons/md'
import { Link } from 'react-router-dom'
import './addProduct.css'
import OneProductContainer from './OneProductContainer'

const AddProduct = (props) => {

    const { setIsModalVisible, isModalVisible } = props

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
                <div className='input-text'>
                    <p>Mahsulot nomi</p>
                    <input type='text' />
                </div>
                <div className='input-text'>
                    <p>Mahsulot puli</p>
                    <input type='number' />
                </div>
                <div className='buttons-wrap'>
                    <button>O'chirish</button>
                    <button>Qo'shish</button>
                </div>
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
                <OneProductContainer />
                <OneProductContainer />
                <OneProductContainer />
            </div>
        </div>
    )
}

export default AddProduct