import React from 'react'
import { Modal } from 'antd'
import { MdArrowBack } from 'react-icons/md'
import { HiFilter } from 'react-icons/hi'
import { BsThreeDotsVertical } from 'react-icons/bs'
import ReactInputMask from 'react-input-mask'
import '../managers/allManagers.css'
import { Link } from 'react-router-dom'

const AllKuryers = (props) => {

    const { setIsModalVisible, isModalVisible, fullname, setFullname, login, setLogin, password, setPassword, regionId, setRegionId, phone, setPhone, regions, addKuryer, allKuryers, loader } = props

    return (
        <div className='all-managers-component'>
            <Modal 
                title="Kuryer qo'shish" 
                visible={isModalVisible} 
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                className='add-modal'
            >
                <form onSubmit={addKuryer}>
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
                    <h2>Kuryerlar</h2>
                </div>
                <div>
                    <HiFilter className='icon' />
                </div>
            </div>
            <div className='btn-wrap'>
                <button className='add-btn' onClick={() => setIsModalVisible(true)}>Kuryer qo’shish +</button>
            </div>

            <div className='wrapper'>
                {loader}
                {
                    allKuryers && Array.isArray(allKuryers) ? allKuryers.map((item, index) => {
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

export default AllKuryers