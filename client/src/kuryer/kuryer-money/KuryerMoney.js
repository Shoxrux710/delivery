import React from 'react'
import { MdArrowBack } from 'react-icons/md'
import { HiFilter } from 'react-icons/hi'
import './kuryerMoney.css'
import { Link } from 'react-router-dom'
import { BsThreeDotsVertical } from 'react-icons/bs'

export const KuryerMoney = (props) => {

    const { setH2, h2, setOrderMenu, orderMenu, setLeftNames, leftNames } = props


    const active = (
        <div className='active-money'>
            <div className='top'>
                <p>Qo’ldagi pul</p>
                <p>100 000 000 so’m</p>
            </div>

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

            <button>Boshqaruvchiga berish</button>
            
        </div>
    )

    return (
        <div className='kuryer-money-component'>
            <div className='kuryer-top'>
                <div className='div'>
                    <Link to='/'>
                        <MdArrowBack className='icon' />
                    </Link>
                    <h2>Naqd pul</h2>
                </div>
                <div>
                    <HiFilter className='iconn' />
                </div>
            </div>
            <div className='h2-top'>
                <div className={h2 === 'active' ? 'act-h2' : ''} onClick={() => setH2('active')}>
                    <h2>Aktiv</h2>
                </div>
                <div className={h2 === 'archive' ? 'act-h2' : ''} onClick={() => setH2('archive')}>
                    <h2>Arxiv</h2>
                </div>
            </div>

            {active}
        </div>
    )
}
