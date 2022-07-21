import React, { useState, useEffect } from 'react'
import axios from 'axios'
import AllAdminMoney from './AllAdminMoney'

const AllAdminMoneyContainer = () => {

    const [ h2, setH2 ] = useState('confirm')

    const [ cash, setCash ] = useState(0)
    const getCash = () => {
        axios
            .get('/api/processManager/adminSumm', {
                headers: { "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user")).token },
            })
            .then(({data}) => {
                setCash(data.adminSumm.length ? data.adminSumm[0].cash : 0)
            })
    }

    const [ cards, setCards ] = useState([])
    const getCards = () => {
        axios
            .get('/api/processManager/adminConfirm', {
                headers: { "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user")).token }
            })
            .then(({ data }) => {
                setCards(data.adminCash)
            })
    }

    const [ archiveCards, setArchiveCards ] = useState([])
    const getArchiveCards = () => {
        axios
            .get('/api/processManager/eachAdmin', {
                headers: { "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user")).token }
            })
            .then(({ data }) => {
                setArchiveCards(data.eachAdmin)
            })
    }

    const rejectCard = (id) => {
        axios
            .put('/api/processManager/rejectionAdmin', {}, {
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

    useEffect(() => {
        getCash()
        getCards()
    }, [])

    return (
        <AllAdminMoney
            h2={h2}
            setH2={setH2}
            cards = { cards }
            cash = { cash }
            rejectCard = { rejectCard }
            confirmCard = { confirmCard }
            archiveCards = { archiveCards }
            getArchiveCards = { getArchiveCards }
        />
    )
}

export default AllAdminMoneyContainer