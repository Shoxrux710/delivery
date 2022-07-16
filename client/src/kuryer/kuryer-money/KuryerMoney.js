import React from 'react'
import { Link } from 'react-router-dom'

import { getDateInMonthString, getFullDateTime } from '../../utils/date'
import { formatString } from '../../utils/number'

import './kuryerMoney.css'

import { HiFilter } from 'react-icons/hi'
import { MdArrowBack } from 'react-icons/md'
import { BsThreeDotsVertical } from 'react-icons/bs'

export const KuryerMoney = (props) => {

    const { setH2, h2, setOrderMenu, orderMenu, setLeftNames, leftNames, cards, cash, giveMoneyToManager, archiveCash, getArchiveCash } = props

    const active = (
        <div className='active-money'>
            <div className='top'>
                <p>Qo’ldagi pul</p>
                <p>{ cash } so’m</p>
            </div>

            {
                cards && cards.map((card, index) => (
                    <div className='one-order' key={ card._id }>
                        <BsThreeDotsVertical className='icon' onClick={() => {setOrderMenu(!orderMenu); setLeftNames(false)}} />
                        <h2 className='h2' onClick={() => {setLeftNames(!leftNames); setOrderMenu(false)}}>Bu yerda qandaydur nom berish kerak</h2>

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
                                    <h1>{ index + 1 }</h1>
                                </div>
                                <div></div>
                            </div>
                            <div className='qator'>
                                <p>ID { card.code }</p>
                                <span>{ getDateInMonthString(card.date) }</span>
                            </div>
                            <div className='qator lst'>
                                <p>Qo'ldagi pul</p>
                                <h4>{ card.cash } so’m</h4>
                            </div>
                            <div className='bottom'>
                                <div className='ust'>
                                    <h3>{ card.fullname }</h3>
                                    <p>Mijoz</p>
                                </div>
                                <div className='ust'>
                                    <h3>{ card.phone }</h3>
                                    <p>Telefon raqam</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }

            <button onClick={ () => giveMoneyToManager() } >Boshqaruvchiga berish</button>
            
        </div>
    )

    const archive = (
        <div className='active-money archive-money'>
            {
                archiveCash && archiveCash.map(card => (
                        <div className='archive-prod' key={ card._id }>
                            <div className='qator'>
                                <h5>{ getFullDateTime(card.dates[0]) }</h5>
                                <h5>{ getFullDateTime(card.dates[1]) }</h5>
                            </div>
                            <div className='qator bb'>
                                <span>Berilgan vaqt</span>
                                <span>Qabul qilingan vaqt</span>
                            </div>
                            <div className='qator'>
                                <p>Umumiy summa</p>
                                <p>{ formatString(card.cash) } so’m</p>
                            </div>
                            <div className='qator'>
                                <p>Zakazlar soni</p>
                                <p>{ formatString(card.count) }</p>
                            </div>
                        </div>
                    )
                ) 
            }
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
                <div className={h2 === 'archive' ? 'act-h2' : ''} onClick={() => {
                    setH2('archive')
                    getArchiveCash()
                }}>
                    <h2>Arxiv</h2>
                </div>
            </div>

            {h2 === 'active' ? active : archive }
        </div>
    )
}
