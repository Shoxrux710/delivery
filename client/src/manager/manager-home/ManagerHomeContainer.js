import React, { useState } from 'react'
import ManagerHome from './ManagerHome'

const ManagerHomeContainer = () => {

    const [ userBody, setUserBody ] = useState(false)
    const [ orderType, setOrderType ] = useState('active')

    return (
        <ManagerHome 
            userBody={userBody}
            setUserBody={setUserBody}
            setOrderType={setOrderType} 
            orderType={orderType}
        />
    )
}

export default ManagerHomeContainer