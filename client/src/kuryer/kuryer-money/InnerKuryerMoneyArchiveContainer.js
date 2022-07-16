import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import InnerKuryerMoneyArchive from './InnerKuryerMoneyArchive'

const InnerKuryerMoneyArchiveContainer = () => {
    const { id } = useParams()

    const [ cards, setCards ] = useState([])
    const getCards = () => {
        axios
            .get('/api/processDate/eachCour', {
                params: { id },
                headers: { "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user")).token }
            })
            .then(({ data }) => {
                data.eachProcess && console.log(data.eachProcess)
                data.eachProcess && setCards(data.eachProcess)
            })
    }

    const [ price, setPrice ] = useState(0)
    const getPrice = () => {
        axios
        .get('/api/processDate/eachCourPrice', {
            params: { id },
            headers: { "Authorization": "Bearer " + JSON.parse(localStorage.getItem("user")).token }
        })
        .then(({ data }) => {
            data.eachPrice && console.log(data.eachPrice[0].count)
            data.eachPrice && setPrice(data.eachPrice[0].count)
        })
    }

    useEffect(() => {
        getCards()
        getPrice()
    }, [])


    return (
        <InnerKuryerMoneyArchive
            price={ price }
            cards={ cards }
        />
    )
}

export default InnerKuryerMoneyArchiveContainer