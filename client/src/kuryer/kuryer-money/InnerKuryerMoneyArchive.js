import React from 'react'
import { Link } from 'react-router-dom'

import { formatString } from '../../utils/number'
import { getDateInMonthString } from '../../utils/date'

import { HiFilter } from 'react-icons/hi'
import { MdArrowBack } from 'react-icons/md'

import './kuryerMoney.css'

const InnerKuryerMoneyArchive = ({
    cards,
    price
}) => {
    return (
        <div className='kuryer-money-component inner-kuryer-archive'>

            <div className='kuryer-top'>
                <div className='div'>
                    <Link to='/money'>
                        <MdArrowBack className='icon' />
                    </Link>
                    <h2>Naqd pul arxiv</h2>
                </div>
                <div>
                    <HiFilter className='iconn' />
                </div>
            </div>

            <div className='top'>
                <p>Qo’ldagi pul</p>
                <p>{ formatString(price) } so’m</p>
            </div>

            <div className='active-money archive-money'>
            {
                cards && cards.map((card) => (
                    <div className='archive-prod' key={ card.code }>
                        <div className='qator'>
                            <h5 style={{fontWeight: '400', color: '#C3C6CE'}}>ID { card.code }</h5>
                            <h5 style={{fontWeight: '400', color: '#C3C6CE'}}>{ getDateInMonthString(card.date) }</h5>
                        </div>
                        <div className='qator bb'>
                            <p>Naqd pul</p>
                            <p>{ formatString(card.cash) } so'm</p>
                        </div>
                        <div className='qator'>
                            <p style={{fontWeight: '600', color: '#383838'}}>{ card.fullname }</p>
                            <p style={{fontWeight: '600', color: '#383838'}}>{ card.phone }</p>
                        </div>
                        <div className='qator'>
                            <span>Mijoz</span>
                            <span>Telefon raqam</span>
                        </div>
                    </div>
                ))
            }
            </div>
        </div>
    )
}

export default InnerKuryerMoneyArchive