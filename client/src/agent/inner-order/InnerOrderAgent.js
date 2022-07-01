import { Collapse } from 'antd'
import React from 'react'
import { HiFilter } from 'react-icons/hi'
import { MdArrowBack } from 'react-icons/md'
import { Link } from 'react-router-dom'
import './innerOrderAgent.css'

const InnerOrderAgent = (props) => {

    const { orderById, orderProducts, price, loader, loading } = props

    const { Panel } = Collapse
    const date = new Date(orderById ? new Date(orderById.date) - new Date(18000000) : '')

    return (
        <div className='inner-order-component'>
            <div className='kuryer-top'>
                <div className='div'>
                    <Link to='/profile'>
                        <MdArrowBack className='icon' />
                    </Link>
                    <h2>Buyurtma ma’lumotlari</h2>
                </div>
                <div>
                    <HiFilter className='iconn' />
                </div>
            </div>
            {
                !loading ? (
                    <div className='order-wrap'>
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
                                    <p>{orderById && orderById.customerId ? orderById.customerId.address : ''}</p>
                                </div>
                            </div>
                        </div>
                        <div className='qator'>
                            <div>
                                <span>Buyurtma berilgan vaqt</span>
                                <p>{date ? date.getDate() : ''}-{date ? date.getMonth() + 1 : ''}-{date ? date.getFullYear() : ''} {date ? date.getHours() : ''}:{date ? date.getMinutes() : ''}</p>
                            </div>
                            <div>
                                <span>Yetkazib berish vaqti</span>
                                <p>{date ? date.getDate() : ''}-{date ? date.getMonth() + 1 : ''}-{date ? date.getFullYear() : ''} {date ? date.getHours() : ''}:{date ? date.getMinutes() : ''}</p>
                            </div>
                        </div>
                        <div className='qator'>
                            <div>
                                <span>Buyurtma ID</span>
                                <p>{orderById ? orderById.code : ''}</p>
                            </div>
                            <div>
                                <span>Manba</span>
                                <p>Manba</p>
                            </div>
                        </div>
                        <div className='qator'>
                            <div>
                                <span>Mijoz</span>
                                <p>{orderById && orderById.customerId ? orderById.customerId.fullname : ''}</p>
                            </div>
                            <div>
                                <span>Telefon raqam</span>
                                <p>{orderById && orderById.customerId ? orderById.customerId.phone : ''}</p>
                            </div>
                        </div>
                        <div className='qator'>
                            <span>Mahsulot</span>
                        </div>
                        <Collapse accordion expandIconPosition='end' ghost>
                            {
                                orderProducts && Array.isArray(orderProducts) ? orderProducts.map((item, index) => {
                                    return (
                                        <Panel key={index} header={item.productId ? item.productId.name : ''}>
                                            <div className='qator'>
                                                <div>
                                                    <span>Soni</span>
                                                    <p>{item.count} ta</p>
                                                </div>
                                                <div>
                                                    <span>Narxi</span>
                                                    <p>{item.productId ? item.productId.price : ''} so‘m</p>
                                                </div>
                                            </div>
                                        </Panel>
                                    )
                                }) : ''
                            }
                        </Collapse>
                        <div className='qator'>
                            <div>
                                <span>To‘lov turi</span>
                                <p>Naqd</p>
                            </div>
                            <div>
                                <span>Narxi</span>
                                <p>{price} sum</p>
                            </div>
                        </div>
                    </div>
                ) : loader
            }
        </div>
    )
}

export default InnerOrderAgent