import { Collapse } from 'antd'
import React from 'react'
import { HiFilter } from 'react-icons/hi'
import { MdArrowBack } from 'react-icons/md'
import { Link } from 'react-router-dom'
import './innerOrderAgent.css'

const InnerOrderAgent = () => {

    const { Panel } = Collapse

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
                            <p>Namangan v, Pop tuman, Pungon sh</p>
                        </div>
                        <div>
                            <span>Yetkazish manzili</span>
                            <p>Namangan v, Pop tuman, Pungon sh</p>
                        </div>
                    </div>
                </div>
                <div className='qator'>
                    <div>
                        <span>Buyurtma berilgan vaqt</span>
                        <p>23 Fevral 15:00</p>
                    </div>
                    <div>
                        <span>Yetkazib berish vaqti</span>
                        <p>29 Fevral 18:47</p>
                    </div>
                </div>
                <div className='qator'>
                    <div>
                        <span>Buyurtma ID</span>
                        <p>1942497</p>
                    </div>
                    <div>
                        <span>Manba</span>
                        <p>Manba</p>
                    </div>
                </div>
                <div className='qator'>
                    <div>
                        <span>Mijoz</span>
                        <p>Abduvali Abdusoliyev</p>
                    </div>
                    <div>
                        <span>Telefon raqam</span>
                        <p>+998934805885</p>
                    </div>
                </div>
                <div className='qator'>
                    <span>Mahsulot</span>
                </div>
                <Collapse accordion expandIconPosition='end' ghost>
                    <Panel header="Коляска-автокресло Doona S1 Grey" key="1">
                        <div className='qator'>
                            <div>
                                <span>Soni</span>
                                <p>2ta</p>
                            </div>
                            <div>
                                <span>Narxi</span>
                                <p>580 000 so‘m</p>
                            </div>
                        </div>
                    </Panel>
                    <Panel header="Коляска-автокресло Doona S1 Grey" key="2">
                        <div className='qator'>
                            <div>
                                <span>Soni</span>
                                <p>2ta</p>
                            </div>
                            <div>
                                <span>Narxi</span>
                                <p>580 000 so‘m</p>
                            </div>
                        </div>
                    </Panel>
                    <Panel header="Коляска-автокресло Doona S1 Grey" key="3">
                        <div className='qator'>
                            <div>
                                <span>Soni</span>
                                <p>2ta</p>
                            </div>
                            <div>
                                <span>Narxi</span>
                                <p>580 000 so‘m</p>
                            </div>
                        </div>
                    </Panel>
                </Collapse>
                <div className='qator'>
                    <div>
                        <span>To‘lov turi</span>
                        <p>Naqd</p>
                    </div>
                    <div>
                        <span>Narxi</span>
                        <p>10 000 000 sum</p>
                    </div>
                </div>
                <div className='qator'>
                    <span>Izoh</span>
                </div>
                <textarea></textarea>

                <div className='btn-wrap'>
                    <button>Tahrirlash</button>
                    <button>O'chirish</button>
                </div>
            </div>
        </div>
    )
}

export default InnerOrderAgent