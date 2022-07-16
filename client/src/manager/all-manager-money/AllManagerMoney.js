import React from 'react'
import { Link } from 'react-router-dom'
import { HiFilter } from 'react-icons/hi'
import { MdArrowBack } from 'react-icons/md'
// import { BsThreeDotsVertical } from 'react-icons/bs'

import { getDateInMonthString } from '../../utils/date'
import { formatString } from '../../utils/number'

import './allManagerMoney.css'

const AllManagerMoney = (props) => {

    const { h2, setH2, cards, activeCards, cash, rejectCard, confirmCard, getActiveCards, giveProcessToAdmin } = props

    const confirm = (
        <div className='confirm-datas'>
            <div className='money'>
                <p>Qo’ldagi pul</p>
                <p>{ formatString(cash) } so’m</p>
            </div>
            {
                cards && cards.map((card, index) => (
                    <div className='one' key = { card._id }>
                        <div className='top'>
                            <h3>{ index + 1 }. <span>{ card.fullname }</span></h3>
                        </div>
                        <div className='qator'>
                            <p>Berilgan vaqti</p>
                            <span>{ getDateInMonthString(card.date) }</span>
                        </div>
                        <div className='qator'>
                            <p>Buyurtmalar soni</p>
                            <span>{ formatString(card.count) }</span>
                        </div>
                        <div className='qator'>
                            <p>Qo’ldagi pul</p>
                            <span>{ formatString(card.cash) } so’m</span>
                        </div>
                        <div className='btns-wrap'>
                            <button onClick={() => rejectCard(card._id)} >Rad etish</button>
                            <button onClick={() => confirmCard(card.processId)} >Tasdiqlash</button>
                        </div>
                    </div>
                ))
            }
        </div>
    )

    const active = (
        <div className='confirm-datas'>
        {
            activeCards && activeCards.map((card, index) => (
                <div className='one' key = { card._id }>
                    <div className='top'>
                        <h3>{ index + 1 }. <span>{ card.fullname }</span></h3>
                        {/* <BsThreeDotsVertical className='icon' /> */}
                    </div>
                    <div className='qator'>
                        <p>Berilgan vaqti</p>
                        <span>{ getDateInMonthString(card.date) }</span>
                    </div>
                    <div className='qator'>
                        <p>Buyurtmalar soni</p>
                        <span>{ formatString(card.count) } ta</span>
                    </div>
                    <div className='qator'>
                        <p>Qo’ldagi pul</p>
                        <span>{ formatString(card.cash) } so’m</span>
                    </div>
                </div>
            ))
        }
            <button onClick={() => giveProcessToAdmin()}>Adminga berish</button>
        </div>
    )

    const archive = (
        <div className='archive-datas'>
            <div className='archived'>
                <div className='qator1'>
                    <div>
                        <p>30.04.2022 10:35</p>
                        <span>Kuryer bergan vaqt</span>
                    </div>
                    <div>
                        <p>30.04.2022 10:30</p>
                        <span>Qabul qilingan vaqt</span>
                    </div>
                </div>
                <div className='qator1 last'>
                    <div>
                        <p>30.04.2022 10:35</p>
                        <span>Adminga berilgan vaqt</span>
                    </div>
                    <div>
                        <p>30.04.2022 10:30</p>
                        <span>Qabul qilingan vaqt</span>
                    </div>
                </div>
                <div className='qator2'>
                    <p>Umumiy summa</p>
                    <span>100 000 000 so’m</span>
                </div>
                <div className='qator2'>
                    <p>Kuryerlar soni</p>
                    <span>12</span>
                </div>
                <div className='qator2'>
                    <p>Buyurtmalar soni</p>
                    <span>120</span>
                </div>
            </div>
        </div>
    )

    const isConfirm = h2 === 'confirm' ? confirm : null
    const isActive = h2 === 'active' ? active : null
    const isArchive = h2 === 'archive' ? archive : null

    return (
        <div className='all-manager-money-component'>
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

            <div className='h2-wrap'>
                <h2 className={h2 === 'confirm' ? 'act-h2' : ''} onClick={() => {
                    setH2('confirm')
                }}>Tasdiqlash</h2>
                <h2 className={h2 === 'active' ? 'act-h2' : ''} onClick={() => {
                    getActiveCards()
                    setH2('active')
                }}>Aktiv</h2>
                <h2 className={h2 === 'archive' ? 'act-h2' : ''} onClick={() => setH2('archive')}>Arxiv</h2>
            </div>

            {isConfirm}
            {isActive}
            {isArchive}
        </div>
    )
}

export default AllManagerMoney