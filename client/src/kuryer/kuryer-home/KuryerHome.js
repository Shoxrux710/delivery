import React, { useState } from 'react'
import { HiFilter } from 'react-icons/hi'
import { IoIosArrowUp } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { BsThreeDotsVertical } from 'react-icons/bs'
import userPng from '../../img/user.png'
import './kuryerHome.css'
import NavbarContainer from '../../components/navbar/NavbarContainer'

const KuryerHome = (props) => {

    const { setUserBody, userBody, setOrderType, orderType, userData } = props
    const [ orderMenu, setOrderMenu ] = useState(false)
    const [ leftNames, setLeftNames ] = useState(false)

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
                <div className='users-info lst'>
                    <h5>Qo'ldagi pul:</h5>
                    <h5>21 435 230 so'm</h5>
                </div>

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
                <div className='one-order'>
                    <BsThreeDotsVertical className='icon' onClick={() => {setOrderMenu(!orderMenu); setLeftNames(false)}} />
                    <h2 className='h2' onClick={() => {setLeftNames(!leftNames); setOrderMenu(false)}}>Коляска-автокресло Doona S1 Grey</h2>

                    <div className={orderMenu ? 'menu-active menu' : 'menu'}>
                        <div>
                            <div className='bg'>
                                <div></div>
                            </div>
                            <h6>Taxrirlash</h6>
                        </div>
                        <div>
                            <div className='bg bg2'>
                                <div></div>
                            </div>
                            <h6>Kuryer</h6>
                        </div>
                        <div>
                            <div className='bg bg3'>
                                <div></div>
                            </div>
                            <h6>Bekor qilish</h6>
                        </div>
                    </div>

                    <div className={leftNames ? 'left-names left-names-active' : 'left-names'}>
                        <div>
                            <p>Коляска-автокресло Doona S1 Grey</p>
                            <span>2x</span>
                        </div>
                        <div>
                            <p>Коляска-автокресло Doona S1 Grey</p>
                            <span>5x</span>
                        </div>
                        <div className='last'>
                            <p>Коляска-автокресло Doona S1 Grey</p>
                            <span>2x</span>
                        </div>
                    </div>

                    <div className='order' onClick={() => {setOrderMenu(false); setLeftNames(false)}}>
                        <div className='topp'>
                            <div>
                                <h1>1</h1>
                            </div>
                            <div></div>
                        </div>
                        <div className='order-address'>
                            <div className='left'>
                                <div className='circle'>
                                    <div></div>
                                </div>
                                <div className='line'></div>
                                <div className='circle'>
                                    <div></div>
                                </div>
                            </div>
                            <div className='right'>
                                <div>
                                    <span>Jo'natish manzili</span>
                                    <p>Namangan v, Pop tuman, Pungon sh</p>
                                </div>
                                <div>
                                    <span>Yetkazish manzili</span>
                                    <p>Namangan v, Pop tuman, Pungon sh</p>
                                </div>
                            </div>
                        </div>
                        <div className='qator'>
                            <p>ID 1942497</p>
                            <span>23 Fevral 15:00</span>
                        </div>
                        <div className='qator'>
                            <p>Umumiy narxi</p>
                            <h4>11 236 540 so’m</h4>
                        </div>
                        <div className='qator lst'>
                            <p>To’landi</p>
                            <h5>236 540 so’m</h5>
                        </div>
                        <div className='bottom'>
                            <div className='ust'>
                                <h3>Abduvali Abdusoliyev</h3>
                                <p>Mijoz</p>
                            </div>
                            <div className='ust'>
                                <h3>+998934805885</h3>
                                <p>Telefon raqam</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default KuryerHome