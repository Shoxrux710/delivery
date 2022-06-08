import React, { useState } from 'react'
import InnerOrder from './InnerOrder'

const InnerOrderContainer = () => {

    const [ isModalVisible, setIsModalVisible ] = useState(false)

    return (
        <InnerOrder
            isModalVisible={isModalVisible} 
            setIsModalVisible={setIsModalVisible} 
        />
    )
}

export default InnerOrderContainer