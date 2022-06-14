import { Modal } from 'antd'
import React from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { HiFilter } from 'react-icons/hi'
import { MdArrowBack } from 'react-icons/md'
import { Link } from 'react-router-dom'
import './innerDebt.css'

const InnerDebt = (props) => {

    const { orderMenu, setOrderMenu, leftNames, setLeftNames, isModalVisible, setIsModalVisible } = props

    return (
        <div className='inner-debt-container'>
             <div className='kuryer-top'>
                <div className='div'>
                    <Link to='/debt'>
                        <MdArrowBack className='icon' />
                    </Link>
                    <div>
                        <h2>Mijoz balansi</h2>
                        <p>CHp.munis group</p>
                    </div>
                </div>
                <div>
                    <HiFilter className='iconn' />
                </div>
            </div>
            <div className='debt'>
                <p>Qarz:</p>
                <p>21 485 230 so’m</p>
            </div>

            <div className='about'>
                <div>
                    <p>Barcha pullar:</p>
                    <p>21 485 230 so’m</p>
                </div>
                <div>
                    <p>Naqd pul:</p>
                    <p>21 485 230 so’m</p>
                </div>
                <div>
                    <p>Karta pul:</p>
                    <p>21 485 230 so’m</p>
                </div>
            </div>

            <h4>Batafsil ma'lumot:</h4>
            <Modal 
                title={null} 
                visible={isModalVisible} 
                onCancel={() => {setIsModalVisible(false); setLeftNames(false); setOrderMenu(false)}}
                footer={null}
                className='add-modal'
                centered
            >
                <div className='one-order'>
                    <BsThreeDotsVertical className='icon' onClick={() => {setOrderMenu(!orderMenu); setLeftNames(false)}} />
                    <h2 className='h2' onClick={() => {setLeftNames(!leftNames); setOrderMenu(false)}}>Коляска-автокресло Doona S1 Grey</h2>

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
                                <h1>1</h1>
                            </div>
                            <div></div>
                        </div>
                        <div className='qator'>
                            <p>ID 1942497</p>
                            <span>23 Fevral 15:00</span>
                        </div>
                        <div className='qator'>
                            <p>Umumiy narxi</p>
                            <h4>11 236 540 so’m</h4>
                        </div>
                        <div className='qator lst'>
                            <p>To’landi</p>
                            <h5>236 540 so’m</h5>
                        </div>
                        <div className='bottom'>
                            <div className='ust'>
                                <h3>Abduvali Abdusoliyev</h3>
                                <p>Mijoz</p>
                            </div>
                            <div className='ust'>
                                <h3>+998934805885</h3>
                                <p>Telefon raqam</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
            <div className='wrapper'>
                <div className='one' onClick={() => setIsModalVisible(true)}>
                    <div className='qator'>
                        <div>
                            <span>23-06-2022</span>
                            <p>To'lov miqdori:</p>
                        </div>
                        <div>
                            <span>To’lov</span>
                            <p>100 000 so’m</p>
                        </div>
                    </div>
                    <h6>To'langan</h6>
                </div>
            </div>

        </div>
    )
}

export default InnerDebt