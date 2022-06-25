import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const OneAgentCard = (props) => {

    const { item, products, index, date } = props

    const [ orderMenu, setOrderMenu ] = useState(false)
    const [ leftNames, setLeftNames ] = useState(false)
    const [ price, setPrice ] = useState(0)

    useEffect(() => {
        if( products ) {
            setPrice(products.reduce((price, product) => {
                return price + product.count * product.productId?.price
            }, 0))
        }
        //eslint-disable-next-line
    }, [])

    return (
        <div className='one-order'>
            <BsThreeDotsVertical className='icon' onClick={() => {setOrderMenu(!orderMenu); setLeftNames(false)}} />
            <h2 className='h2' onClick={() => {setLeftNames(!leftNames); setOrderMenu(false)}}>
                {
                    products && Array.isArray(products) ? products.map((item, index) => {
                        // setPrice(price + (item.count * item.productId.price))
                        return (
                            <span key={index}>{item.productId ? item.productId.name : ''}; </span>
                        )
                    }) : ''
                }
            </h2>

            <div className={orderMenu ? 'menu-active menu' : 'menu'}>
                <div>
                    <div className='bg'>
                        <div></div>
                    </div>
                    <h6>Taxrirlash</h6>
                </div>
                <div>
                    <div className='bg bg2'>
                        <div></div>
                    </div>
                    <h6>Kuryer</h6>
                </div>
                <div>
                    <div className='bg bg3'>
                        <div></div>
                    </div>
                    <h6>Bekor qilish</h6>
                </div>
            </div>

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

            <Link to={`order/${item ? item._id : ''}`}>
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
                                <p>{item && item.customerId ? item.customerId.address : ''}</p>
                            </div>
                        </div>
                    </div>
                    <div className='qator'>
                        <p>ID {item ? item.code : ''}</p>
                        <span>{date ? date.getDate() : ''}-{date ? date.getMonth() + 1 : ''}-{date ? date.getFullYear() : ''} {date ? date.getHours() : ''}:{date ? date.getMinutes() : ''}</span>
                    </div>
                    <div className='qator'>
                        <p>Umumiy narxi</p>
                        <h4>{price} so’m</h4>
                    </div>
                    {/* <div className='qator lst'>
                        <p>To’landi</p>
                        <h5>236 540 so’m</h5>
                    </div> */}
                    <div className='bottom'>
                        <div className='ust'>
                            <h3>{item && item.customerId ? item.customerId.fullname : ''}</h3>
                            <p>Mijoz</p>
                        </div>
                        <div className='ust'>
                            <h3>{item && item.customerId ? item.customerId.phone : ''}</h3>
                            <p>Telefon raqam</p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default OneAgentCard