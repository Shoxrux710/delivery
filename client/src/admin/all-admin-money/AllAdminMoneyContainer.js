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
            .get('/api/processDate/adminAsset', {
                headers: { "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user")).token }
            })
            .then(({ data }) => {
                console.log(data)
                setActiveCards(data.adminAsset)
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
            .put('/api/processManager/adminIn', {}, {
                headers: { "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user")).token },
                params: { id: processId }
            })
            .then(() => {
                getCash()
                getCards()
            })
    }

    const finishProcess = () => {
        if(activeCards.length) {
            const processes = activeCards.map(el => el._id)
    
            axios
                .post('/api/processAdmin/admin', {
                    processManagers: processes
                }, {
                    headers: { "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user")).token }
                })
                .then(() => {
                    getActiveCards() 
                })
        }
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
            finishProcess = { finishProcess }
            getActiveCards = { getActiveCards }
        />
    )
}

export default AllAdminMoneyContainer