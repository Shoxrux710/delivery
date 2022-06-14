import React from 'react'
import { HiFilter } from 'react-icons/hi'
import { MdArrowBack } from 'react-icons/md'
import { Link } from 'react-router-dom'
import './managerDebt.css'

const ManagerDebt = () => {
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
                <p>21 485 230 so’m</p>
            </div>

            <div className='wrapper'>
                <Link to='/debt/id'>
                    <div className='one'>
                        <div className='qator'>
                            <div>
                                <span>Klient</span>
                                <p>CHp.munis group CHp group</p>
                            </div>
                            <div>
                                <span>Moljal</span>
                                <p>CHp.munis group CHp group</p>
                            </div>
                        </div>
                        <div className='qator'>
                            <div>
                                <span>Vaqt</span>
                                <p>20:04:2020</p>
                            </div>
                            <div className='last'>
                                <p>100 000 so’m</p>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    )
}

export default ManagerDebt