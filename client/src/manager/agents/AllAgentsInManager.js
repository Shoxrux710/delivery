import React from 'react'
import { Modal } from 'antd'
import { MdArrowBack } from 'react-icons/md'
// import { HiFilter } from 'react-icons/hi'
// import { BsThreeDotsVertical } from 'react-icons/bs'
import ReactInputMask from 'react-input-mask'
import './allAgentsInManager.css'
import { Link } from 'react-router-dom'

const AllAgentsInManager = (props) => {

    const { setIsModalVisible, isModalVisible, fullname, setFullname, login, setLogin, password, setPassword, phone, setPhone, addAgent, allAgents, loader, userData } = props

    return (
        <div className='all-managers-component'>
            <Modal 
                title="Agent qo'shish" 
                visible={isModalVisible} 
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                className='add-modal'
            >
                <form onSubmit={addAgent}>
                    <div>
                        <label>Lavozim</label>
                        <input type='text' value='Agent' readOnly />
                    </div>
                    <div>
                        <label>Ism familiya</label>
                        <input type='text' value={fullname} onChange={(e) => setFullname(e.target.value)} required />
                    </div>
                    <div>
                        <label>Login</label>
                        <input type='text' value={login} onChange={(e) => setLogin(e.target.value)} required />
                    </div>
                    <div>
                        <label>Parol</label>
                        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div>
                        <label>Viloyat</label>
                        <input type='text' readOnly placeholder={userData ? userData.name : ''} />
                    </div>
                    <div>
                        <label>Telefon raqam</label>
                        <ReactInputMask type="text" mask="+\9\9\8999999999" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                    </div>
                    <button type='submit'>Qo'shish</button>
                </form>
            </Modal>
            <div className='top'>
                <div>
                    <Link to='/'>
                        <MdArrowBack className='icon' />
                    </Link>
                    <h2>Agentlar</h2>
                </div>
                <div>
                    {/* <HiFilter className='icon' /> */}
                </div>
            </div>
            <div className='btn-wrap'>
                <button className='add-btn' onClick={() => setIsModalVisible(true)}>Agent qo’shish +</button>
            </div>

            <div className='wrapper'>
                {loader}
                {
                    allAgents && Array.isArray(allAgents) ? allAgents.map((item, index) => {
                        return (
                            <div className='one' key={index}>
                                <div className='bg'></div>
                                <div>
                                    <h1>{item.fullname}</h1>
                                    <p>{item.position}</p>
                                </div>
                                {/* <BsThreeDotsVertical className='icon' /> */}
                                <span>20:30</span>
                            </div>
                        )
                    }):''
                }
            </div>
        </div>
    )
}

export default AllAgentsInManager