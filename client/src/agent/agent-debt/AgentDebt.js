import React from 'react'
import { Link } from 'react-router-dom'

import { HiFilter } from 'react-icons/hi'
import { MdArrowBack } from 'react-icons/md'

import { getDate } from '../../utils/date'
import { formatString } from '../../utils/number'

import './agentDebt.css'

const AgentDebt = (props) => {
    const { debt, cards } = props

    return (
        <div className='agent-debt-component'>
            <div className='kuryer-top'>
                <div className='div'>
                    <Link to='/profile'>
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
                    cards && cards.map((card) => (
                        <Link to={`/profile/debt/${card.customers.id}`} key={ card._id } onClick={() => {
                            localStorage.setItem("client", card.customers.fullname)
                        }} >
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
                                        <p>{ formatString(card.debt) } so’m</p>
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

export default AgentDebt