import React, { useState, useEffect } from 'react'
import axios from 'axios'

import { KuryerMoney } from './KuryerMoney'

const KuryerMoneyContainer = () => {

    const [ h2, setH2 ] = useState('active')
    const [ orderMenu, setOrderMenu ] = useState(false)
    const [ leftNames, setLeftNames ] = useState(false)

    const [ cash, setCash ] = useState(0)
    const [ cards, setCards ] = useState([])

    const getCash = () => {
        axios
            .get('/api/cheque/cash', {
                headers: { "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user")).token },
            })
            .then(({data}) => {
                setCash(data.chequeCash.length ? data.chequeCash[0].count : 0)
            })
    }

    const getCashCards = () => {
        axios
            .get('/api/cheque/cashCard', {
                headers: { "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user")).token },
            })
            .then(({data}) => {
                setCards(data.chequeCard)
            })
    }

    const giveMoneyToManager = () => {
        let cheques = cards.map(card => card._id)
        cards.length && (
            axios  
                .post('/api/process/cour', { cheques }, {
                    headers: { "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user")).token }
                })
                .then(() => {
                    getCash()
                    getCashCards()
                })
        ) 
    }

    useEffect(() => {
        getCash()
        getCashCards()
    }, [])

    return (
        <KuryerMoney 
            h2={h2} 
            setH2={setH2} 
            cards={ cards }
            cash={ cash }
            orderMenu={orderMenu}
            setOrderMenu={setOrderMenu}
            setLeftNames={setLeftNames}
            leftNames={leftNames}
            giveMoneyToManager={ giveMoneyToManager }
        />
    )
}

export default KuryerMoneyContainer