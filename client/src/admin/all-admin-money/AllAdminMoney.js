import React from 'react'
import { Link } from 'react-router-dom'

import { HiFilter } from 'react-icons/hi'
import { MdArrowBack } from 'react-icons/md'

import { getDateInMonthString, getFullDateTime } from '../../utils/date'
import { formatString } from '../../utils/number'

import './allAdminMoney.css'

const AllAdminMoney = (props) => {

    const { h2, setH2, cards, archiveCards, cash, rejectCard, confirmCard, getArchiveCards } = props

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
                            <h3>{ index + 1 }. <span>{ card.fullname[0] }</span></h3>
                        </div>
                        <div className='qator'>
                            <p>Berilgan vaqti</p>
                            <span>{ getDateInMonthString(card.date[0]) }</span>
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
                            <button onClick={() => rejectCard(card.processDates)} >Rad etish</button>
                            <button onClick={() => confirmCard(card._id)} >Tasdiqlash</button>
                        </div>
                    </div>
                ))
            }
        </div>
    )

    const archive = (
        <div className='archive-datas'>
            {
                archiveCards.length
                    ? archiveCards.map((card) => (
                        <div className='archived' key = { card._id }>
                            <div className='qator1 last'>
                                <div>
                                    <p>{ getFullDateTime(card.dates[0]) }</p>
                                    <span>Adminga berilgan vaqt</span>
                                </div>
                                <div>
                                    <p>{ getFullDateTime(card.dates[1]) }</p>
                                    <span>Qabul qilingan vaqt</span>
                                </div>
                            </div>
                            <div className='qator2'>
                                <p>Umumiy summa</p>
                                <span>{ formatString(card.cash) } so’m</span>
                            </div>
                            <div className='qator2'>
                                <p>Buyurtmalar soni</p>
                                <span>{ formatString(card.count) }</span>
                            </div>
                        </div>
                    )) : ""
            }

        </div>
    )

    const isConfirm = h2 === 'confirm' ? confirm : null
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
                <h2 className={h2 === 'archive' ? 'act-h2' : ''} onClick={() => {
                    setH2('archive')
                    getArchiveCards()    
                }}>Arxiv</h2>
            </div>

            {isConfirm}
            {isArchive}
        </div>
    )
}

export default AllAdminMoney