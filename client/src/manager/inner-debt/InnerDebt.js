import React from 'react'
import { Modal } from 'antd'
import { Link } from 'react-router-dom'

import { getDateWithDash } from '../../utils/date'
import { formatString } from '../../utils/number.js'

import { HiFilter } from 'react-icons/hi'
import { MdArrowBack } from 'react-icons/md'

import './innerDebt.css'

const InnerDebt = (props) => {
    const { 
        setOrderMenu, leftNames, setLeftNames, isModalVisible, setIsModalVisible,
        price, cards, client, getChequeById, modalData, setModalData
    } = props

    return (
        <div className='inner-debt-container'>
             <div className='kuryer-top'>
                <div className='div'>
                    <Link to='/debt'>
                        <MdArrowBack className='icon' />
                    </Link>
                    <div>
                        <h2>Mijoz balansi</h2>
                        <p>{ client }</p>
                    </div>
                </div>
                <div>
                    <HiFilter className='iconn' />
                </div>
            </div>
            <div className='debt'>
                <p>Qarz:</p>
                <p>{ formatString(price.debt) } so’m</p>
            </div>

            <div className='about'>
                <div>
                    <p>Barcha pullar:</p>
                    <p>{ formatString(price.cash + price.card) } so’m</p>
                </div>
                <div>
                    <p>Naqd pul:</p>
                    <p>{ formatString(price.cash) } so’m</p>
                </div>
                <div>
                    <p>Karta pul:</p>
                    <p>{ formatString(price.card) } so’m</p>
                </div>
            </div>

            <h4>Batafsil ma'lumot:</h4>
            <Modal 
                title={null} 
                visible={isModalVisible} 
                onCancel={() => {setIsModalVisible(false); setLeftNames(false); setOrderMenu(false); setModalData(null)}}
                footer={null}
                className='add-modal'
                centered
            >
                {
                    modalData && (
                        <div className='one-order'>
                            <h2 className='h2' onClick={() => {setLeftNames(!leftNames); setOrderMenu(false)}}>Коляска-автокресло Doona S1 Grey</h2>

                            <div className={leftNames ? 'left-names left-names-active' : 'left-names'}>
                                {
                                    modalData.products.map((product) => (
                                        <div key={ product._id }>
                                            <p>{ product.productId.name }</p>
                                            <span>{ product.count + ' x' }</span>
                                        </div>
                                    ))
                                }
                            </div>

                            <div className='order' onClick={() => {setOrderMenu(false); setLeftNames(false)}}>
                                <div className='topp'>
                                    <div>
                                        <h1>1</h1>
                                    </div>
                                    <div></div>
                                </div>
                                <div className='qator'>
                                    <p>ID { modalData.id }</p>
                                    <span>{ modalData.date }</span>
                                </div>
                                <div className='qator'>
                                    <p>Umumiy narxi</p>
                                    <h4>{ modalData.price } so’m</h4>
                                </div>
                                <div className='qator lst'>
                                    <p>To’landi</p>
                                    <h5>{ modalData.payment } so’m</h5>
                                </div>
                                <div className='bottom'>
                                    <div className='ust'>
                                        <h3>{ modalData.clientName }</h3>
                                        <p>Mijoz</p>
                                    </div>
                                    <div className='ust'>
                                        <h3>{ modalData.clientPhone }</h3>
                                        <p>Telefon raqam</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                }
            </Modal>

            <div className='wrapper'>
                {
                    cards && cards.map((card) => (
                        <div className='one' onClick={() => {
                            getChequeById(card._id)
                        }} key={ card._id } >
                            <div className='qator'>
                                <div>
                                    <span>{ getDateWithDash(card.date) }</span>
                                    <p>To'lov miqdori:</p>
                                </div>
                                <div>
                                    <span>To’lov</span>
                                    <p>{ formatString(card.debt) } so’m</p>
                                </div>
                            </div>
                            <h6>To'langan</h6>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default InnerDebt