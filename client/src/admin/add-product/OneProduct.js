import { Modal } from 'antd'
import React from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { MdDelete, MdEdit } from 'react-icons/md'

const OneProduct = (props) => {

    const { menu, setMenu, isModalVisible, setIsModalVisible, item, deleteProduct, 
        getProductById, editName, setEditName, editPrice, setEditPrice, editProduct 
    } = props

    return (
        <div className='one-wrap'>
            <Modal 
                title={null} 
                visible={isModalVisible} 
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                className='add-modal'
                centered
            >
                <form className='add-pruduct-form' onSubmit={editProduct}>
                    <div className='input-text'>
                        <p>Mahsulot nomi</p>
                        <input type='text' value={editName} onChange={(e) => setEditName(e.target.value)} required />
                    </div>
                    <div className='input-text'>
                        <p>Mahsulot puli</p>
                        <input type='number' value={editPrice} onChange={(e) => setEditPrice(e.target.value)} required />
                    </div>
                    <div className='buttons-wrap'>
                        <div className='p' onClick={() => setIsModalVisible(false)}> 
                            <p>Bekor qilish</p>
                        </div>
                        <button>Taxrirlash</button>
                    </div>
                </form>
            </Modal>
            <div className='one' onClick={() => setMenu(false)}>
                <h3>{item ? item.name : ''}</h3>
                <p>{item ? item.price : ''} so'm</p>
                <div></div>
            </div>
            <BsThreeDotsVertical className='icon' onClick={() => setMenu(!menu)} />
            <div className={menu ? 'menu menu-act' : 'menu'}>
                <div onClick={() => {setIsModalVisible(true); setMenu(false); getProductById(item ? item._id : '')}}>
                    <MdEdit className='iconn' />
                    <p>Taxrirlash</p>
                </div>
                <div onClick={() => {deleteProduct(item ? item._id : ''); setMenu(false)}}>
                    <MdDelete className='iconn' />
                    <p>O'chirish</p>
                </div>
            </div>
        </div>
    )
}

export default OneProduct