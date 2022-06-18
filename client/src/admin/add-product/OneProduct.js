import { Modal } from 'antd'
import React from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { MdDelete, MdEdit } from 'react-icons/md'

const OneProduct = (props) => {

    const { menu, setMenu, isModalVisible, setIsModalVisible } = props

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
                    <button>Taxrirlash</button>
                </div>
            </Modal>
            <div className='one' onClick={() => setMenu(false)}>
                <h3>Parasetamol</h3>
                <p>115 000 so'm</p>
                <div></div>
            </div>
            <BsThreeDotsVertical className='icon' onClick={() => setMenu(!menu)} />
            <div className={menu ? 'menu menu-act' : 'menu'}>
                <div onClick={() => {setIsModalVisible(true); setMenu(false)}}>
                    <MdEdit className='iconn' />
                    <p>Taxrirlash</p>
                </div>
                <div>
                    <MdDelete className='iconn' />
                    <p>O'chirish</p>
                </div>
            </div>
        </div>
    )
}

export default OneProduct