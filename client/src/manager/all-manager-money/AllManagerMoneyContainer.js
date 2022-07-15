import React, { useState, useEffect } from 'react'
import axios from 'axios'

import AllManagerMoney from './AllManagerMoney'

const AllManagerMoneyContainer = () => {

    const [ h2, setH2 ] = useState('confirm')

    const [ cash, setCash ] = useState(0)
    const getCash = () => {
        axios
            .get('/api/processDate/courSumm', {
                headers: { "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user")).token },
            })
            .then(({data}) => {
                setCash(data.processSumm.length ? data.processSumm[0].count : 0)
            })
    }

    const [ cards, setCards ] = useState([])
    const getCards = () => {
        axios
            .get('/api/processDate/confirm', {
                headers: { "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user")).token }
            })
            .then(({ data }) => {
                console.log(data.managerCash)
                setCards(data.managerCash)
            })
    }

    const rejectCard = (id) => {
        axios
            .put('/api/processDate/rejectionCour', {}, {
                headers: { "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user")).token },
                params: { id }
            })
            .then(() => {
                getCash()
                getCards()
            })
    }

    const confirmCard = (processId) => {
        axios
            .put('/api/process/managerIn', {}, {
                headers: { "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user")).token },
                params: { id: processId }
            })
            .then(() => {
                getCash()
                getCards()
            })
    }
        
    useEffect(() => {
        getCash()
        getCards()
    }, [])

    return (
        <AllManagerMoney
            h2={h2}
            setH2={setH2}
            cards = { cards }
            cash = { cash }
            rejectCard = { rejectCard }
            confirmCard = { confirmCard }
        />
    )
}

export default AllManagerMoneyContainer