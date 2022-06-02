import React, { useState } from 'react'
import AddCustomer from './AddCustomer'

const AddCustomerContainer = (props) => {

    const { setIsModalVisible, isModalVisible } = props
    const [ image, setImage ] = useState(null)
    const [ imageFileUrl, setImageFileUrl ] = useState()

    const getUrl = (e) => {
        const files = Array.from(e.target.files);
        setImageFileUrl(URL.createObjectURL(files[0]));
        setImage(e.target.files);
    }

    return (
        <AddCustomer 
            isModalVisible={isModalVisible} 
            setIsModalVisible={setIsModalVisible} 
            image={image}
            imageFileUrl={imageFileUrl}
            getUrl={getUrl}
        />
    )
}

export default AddCustomerContainer