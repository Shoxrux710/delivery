import { Collapse, Modal } from 'antd'
import React from 'react'
import { HiFilter } from 'react-icons/hi'
import { MdArrowBack } from 'react-icons/md'
import { Link } from 'react-router-dom'
import './innerOrder.css'

const InnerOrder = (props) => {

    const { setIsModalVisible, isModalVisible, orderById, orderProducts, price, comment, setComment,
        cash, setCash, card, setCard, debt, setDebt, completeOrder, rejectOrder, loader, loading
    } = props

    const { Panel } = Collapse
    const date2 = new Date(orderById ? new Date(orderById.date) - new Date(18000000) : '')
    const date = new Date(orderById && orderById.orderId ? new Date(orderById.orderId.date) - new Date(18000000) : '')

    return (
        <div className='inner-order-component'>
            <div className='kuryer-top'>
                <div className='div'>
                    <Link to='/'>
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
                                    <p>{orderById && orderById.orderId && orderById.orderId.customerId ? orderById.orderId.customerId.address : ''}</p>
                                </div>
                            </div>
                        </div>
                        <div className='qator'>
                            <div>
                                <span>Buyurtma berilgan vaqt</span>
                                <p>{date ? date.getDate() : ''}-{date ? date.getMonth() + 1 : ''}-{date ? date.getFullYear() : ''} {date ? date.getHours() : ''}:{date ? date.getMinutes() : ''}</p>
                            </div>
                            <div>
                                <span>Kuryerga berilgan vaqt</span>
                                <p>{date2 ? date2.getDate() : ''}-{date2 ? date2.getMonth() + 1 : ''}-{date2 ? date2.getFullYear() : ''} {date2 ? date2.getHours() : ''}:{date2 ? date2.getMinutes() : ''}</p>
                            </div>
                        </div>
                        <div className='qator'>
                            <div>
                                <span>Buyurtma ID</span>
                                <p>{orderById && orderById.orderId ? orderById.orderId.code : ''}</p>
                            </div>
                            <div>
                                <span>Manba</span>
                                <p>Manba</p>
                            </div>
                        </div>
                        <div className='qator'>
                            <div>
                                <span>Mijoz</span>
                                <p>{orderById && orderById.orderId && orderById.orderId.customerId ? orderById.orderId.customerId.fullname : ''}</p>
                            </div>
                            <div>
                                <span>Telefon raqam</span>
                                <p>{orderById && orderById.orderId && orderById.orderId.customerId ? orderById.orderId.customerId.phone : ''}</p>
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

                        <div className='btn-wrap'>
                            <button onClick={rejectOrder}>Rad etish</button>
                            <button onClick={() => setIsModalVisible(true)}>Yakunlash</button>
                        </div>
                    </div>
                ) : loader
            }
            <Modal 
                header={null}
                visible={isModalVisible} 
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                className='add-modal'
            >
                <form onSubmit={completeOrder}>
                    <div className='qator'>
                        <div>
                            <span>Operator</span>
                            <p>{orderById && orderById.orderId && orderById.orderId.agentId ? orderById.orderId.agentId.fullname : ''}</p>
                        </div>
                        <div>
                            <span>Kuryer</span>
                            <p>{orderById && orderById.courierId ? orderById.courierId.fullname : ''}</p>
                        </div>
                    </div>
                    <div className='qator'>
                        <div>
                            <span>ID</span>
                            <p>{orderById && orderById.orderId ? orderById.orderId.code : ''}</p>
                        </div>
                        <div>
                            <span>Narxi</span>
                            <p>{price}</p>
                        </div>
                    </div>
                    <div className='qator last'>
                        <div>
                            <span>Adress</span>
                            <p>{orderById && orderById.orderId && orderById.orderId.customerId ? orderById.orderId.customerId.address : ''}</p>
                        </div>
                    </div>
                    <div>
                        <label>Naqt pul</label>
                        <input type='number' value={cash} onChange={(e) => setCash(e.target.value)} required />
                    </div>
                    <div>
                        <label>Perechisleniya</label>
                        <input type='number' value={card} onChange={(e) => setCard(e.target.value)} required />
                    </div>
                    <div>
                        <label>Qarz</label>
                        <input type='number' value={debt} onChange={(e) => setDebt(e.target.value)} required />
                    </div>
                    <div>
                        <label>Izoh</label>
                        <textarea value={comment} onChange={(e) => setComment(e.target.value)} required></textarea>
                    </div>
                    <button type='submit'>Buyurtmani yakunlash</button>
                </form>
            </Modal>
        </div>
    )
}

export default InnerOrder