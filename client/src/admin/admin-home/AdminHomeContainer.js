import React, { useState } from 'react'
import AdminHome from './AdminHome'

const AdminHomeContainer = () => {

    const [ userBody, setUserBody ] = useState(false)
    const [ orderType, setOrderType ] = useState('active')

    return (
        <AdminHome userBody={userBody} setUserBody={setUserBody} setOrderType={setOrderType} orderType={orderType} />
    )
}

export default AdminHomeContainer