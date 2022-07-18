import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AllAdminMoney from './AllAdminMoney'

const AllAdminMoneyContainer = () => {

    const [ h2, setH2 ] = useState('confirm')

    const [ cash, setCash ] = useState(0)
    const getCash = () => {
        axios
            .get('/api/processDate/adminSumm', {
                headers: { "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user")).token },
            })
            .then(({data}) => {
                console.log(data)
                setCash(data.adminSumm.length ? data.adminSumm[0].cash : 0)
            })
    }

    const [ cards, setCards ] = useState([])
    const getCards = () => {
        axios
            .get('/api/processDate/adminConfirm', {
                headers: { "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user")).token }
            })
            .then(({ data }) => {
                setCards(data.adminCash)
                console.log(data)
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

    const giveProcessToAdmin = () => {
        const processArr = activeCards.map(el => el.processId)

        activeCards.length && axios
            .post('/api/processManager/manager', { processId: processArr }, {
                headers: { "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user")).token }
            })
            .then(() => {
                console.log("sadas");
                getActiveCards()
            })
    }

    const rejectCard = (id) => {
        axios
            .put('/api/processDate/rejectionAdmin', {}, {
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
        <AllAdminMoney
            h2={h2}
            setH2={setH2}
            cards = { cards }
            activeCards = { activeCards }
            cash = { cash }
            rejectCard = { rejectCard }
            confirmCard = { confirmCard }
            getActiveCards = { getActiveCards }
            giveProcessToAdmin = { giveProcessToAdmin }
        />
    )
}

export default AllAdminMoneyContainer