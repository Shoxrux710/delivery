import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { KuryerMoney } from './KuryerMoney'

const KuryerMoneyContainer = () => {

    const [ h2, setH2 ] = useState('active')
    const [ orderMenu, setOrderMenu ] = useState(false)
    const [ leftNames, setLeftNames ] = useState(false)

    const [ debt, setDebt ] = useState(0)
    const [ cards, setCards ] = useState([])

    const getDebt = () => {
        axios
            .get('/api/cheque/cash', {
                headers: { "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user")).token },
            })
            .then(({data}) => {
                console.log(data)
                setCards(data.chequeCard)
            })
    }

    useEffect(() => {
        getDebt()
        
    }, [])

    return (
        <KuryerMoney 
            h2={h2} 
            setH2={setH2} 
            cards={ cards }
            orderMenu={orderMenu}
            setOrderMenu={setOrderMenu}
            setLeftNames={setLeftNames}
            leftNames={leftNames}
        />
    )
}

export default KuryerMoneyContainer