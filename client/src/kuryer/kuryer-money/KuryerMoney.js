import React from 'react'
import { Link } from 'react-router-dom'

import { getFullDateTime } from '../../utils/date'
import { formatString } from '../../utils/number'

import './kuryerMoney.css'

import { HiFilter } from 'react-icons/hi'
import { MdArrowBack } from 'react-icons/md'
import OneKuryerMoney from './OneKuryerMoney'

export const KuryerMoney = (props) => {

    const { setH2, h2, cards, cash, giveMoneyToManager, archiveCash, getArchiveCash } = props

    const active = (
        <div className='active-money'>
            <div className='top'>
                <p>Qo’ldagi pul</p>
                <p>{ cash } so’m</p>
            </div>

            {
                cards && cards.map((card, index) => (
                    <OneKuryerMoney 
                        key={ card._id }
                        card={card}
                        index={index}
                    />
                ))
            }

            { cards.length ? <button onClick={ () => giveMoneyToManager() } >Boshqaruvchiga berish</button> : "" }
            
        </div>
    )

    const archive = (
        <div className='active-money archive-money'>
            {
                archiveCash && archiveCash.map(card => (
                        <Link to={card._id} key={ card._id }>
                            <div className='archive-prod'>
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
                        </Link>
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
                {/* Dizaynda kerakli funksionallik bo`lmagani uchun kommentga olindi */}
                {/* <div>
                    <HiFilter className='iconn' />
                </div> */}
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
