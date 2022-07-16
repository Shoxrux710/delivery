import React, { useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs';
import { getDateInMonthString } from '../../utils/date'

const OneKuryerMoney = (props) => {

    const [ orderMenu, setOrderMenu ] = useState(false)
    const [ leftNames, setLeftNames ] = useState(false)

    const { card, index } = props

    return (
        <div className='one-order'>
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
    )
}

export default OneKuryerMoney