import React from 'react'
import { HiFilter } from 'react-icons/hi'
import { MdArrowBack } from 'react-icons/md'
import { Link } from 'react-router-dom'
import './kuryerMoney.css'

const InnerKuryerMoneyArchive = () => {
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
                <p>323 000 000 so’m</p>
            </div>

            <div className='active-money archive-money'>
                <div className='archive-prod'>
                    <div className='qator'>
                        <h5 style={{fontWeight: '400', color: '#C3C6CE'}}>ID 3231232</h5>
                        <h5 style={{fontWeight: '400', color: '#C3C6CE'}}>23 Fevral 15:00</h5>
                    </div>
                    <div className='qator bb'>
                        <p>Naqd pul</p>
                        <p>11 235 545 so'm</p>
                    </div>
                    <div className='qator'>
                        <p style={{fontWeight: '600', color: '#383838'}}>Abduvali Abdusoli</p>
                        <p style={{fontWeight: '600', color: '#383838'}}>+998931234567</p>
                    </div>
                    <div className='qator'>
                        <span>Zakazlar soni</span>
                        <span>3223</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InnerKuryerMoneyArchive