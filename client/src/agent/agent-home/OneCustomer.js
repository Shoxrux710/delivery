import { Modal } from 'antd'
import React from 'react'
import ReactInputMask from 'react-input-mask'

const OneCustomer = (props) => {

    const { item, setIsModalVisible, isModalVisible, getCustomerById } = props

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
                    <form className='one-customer   '>
                        <div className='qator'>
                            <div>
                                <h6>Do’kon</h6>
                                <input type='text' />
                            </div>
                            <div>
                                <h6>Ism familiya</h6>
                                <input type='text' />
                            </div>
                        </div>
                        <div className='qator'>
                            <div>
                                <h6>Viloyat</h6>
                                <input type='text' />
                            </div>
                            <div>
                                <h6>Tuman</h6>
                                <input type='text' />
                            </div>
                        </div>
                        <div className='qator'>
                            <div>
                                <h6>Adress</h6>
                                <input type='text' />
                            </div>
                        </div>
                        <div className='qator'>
                            <div>
                                <h6>Telefon raqam</h6>
                                <ReactInputMask type="text" mask="+\9\9\8999999999" placeholder='+998' required />
                            </div>
                            <div>
                                <h6>Qo’shimcha telefon</h6>
                                <ReactInputMask type="text" mask="+\9\9\8999999999" placeholder='+998' />
                            </div>
                        </div>
                        <div className='buttons-wrap'>
                            <button>O'chirish</button>
                            <button>O'chirish</button>
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