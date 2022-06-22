import React from 'react'
import NavbarContainer from '../../components/navbar/NavbarContainer'
import ReactInputMask from 'react-input-mask'
import './agentHome.css'
import AddCustomerContainer from '../add-customer/AddCustomerContainer'
import OneCustomerContainer from './OneCustomerContainer'

const AgentHome = (props) => {

    const { setH2, h2, isModalVisible, setIsModalVisible, allCustomer, getAllCustomer, 
        loader, allProducts, product, setProduct, count, setCount, addProductArray, allAddedProducts,
        deleteAddedProduct, fullname, setFullname, searchCustomer, allSearchs, getUserById, region, setRegion,
        fog, setFog, address, setAddress, shop, setShop, phone, setPhone, phoneTwo, setPhoneTwo
    } = props

    const order = (
        <form>
            <div className='inp-lab top-inp-lab'>
                <label>Ism familiya</label>
                <input type='text' placeholder="Ism familiya" value={fullname} onChange={(e) => {setFullname(e.target.value); searchCustomer()}} />

                <div className={allSearchs.length > 0 ? 'searched-users' : 'searched-users-false'}>
                    {
                        allSearchs && Array.isArray(allSearchs) ? allSearchs.map((item, index) => {
                            return (
                                <div key={index} onClick={() => getUserById(item._id)}>
                                    <p>{item.fullname} / {item.address} / {item.shopNumber}</p>
                                </div>
                            )
                        }) : ''
                    }
                </div>
            </div>

            <div className='inp-lab'>
                <label>Viloyat</label>
                <input type='text' placeholder='Viloyat' value={region} onChange={(e) => setRegion(e.target.value)} required />
            </div>
            <div className='inp-lab'>
                <label>Tuman</label>
                <input type='text' placeholder='Tuman' value={fog} onChange={(e) => setFog(e.target.value)} required />
            </div>
            <div className='inp-lab'>
                <label>Adress</label>
                <input type='text' placeholder="Mahalla, ko'cha, uy raqami" value={address} onChange={(e) => setAddress(e.target.value)} required />
            </div>
            <div className='inp-lab'>
                <label>Do'kon raqami</label>
                <input type='number' value={shop} onChange={(e) => setShop(e.target.value)} required />
            </div>
            <div className='inp-lab'>
                <label>Telefon</label>
                <ReactInputMask type="text"  mask="+\9\9\8999999999" placeholder='+998' value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>
            <div className='inp-lab'>
                <label>Qo’shimcha telefon</label>
                <ReactInputMask type="text"  mask="+\9\9\8999999999" placeholder='+998' value={phoneTwo} onChange={(e) => setPhoneTwo(e.target.value)} />
            </div>
            <div className='inp-lab'>
                <label>Mahsulot</label>
                <select value={product} onChange={(e) => setProduct(e.target.value)}>
                    <option hidden>Tanlanmagan</option>
                    {
                        allProducts && Array.isArray(allProducts) ? allProducts.map((item, index) => {
                            return (
                                <option key={index} value={`${item._id}/${item.name}`}>{item.name}</option>
                            )
                        }) : ''
                    }
                </select>
            </div>
            <div className='inp-lab'>
                <label>Soni</label>
                <input type='number' value={count} onChange={(e) => setCount(e.target.value)} placeholder='Mahsulot sonini kiriting' />
            </div>
            <div className='all-added-products'>
                {
                    allAddedProducts && Array.isArray(allAddedProducts) ? allAddedProducts.map((item, index) => {
                        return (
                            <div className='one' key={index} onClick={() => deleteAddedProduct(item.id)}>{item.name} {item.count}</div>
                        )
                    }) : ''
                }
            </div>
            <p className='add-btn' onClick={addProductArray}>Qo'shish</p>
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
                {loader}
                {
                    allCustomer && Array.isArray(allCustomer) ? allCustomer.map((item, index) => {
                        return (
                            <OneCustomerContainer key={index} item={item} getAllCustomer={getAllCustomer} />
                        )
                    }):''
                }
            </div>
        </div>
    )

    const isOrder = h2 === 'order' ? order : null
    const isClient = h2 === 'clients' ? client : null

    return (
        <div className='agent-home-component'>
            <NavbarContainer />
            <AddCustomerContainer isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} getAllCustomer={getAllCustomer} />
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