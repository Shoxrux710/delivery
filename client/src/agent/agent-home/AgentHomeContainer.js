import React, { useState } from 'react'
import AgentHome from './AgentHome'

const AgentHomeContainer = () => {

    const [ h2, setH2 ] = useState('order')

    return (
        <AgentHome h2={h2} setH2={setH2} />
    )
}

export default AgentHomeContainer