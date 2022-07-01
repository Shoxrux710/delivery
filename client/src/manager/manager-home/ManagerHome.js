import React from 'react'
import { HiFilter } from 'react-icons/hi'
import { IoIosArrowUp } from 'react-icons/io'
import { Link } from 'react-router-dom'
import userPng from '../../img/user.png'
import './managerHome.css'
import NavbarContainer from '../../components/navbar/NavbarContainer'
import { Modal } from 'antd'
import OneManagerCard from './OneManagerCard'

const ManagerHome = (props) => {

    const { setUserBody, userBody, setOrderType, orderType, kuryersCount, agentsCount, userData, isModalVisible, 
        setIsModalVisible, allOrders, loader, activePrice,
        activeCount, courierCount, courierPrice, completedCount, completedPrice, rejectedCount, rejectedPrice,
        curOrder, getCurOrder, couriers, setSelectedCourier, giveOrderToCourier 
    } = props

    return (
        <div className='manager-home-component'>
            <NavbarContainer />
            <div className='user-wrapper'>
                <div className='user-top' style={{borderBottom: userBody ? 'none' : '1px solid #f3f3f3'}}>
                    <div className='left'>
                        <div className='bg' style={{backgroundImage: `url(${userPng})`}}></div>
                        <div>
                            <h2>{userData ? userData.fullname : ''}</h2>
                            <p>{userData ? userData.position : ''}</p>
                        </div>
                    </div>
                    <IoIosArrowUp 
                        className='icon' 
                        onClick={() => setUserBody(!userBody)} 
                        style={{transform: userBody ? 'rotate(180deg)' : 'rotate(0deg)'}}
                    />
                </div>
                <div className={userBody ? 'user-body user-body-active' : 'user-body'}>
                    <div className='qator'>
                        <div>
                            <h4>Kasbi</h4>
                            <h5>{userData ? userData.position : ''}</h5>
                        </div>
                        <div>
                            <h4>Ism familiya</h4>
                            <h5>{userData ? userData.fullname : ''}</h5>
                        </div>
                    </div>
                    <div className='qator'>
                        <div>
                            <h4>Login</h4>
                            <h5>{userData ? userData.login : ''}</h5>
                        </div>
                        <div>
                            <h4>Parol</h4>
                            <h5>********</h5>
                        </div>
                    </div>
                    <div className='qator'>
                        <div>
                            <h4>Telefon raqam</h4>
                            <h5>{userData ? userData.phone : ''}</h5>
                        </div>
                        <div>
                            <h4>Manzil</h4>
                            <h5>{userData && userData.regionId ? userData.regionId.name : ''}</h5>
                        </div>
                    </div>
                </div>
            </div>

            <div className='wrapper'>
                <div className='debt'>
                    <Link to='/debt'>
                        <div className='div1'>
                            <h5>Qarz: <span>21 485 230 so’m</span></h5>
                        </div>
                    </Link>
                    <div className='div2'>
                        <HiFilter className='icon' />
                    </div>
                </div>

                <Link to='/all-agents'>
                    <div className='users-info'>
                        <h5>Agentlar:</h5>
                        <h5>{agentsCount}</h5>
                    </div>
                </Link>
                <Link to='/all-couriers'>
                    <div className='users-info lst'>
                        <h5>Kuryerlar:</h5>
                        <h5>{kuryersCount}</h5>
                    </div>
                </Link>
            </div>

            <div className='all-orders-top'>
                <div className={orderType === 'active' ? 'square square-active' : 'square'} onClick={() => setOrderType('active')}>
                    <div className='topp'></div>
                    <div className='type'>
                        <div className='bg'>
                            <div className='bir'></div>
                        </div>
                        <h1>Faol buyurtmalar</h1>
                    </div>
                    <div className='about'>
                        <div className='left'>
                            <h6>Soni</h6>
                            <h5>{activeCount} ta</h5>
                        </div>
                        <div className='right'>
                            <h6>Puli</h6>
                            <h5>{activePrice} so'm</h5>
                        </div>
                    </div>
                </div>

                <div className={orderType === 'courier' ? 'square square-active' : 'square'} onClick={() => setOrderType('courier')}>
                    <div className='topp'></div>
                    <div className='type'>
                        <div className='bg'>
                            <div className='ikki'></div>
                        </div>
                        <h1>Kuryerdagi buyurtmalar</h1>
                    </div>
                    <div className='about'>
                        <div className='left'>
                            <h6>Soni</h6>
                            <h5>{courierCount} ta</h5>
                        </div>
                        <div className='right'>
                            <h6>Puli</h6>
                            <h5>{courierPrice} so'm</h5>
                        </div>
                    </div>
                </div>

                <div className={orderType === 'completed' ? 'square square-active' : 'square'} onClick={() => setOrderType('completed')}>
                    <div className='topp'></div>
                    <div className='type'>
                        <div className='bg'>
                            <div className='uch'></div>
                        </div>
                        <h1>Tugatilgan buyurtmalar</h1>
                    </div>
                    <div className='about'>
                        <div className='left'>
                            <h6>Soni</h6>
                            <h5>{completedCount} ta</h5>
                        </div>
                        <div className='right'>
                            <h6>Puli</h6>
                            <h5>{completedPrice} so'm</h5>
                        </div>
                    </div>
                </div>

                <div className={orderType === 'rejected' ? 'square square-active' : 'square'} onClick={() => setOrderType('rejected')}>
                    <div className='topp'></div>
                    <div className='type'>
                        <div className='bg'>
                            <div className='turt'></div>
                        </div>
                        <h1>Rad etilgan buyurtmalar</h1>
                    </div>
                    <div className='about'>
                        <div className='left'>
                            <h6>Soni</h6>
                            <h5>{rejectedCount} ta</h5>
                        </div>
                        <div className='right'>
                            <h6>Puli</h6>
                            <h5>{rejectedPrice} so'm</h5>
                        </div>
                    </div>
                </div>
            </div>

            <div className='all-orders-wrapper'>
            <Modal 
                title={null} 
                visible={isModalVisible} 
                onCancel={() => {setIsModalVisible(false)}}
                footer={null}
                className='add-modal'
                centered
            >
                <div className='buyurtma'>
                    <h2>Buyurtma</h2>
                    <div className='select-input-wrap'>
                        <div className='left'>
                            <label>Kuryer</label>
                            <select onChange={(e) => setSelectedCourier(e.target.value)} >
                                <option value={null}>Tanlang</option>
                                {
                                    couriers && couriers.map((courier) => (
                                        <option key={courier._id} value={courier._id}>{ courier.fullname }</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className='right' >
                            <label>Id</label>
                            <input type='text' disabled defaultValue={curOrder ? curOrder._id.code : "ID"}  />
                        </div>
                    </div>
                    <div className='inp-w'>
                        <label>Narxi</label>
                        <input type='text' disabled defaultValue={curOrder ? curOrder.orderPrice : 'Narxi'} />
                    </div>
                    <div className='inp-w'>
                        <label>Viloyat</label>
                        <select>
                            <option>{ curOrder ? curOrder._id.agentId.regionId.name : "Viloyat" }</option>
                        </select>
                    </div>
                    <div className='bottom'>
                        <div>
                            <p>Agent</p>
                            <h5>{ curOrder ? curOrder._id.agentId.fullname : "Agent" }</h5>
                        </div>
                        <button onClick={() => giveOrderToCourier()}>Yuborish</button>
                    </div>
                </div>
            </Modal>
                
                {loader}
                {
                    allOrders ? allOrders.map((item, index) => {
                        const date =  new Date(new Date(item._id.date) - new Date(18000000))
                        return (
                            <OneManagerCard 
                                setIsModalVisible={setIsModalVisible} 
                                key={index} 
                                item={item} 
                                products={item.products} 
                                index={index} 
                                date={date} 
                                getCurOrder={getCurOrder}
                            />
                        )
                    }) : ''
                }
            </div>

            {
                allOrders.length === 0 ? (
                    <h3 style={{textAlign: 'center'}}>Buyurtma mavjud emas</h3>
                ) : ''
            }

        </div>
    )
}

export default ManagerHome