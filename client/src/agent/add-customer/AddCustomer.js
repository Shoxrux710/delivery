import { Modal } from 'antd'
import React from 'react'
import ReactInputMask from 'react-input-mask'
import userPng from '../../img/user.png'
import './addCustomer.css'

const AddCustomer = (props) => {

    const { setIsModalVisible, isModalVisible, imageFileUrl, image, getUrl, 
        fullname, setFullname, fog, setFog, address, setAddress,
        shopNumber, setShopNumber, phone, setPhone, phoneTwo, setPhoneTwo, addCustomerr,
        regionName 
    } = props

    return (
        <Modal 
            title="Mijoz qo'shish" 
            visible={isModalVisible} 
            onCancel={() => setIsModalVisible(false)}
            footer={null}
            className='add-modal add-customer'
            button={false}
        >
            <form onSubmit={addCustomerr}>
                <div className='bg' style={{backgroundImage: `url(${image ? imageFileUrl : userPng})`}}>
                    <input type='file' files={image} accept='.jpg, .jpeg, .png' onChange={getUrl} required />
                    <div className='add'>
                        <p>Rasm qo'shish</p>
                        <p>+</p>
                    </div>
                </div>
                <div>
                    <label>Ism familiya</label>
                    <input type='text' placeholder='Ism familiya' value={fullname} onChange={(e) => setFullname(e.target.value)} required />
                </div>
                <div>
                    <label>Viloyat</label>
                    <input type='text' placeholder={regionName} readOnly />
                </div>
                <div>
                    <label>Tuman</label>
                    <input type='text' placeholder='Tuman' value={fog} onChange={(e) => setFog(e.target.value)} required />
                </div>
                <div>
                    <label>Address</label>
                    <input type='text' placeholder="Mahalla, ko'cha uy raqami" value={address} onChange={(e) => setAddress(e.target.value)} required />
                </div>
                <div>
                    <label>Do'kon raqami</label>
                    <input type='number' placeholder='Raqam bilan kiriting' value={shopNumber} onChange={(e) => setShopNumber(e.target.value)} required />
                </div>
                <div>
                    <label>Telefon raqam</label>
                    <ReactInputMask type="text"  mask="+\9\9\8999999999" placeholder='+998' value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>
                <div>
                    <label>Qo’shimcha telefon</label>
                    <ReactInputMask type="text"  mask="+\9\9\8999999999" placeholder='+998' value={phoneTwo} onChange={(e) => setPhoneTwo(e.target.value)} />
                </div>
                <button type='submit'>Saqlash</button>
            </form>
        </Modal>
    )
}

export default AddCustomer