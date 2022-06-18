import React, { useState } from 'react'
import AllAdminMoney from './AllAdminMoney'

const AllAdminMoneyContainer = () => {

    const [ h2, setH2 ] = useState('confirm')

    return (
        <AllAdminMoney
            h2={h2}
            setH2={setH2}
        />
    )
}

export default AllAdminMoneyContainer