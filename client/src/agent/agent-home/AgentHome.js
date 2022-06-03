import React from 'react'
import NavbarContainer from '../../components/navbar/NavbarContainer'
import ReactInputMask from 'react-input-mask'
import './agentHome.css'
import { BsThreeDotsVertical } from 'react-icons/bs'
import AddCustomerContainer from '../add-customer/AddCustomerContainer'

const AgentHome = (props) => {

    const { setH2, h2, isModalVisible, setIsModalVisible } = props

    const order = (
        <form>
            <div className='inp-lab'>
                <label>Mijoz</label>
                <input type='text' placeholder="Ism familiya / address / do'kon raqami" />
            </div>
            <div className='inp-lab'>
                <label>Viloyat</label>
                <input type='text' placeholder='Viloyat' />
            </div>
            <div className='inp-lab'>
                <label>Tuman</label>
                <input type='text' placeholder='Tuman' />
            </div>
            <div className='inp-lab'>
                <label>Adress</label>
                <input type='text' placeholder="Mahalla, ko'cha, uy raqami" />
            </div>
            <div className='inp-lab'>
                <label>Telefon</label>
                <ReactInputMask type="text"  mask="+\9\9\8999999999" placeholder='+998' />
            </div>
            <div className='inp-lab'>
                <label>Qo’shimcha telefon</label>
                <ReactInputMask type="text"  mask="+\9\9\8999999999" placeholder='+998' />
            </div>
            <div className='inp-lab'>
                <label>Mahsulot</label>
                <input type='text' placeholder='Mahsulotni tanlang' />
            </div>
            <div className='inp-lab'>
                <label>Soni</label>
                <input type='number' placeholder='Mahsulot sonini kiriting' />
            </div>
            <button className='add-btn'>Qo'shish</button>
            <div className='inp-lab'>
                <input type='number' />
            </div>
            <button className='order-btn'>Buyurtma berish</button>
        </form>
    )

    const client = (
        <div className='clients-wrap'>
            <div className='btn-wrap'>
                <button onClick={() => setIsModalVisible(true)}>Mijoz qo'shish +</button>
            </div>

            <div className='all-clients'>
                <div className='one'>
                    <div className='bg'></div>
                    <div>
                        <h1>Azizbek Abduxalilov</h1>
                        <p>Kuryer</p>
                    </div>
                    <BsThreeDotsVertical className='icon' />
                </div>
            </div>
        </div>
    )

    const isOrder = h2 === 'order' ? order : null
    const isClient = h2 === 'clients' ? client : null

    return (
        <div className='agent-home-component'>
            <NavbarContainer />
            <AddCustomerContainer isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
            <div className='top'>
                <div className={h2 === 'order' ? 'h2-wrap h2-wrap-act' : 'h2-wrap'} onClick={() => setH2('order')}>
                    <h2>Buyurtma berish</h2>
                </div>
                <div className={h2 === 'clients' ? 'h2-wrap h2-wrap-act' : 'h2-wrap'} onClick={() => setH2('clients')}>
                    <h2>Mijozlar</h2>
                </div>
            </div>
            
            {isOrder}
            {isClient}

        </div>
    )
}

export default AgentHome