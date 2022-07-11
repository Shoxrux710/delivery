import React from 'react'
import { Link } from 'react-router-dom'

import { HiFilter } from 'react-icons/hi'
import { MdArrowBack } from 'react-icons/md'

import { getDate } from '../../utils/date'

import './managerDebt.css'

const ManagerDebt = (props) => {
    const { debt, cards } = props

    return (
        <div className='manager-debt-component'>
            <div className='kuryer-top'>
                <div className='div'>
                    <Link to='/'>
                        <MdArrowBack className='icon' />
                    </Link>
                    <h2>Qarz</h2>
                </div>
                <div>
                    <HiFilter className='iconn' />
                </div>
            </div>
            <div className='debt'>
                <p>Qarz:</p>
                <p>{ debt } so’m</p>
            </div>

            <div className='wrapper'>
                {
                    cards && cards.map(card => (
                        // Link dagi id ga customer id qoyilishi kerak, bu yerda debt ning id si qoyilgan
                        <Link to={`/debt/${card._id}`} key={ card._id }>
                            <div className='one'>
                                <div className='qator'>
                                    <div>
                                        <span>Klient</span>
                                        <p>{ card.customers.fullname }</p>
                                    </div>
                                    <div>
                                        <span>Moljal</span>
                                        <p>{ card.customers.address }</p>
                                    </div>
                                </div>
                                <div className='qator'>
                                    <div>
                                        <span>Vaqt</span>
                                        <p>{ getDate(card.date) }</p>
                                    </div>
                                    <div className='last'>
                                        <p>{ card.debt } so’m</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default ManagerDebt