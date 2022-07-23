import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const OneAgentCard = (props) => {

    const { item, products, index, date } = props

    const [ orderMenu, setOrderMenu ] = useState(false)
    const [ leftNames, setLeftNames ] = useState(false)

    return (
        <div className='one-order'>
            <h2 className='h2' onClick={() => {setLeftNames(!leftNames); setOrderMenu(false)}}>
                {
                    products && Array.isArray(products) ? products.map((item, index) => {
                        return (
                            <span key={index}>{item.productId ? item.productId.name : ''}; </span>
                        )
                    }) : ''
                }
            </h2>

            <div className={leftNames ? 'left-names left-names-active' : 'left-names'}>
                {
                    products && Array.isArray(products) ? products.map((item, index) => {
                        return (
                            <div key={index}>
                                <p>{item.productId ? item.productId.name : ''}</p>
                                <span>{item.count}x</span>
                            </div>
                        )
                    }) : ''
                }
            </div>

            <Link to={`order/${item?._id}`}>
                <div className='order' onClick={() => {setOrderMenu(false); setLeftNames(false)}}>
                    <div className='topp'>
                        <div>
                            <h1>{index + 1}</h1>
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
                                <p>Toshkent shahri, Yunusobod tumani 4-mavze</p>
                            </div>
                            <div>
                                <span>Yetkazish manzili</span>
                                <p>{ item?.address }</p>
                            </div>
                        </div>
                    </div>
                    <div className='qator'>
                        <p>ID {item?.code}</p>
                        <span>{date ? date.getDate() : ''}-{date ? date.getMonth() + 1 : ''}-{date ? date.getFullYear() : ''} {date ? date.getHours() : ''}:{date ? date.getMinutes() : ''}</span>
                    </div>
                    <div className='qator'>
                        <p>Umumiy narxi</p>
                        <h4>{item.orderPrice} so’m</h4>
                    </div>
                    <div className='bottom'>
                        <div className='ust'>
                            <h3>{item?.fullname}</h3>
                            <p>Mijoz</p>
                        </div>
                        <div className='ust'>
                            <h3>{item?.phone}</h3>
                            <p>Telefon raqam</p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default OneAgentCard