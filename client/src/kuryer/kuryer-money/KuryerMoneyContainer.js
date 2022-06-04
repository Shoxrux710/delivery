import React, { useState } from 'react'
import { KuryerMoney } from './KuryerMoney'

const KuryerMoneyContainer = () => {

    const [ h2, setH2 ] = useState('active')
    const [ orderMenu, setOrderMenu ] = useState(false)
    const [ leftNames, setLeftNames ] = useState(false)

    return (
        <KuryerMoney 
            h2={h2} 
            setH2={setH2} 
            orderMenu={orderMenu}
            setOrderMenu={setOrderMenu}
            setLeftNames={setLeftNames}
            leftNames={leftNames}
        />
    )
}

export default KuryerMoneyContainer