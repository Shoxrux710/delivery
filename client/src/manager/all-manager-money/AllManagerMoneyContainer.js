import React, { useState, useEffect } from 'react'
import axios from 'axios'

import AllManagerMoney from './AllManagerMoney'

const AllManagerMoneyContainer = () => {

    const [ h2, setH2 ] = useState('confirm')

    return (
        <AllManagerMoney
            h2={h2}
            setH2={setH2}
        />
    )
}

export default AllManagerMoneyContainer