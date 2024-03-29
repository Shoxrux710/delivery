import React from 'react'
import { Modal, Radio } from 'antd'
import { MdArrowBack } from 'react-icons/md'
import { HiFilter } from 'react-icons/hi'
import { BsThreeDotsVertical } from 'react-icons/bs'
import ReactInputMask from 'react-input-mask'
import './allManagers.css'
import { Link } from 'react-router-dom'

const AllManagers = (props) => {

    const { setIsModalVisible, isModalVisible, fullname, setFullname, login, setLogin, password, setPassword, phone, setPhone, regionId, setRegionId, regions, loader, radio, setRadio, employeers, attachEmployee, allEmployeers, deleleteAttach, addManager, allManagers } = props

    return (
        <div className='all-managers-component'>
            <Modal 
                title="Boshqaruvchi qo'shish" 
                visible={isModalVisible} 
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                className='add-modal'
            >
                <form onSubmit={addManager}>
                    <div>
                        <label>Lavozim</label>
                        <input type='text' value='Boshqaruvchi' readOnly />
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
                        <select value={regionId} onChange={(e) => setRegionId(e.target.value)}>
                            <option defaultValue='Tanlanmagan'>Tanlanmagan</option>
                            {
                                regions && Array.isArray(regions) ? regions.map((item, index) => {
                                    return (
                                        <option key={index} value={item._id}>{item.name}</option>
                                    )
                                }):''
                            }
                        </select>
                    </div>
                    <div>
                        <label>Xodim biriktirish</label>
                        <Radio.Group value={radio} onChange={(e) => setRadio(e.target.value)} buttonStyle="solid">
                            <Radio.Button value="agent">Agent</Radio.Button>
                            <Radio.Button value="courier">Kuryer</Radio.Button>
                        </Radio.Group>
                    </div>
                    <div>
                        <label>Xodimlar</label>
                        <select onChange={(e) => attachEmployee(e.target.value)}>
                            <option defaultValue='Tanlanmagan'>Tanlanmagan</option>
                            {
                                employeers && Array.isArray(employeers) ? employeers.map((item, index) => {
                                    return (
                                        <option key={index} value={`${item._id}/${item.fullname}`}>{item.fullname}</option>
                                    )
                                }):''
                            }
                        </select>
                        <div className='xodimlar'>
                            {
                                allEmployeers && Array.isArray(allEmployeers) ? allEmployeers.map((item, index) => {
                                    return (
                                        <div key={index} onClick={() => deleleteAttach(item[0])}>{item[1]}</div>
                                    )
                                }):''
                            }
                        </div>
                    </div>
                    <div>
                        <label>Telefon raqam</label>
                        <ReactInputMask type="text"  mask="+\9\9\8999999999" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                    </div>
                    <button type='submit'>Qo'shish</button>
                </form>
            </Modal>
            <div className='top'>
                <div>
                    <Link to='/'>
                        <MdArrowBack className='icon' />
                    </Link>
                    <h2>Boshqaruvchilar</h2>
                </div>
                <div>
                    <HiFilter className='icon' />
                </div>
            </div>
            <div className='btn-wrap'>
                <button className='add-btn' onClick={() => setIsModalVisible(true)}>Boshqaruvchi qo’shish +</button>
            </div>

            <div className='wrapper'>
                {loader}
                {
                    allManagers && Array.isArray(allManagers) ? allManagers.map((item, index) => {
                        return (
                            <div className='one' key={index}>
                                <div className='bg'></div>
                                <div>
                                    <h1>{item.fullname}</h1>
                                    <p>{item.position}</p>
                                </div>
                                <BsThreeDotsVertical className='icon' />
                                <span>20:30</span>
                            </div>
                        )
                    }):''
                }
            </div>
        </div>
    )
}

export default AllManagers