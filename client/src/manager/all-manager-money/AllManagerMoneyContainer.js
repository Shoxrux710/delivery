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
                setCards(data.managerCash)
            })
    }

    const [ activeCards, setActiveCards ] = useState([])
    const getActiveCards = () => {
        axios
            .get('/api/processDate/asset', {
                headers: { "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user")).token }
            })
            .then(({ data }) => {
                console.log(data)
                setActiveCards(data.managerCashAsset)
            })
    }

    const [ archiveCards, setArchiveCards ] = useState([])
    const getArchiveCards = () => {
        axios
            .get('/api/processDate/eachManager', {
                headers: { "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user")).token }
            })
            .then(({ data }) => {
                setArchiveCards(data.eachManager)
            })
    }

    const giveProcessToAdmin = () => {
        const processArr = activeCards.map(el => el._id)

        activeCards.length && axios
            .post('/api/processManager/manager', { processDates: processArr }, {
                headers: { "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user")).token }
            })
            .then(() => {
                console.log("sadas");
                getActiveCards()
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
        getArchiveCards()
    }, [])

    return (
        <AllManagerMoney
            h2={h2}
            setH2={setH2}
            cards = { [] }
            activeCards = { activeCards }
            archiveCards = { archiveCards }
            cash = { cash }
            rejectCard = { rejectCard }
            confirmCard = { confirmCard }
            getActiveCards = { getActiveCards }
            giveProcessToAdmin = { giveProcessToAdmin }
        />
    )
}

export default AllManagerMoneyContainer