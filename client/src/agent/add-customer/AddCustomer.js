import { Modal } from 'antd'
import React from 'react'
import ReactInputMask from 'react-input-mask'
import userPng from '../../img/user.png'
import './addCustomer.css'

const AddCustomer = (props) => {

    const { setIsModalVisible, isModalVisible, imageFileUrl, image, getUrl } = props

    return (
        <div>
            <Modal 
                title="Mijoz qo'shish" 
                visible={isModalVisible} 
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                className='add-modal add-customer'
            >
                <form>
                    <div className='bg' style={{backgroundImage: `url(${image ? imageFileUrl : userPng})`}}>
                        <input type='file' files={image} accept='.jpg, .jpeg, .png' onChange={getUrl} required />
                        <div className='add'>
                            <p>Rasm qo'shish</p>
                            <p>+</p>
                        </div>
                    </div>
                    <div>
                        <label>Ism familiya</label>
                        <input type='text' placeholder='Ism familiya' required />
                    </div>
                    <div>
                        <label>Viloyat</label>
                        <input type='text' placeholder='Viloyat' required />
                    </div>
                    <div>
                        <label>Tuman</label>
                        <input type='text' placeholder='Tuman' required />
                    </div>
                    <div>
                        <label>Address</label>
                        <input type='text' placeholder="Mahalla, ko'cha uy raqami" />
                    </div>
                    <div>
                        <label>Do'kon raqami</label>
                        <input type='number' placeholder='Raqam bilan kiriting' />
                    </div>
                    <div>
                        <label>Telefon raqam</label>
                        <ReactInputMask type="text"  mask="+\9\9\8999999999" placeholder='+998' required />
                    </div>
                    <div>
                        <label>Qo’shimcha telefon</label>
                        <ReactInputMask type="text"  mask="+\9\9\8999999999" placeholder='+998' />
                    </div>
                    <button type='submit'>Saqlash</button>
                </form>
            </Modal>
        </div>
    )
}

export default AddCustomer