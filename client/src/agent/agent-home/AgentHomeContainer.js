import React, { useState } from 'react'
import AgentHome from './AgentHome'

const AgentHomeContainer = () => {

    const [ h2, setH2 ] = useState('order')
    const [ isModalVisible, setIsModalVisible ] = useState(false)

    return (
        <AgentHome h2={h2} setH2={setH2} isModalVisible={isModalVisible} setIsModalVisible={setIsModalVisible} />
    )
}

export default AgentHomeContainer