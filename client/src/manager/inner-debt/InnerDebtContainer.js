import React, { useState } from 'react'
import InnerDebt from './InnerDebt'

const InnerDebtContainer = () => {

    const [ orderMenu, setOrderMenu ] = useState(false)
    const [ leftNames, setLeftNames ] = useState(false)
    const [ isModalVisible, setIsModalVisible ] = useState(false)

    return (
        <InnerDebt
            orderMenu={orderMenu}
            setOrderMenu={setOrderMenu}
            leftNames={leftNames}
            setLeftNames={setLeftNames}
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
        />
    )
}

export default InnerDebtContainer