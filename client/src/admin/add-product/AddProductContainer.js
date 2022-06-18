import React, { useState } from 'react'
import AddProduct from './AddProduct'

const AddProductContainer = () => {
    
    const [ isModalVisible, setIsModalVisible ] = useState(false)

    return (
        <AddProduct 
            isModalVisible={isModalVisible} 
            setIsModalVisible={setIsModalVisible}
        />
    )
}

export default AddProductContainer