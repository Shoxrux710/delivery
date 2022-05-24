import React from 'react'
import { CgMenu } from 'react-icons/cg'
import { HiFilter } from 'react-icons/hi'
import { IoIosArrowUp } from 'react-icons/io'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import logoPng from '../../img/logo.png'
import userPng from '../../img/user.png'
import './adminHome.css'

const AdminHome = (props) => {

    const { userBody, setUserBody, orderType, setOrderType } = props

    return (
        <div className='admin-home-component'>
            <div className='top'>
                <CgMenu className='icon' />
                <img src={logoPng} alt='' />
                <div className='bg' style={{backgroundImage: `url(${userPng})`}}></div>
            </div>
            <div className='user-wrapper'>
                <div className='user-top' style={{borderBottom: userBody ? 'none' : '1px solid #f3f3f3'}}>
                    <div className='left'>
                        <div className='bg' style={{backgroundImage: `url(${userPng})`}}></div>
                        <div>
                            <h2>Azizbek Abduxalilov</h2>
                            <p>Admin</p>
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
                            <h5>Admin</h5>
                        </div>
                        <div>
                            <h4>Ism familiya</h4>
                            <h5>Azizbek Abduxalilov</h5>
                        </div>
                    </div>
                    <div className='qator'>
                        <div>
                            <h4>Login</h4>
                            <h5>Abdulaziz</h5>
                        </div>
                        <div>
                            <h4>Parol</h4>
                            <h5>********</h5>
                        </div>
                    </div>
                    <div className='qator'>
                        <div>
                            <h4>Telefon raqam</h4>
                            <h5>+998934805885</h5>
                        </div>
                        <div>
                            <h4>Manzil</h4>
                            <h5>Namangan</h5>
                        </div>
                    </div>
                </div>
            </div>

            <div className='wrapper'>
                <div className='debt'>
                    <Link to='/'>
                        <div className='div1'>
                            <h5>Qarz: <span>21 485 230 so’m</span></h5>
                        </div>
                    </Link>
                    <div className='div2'>
                        <HiFilter className='icon' />
                    </div>
                </div>

                <Link to='/'>
                    <div className='users-info'>
                        <h5>Boshkaruvchilar:</h5>
                        <h5>100</h5>
                    </div>
                </Link>
                <Link to='/'>
                    <div className='users-info'>
                        <h5>Agentlar:</h5>
                        <h5>100</h5>
                    </div>
                </Link>
                <Link to='/'>
                    <div className='users-info lst'>
                        <h5>Kuryerlar:</h5>
                        <h5>100</h5>
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
                            <h5>120 ta</h5>
                        </div>
                        <div className='right'>
                            <h6>Puli</h6>
                            <h5>100 000 000 so'm</h5>
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
                            <h5>120 ta</h5>
                        </div>
                        <div className='right'>
                            <h6>Puli</h6>
                            <h5>100 000 000 so'm</h5>
                        </div>
                    </div>
                </div>

                <div className={orderType === 'finished' ? 'square square-active' : 'square'} onClick={() => setOrderType('finished')}>
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
                            <h5>120 ta</h5>
                        </div>
                        <div className='right'>
                            <h6>Puli</h6>
                            <h5>100 000 000 so'm</h5>
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
                            <h5>120 ta</h5>
                        </div>
                        <div className='right'>
                            <h6>Puli</h6>
                            <h5>100 000 000 so'm</h5>
                        </div>
                    </div>
                </div>
            </div>

            <div className='all-orders-wrapper'>
                <div className='order'>
                    <div className='order-top'>
                        <div className='left'>
                            <h1>1</h1>
                            <div>
                                <h3>Azizbek Abduxalilov</h3>
                                <p>Boshqaruvchi</p>
                            </div>
                        </div>
                        <div className='right'>
                            <BsThreeDotsVertical className='icon' />
                        </div>
                    </div>
                    <div className='qator'>
                        <p>Faol buyurtmalar</p>
                        <span>150</span>
                    </div>
                    <div className='qator'>
                        <p>Umumiy narxi</p>
                        <h6>11 236 540 so’m</h6>
                    </div>
                    <div className='qator'>
                        <h5>Samarqand</h5>
                        <h5>+998934805885</h5>
                    </div>
                </div>

                <div className='order'>
                    <div className='order-top'>
                        <div className='left'>
                            <h1>1</h1>
                            <div>
                                <h3>Azizbek Abduxalilov</h3>
                                <p>Boshqaruvchi</p>
                            </div>
                        </div>
                        <div className='right'>
                            <BsThreeDotsVertical className='icon' />
                        </div>
                    </div>
                    <div className='qator'>
                        <p>Faol buyurtmalar</p>
                        <span>150</span>
                    </div>
                    <div className='qator'>
                        <p>Umumiy narxi</p>
                        <h6>11 236 540 so’m</h6>
                    </div>
                    <div className='qator'>
                        <h5>Samarqand</h5>
                        <h5>+998934805885</h5>
                    </div>
                </div>

                <div className='order'>
                    <div className='order-top'>
                        <div className='left'>
                            <h1>1</h1>
                            <div>
                                <h3>Azizbek Abduxalilov</h3>
                                <p>Boshqaruvchi</p>
                            </div>
                        </div>
                        <div className='right'>
                            <BsThreeDotsVertical className='icon' />
                        </div>
                    </div>
                    <div className='qator'>
                        <p>Faol buyurtmalar</p>
                        <span>150</span>
                    </div>
                    <div className='qator'>
                        <p>Umumiy narxi</p>
                        <h6>11 236 540 so’m</h6>
                    </div>
                    <div className='qator'>
                        <h5>Samarqand</h5>
                        <h5>+998934805885</h5>
                    </div>
                </div>

                <div className='order'>
                    <div className='order-top'>
                        <div className='left'>
                            <h1>1</h1>
                            <div>
                                <h3>Azizbek Abduxalilov</h3>
                                <p>Boshqaruvchi</p>
                            </div>
                        </div>
                        <div className='right'>
                            <BsThreeDotsVertical className='icon' />
                        </div>
                    </div>
                    <div className='qator'>
                        <p>Faol buyurtmalar</p>
                        <span>150</span>
                    </div>
                    <div className='qator'>
                        <p>Umumiy narxi</p>
                        <h6>11 236 540 so’m</h6>
                    </div>
                    <div className='qator'>
                        <h5>Samarqand</h5>
                        <h5>+998934805885</h5>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminHome