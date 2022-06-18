import React, { useState } from 'react'
import OneProduct from './OneProduct'

const OneProductContainer = () => {

    const [ menu, setMenu ] = useState(false)
    const [ isModalVisible, setIsModalVisible ] = useState(false)
    
    return (
        <OneProduct
            menu={menu}
            setMenu={setMenu}
            isModalVisible={isModalVisible} 
            setIsModalVisible={setIsModalVisible}
        />
    )
}

export default OneProductContainer