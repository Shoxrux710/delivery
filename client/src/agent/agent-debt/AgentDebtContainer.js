import React, { useState, useEffect } from 'react'
import axios from 'axios'

import AgentDebt from './AgentDebt'

const AgentDebtContainer = () => {
    
    
    const [ debt, setDebt ] = useState(0)
    const getDebt = () => {
        axios
            .get('/api/cheque/debt', {
                headers: { "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user")).token },
            })
            .then(({data}) => {
                setDebt(data.chequeDebt[0].count)
            })
    }

    const [ debtCards, setDebtCards ] = useState([])
    const getDebtCards = () => {
        axios
            .get('/api/cheque/debtCard', {
                headers: { "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user")).token },
            })
            .then(({data}) => {
                console.log(data);
                setDebtCards(data.chequeAll)
            })
    }

    useEffect(() => {
        getDebt()
        getDebtCards()
    }, [])

    return (
        <AgentDebt 
            debt={ debt }
            cards={ debtCards }
        />
    )
}

export default AgentDebtContainer