import React, { useState } from 'react'

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