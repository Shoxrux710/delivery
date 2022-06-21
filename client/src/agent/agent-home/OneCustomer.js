import { Modal } from 'antd'
import React from 'react'
import ReactInputMask from 'react-input-mask'

const OneCustomer = (props) => {

    const { item, setIsModalVisible, isModalVisible, getCustomerById, shop, setShop,
        fullname, setFullname, region, fog, setFog, address, setAddress, phone,
        setPhone, phoneTwo, setPhoneTwo, editCustomer
    } = props

    return (
        <>
            <Modal 
                    title={null} 
                    visible={isModalVisible} 
                    onCancel={() => setIsModalVisible(false)}
                    footer={null}
                    className='add-modal'
                    centered
                    button={false}
                >
                    <form className='one-customer' onSubmit={editCustomer}>
                        <div className='qator'>
                            <div>
                                <h6>Do’kon</h6>
                                <input type='number' value={shop} onChange={(e) => setShop(e.target.value)} required />
                            </div>
                            <div>
                                <h6>Ism familiya</h6>
                                <input type='text' value={fullname} onChange={(e) => setFullname(e.target.value)} required />
                            </div>
                        </div>
                        <div className='qator'>
                            <div>
                                <h6>Viloyat</h6>
                                <input type='text' placeholder={region} readOnly />
                            </div>
                            <div>
                                <h6>Tuman</h6>
                                <input type='text' value={fog} onChange={(e) => setFog(e.target.value)} required />
                            </div>
                        </div>
                        <div className='qator'>
                            <div>
                                <h6>Adress</h6>
                                <input type='text' value={address} onChange={(e) => setAddress(e.target.value)} required />
                            </div>
                        </div>
                        <div className='qator'>
                            <div>
                                <h6>Telefon raqam</h6>
                                <ReactInputMask type="text" mask="+\9\9\8999999999" placeholder='+998' value={phone} onChange={(e) => setPhone(e.target.value)} required />
                            </div>
                            <div>
                                <h6>Qo’shimcha telefon</h6>
                                <ReactInputMask type="text" mask="+\9\9\8999999999" placeholder='+998' value={phoneTwo} onChange={(e) => setPhoneTwo(e.target.value)} />
                            </div>
                        </div>
                        <div className='buttons-wrap'>
                            <div className='btn' onClick={() => setIsModalVisible(false)}>
                                <p>Bekor qilish</p>
                            </div>
                            <button type='submit'>O'zgartirish</button>
                        </div>
                    </form>
            </Modal>
            <div className='one' onClick={() => getCustomerById(item._id)}>
                <div className='bg' style={{backgroundImage: `url(/customer/${item.customerImage ? item.customerImage.fileName : ''})`}}></div>
                <div>
                    <h1>{item.fullname}</h1>
                    <p>Mijoz</p>
                </div>
            </div>
        </>
    )
}

export default OneCustomer