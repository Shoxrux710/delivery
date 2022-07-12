import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import InnerDebt from './InnerDebt'

const InnerDebtContainer = () => {
    const { id } = useParams()
    const { token } = JSON.parse(localStorage.getItem("user"))

    const [ orderMenu, setOrderMenu ] = useState(false)
    const [ leftNames, setLeftNames ] = useState(false)
    const [ isModalVisible, setIsModalVisible ] = useState(false)


    const [ price, setPrice ] = useState({ card: 0, cash: 0, debt: 0 })
    const getDebtByClient = () => {
        axios
            .get(`/api/cheque/userPrice`, {
                params: { userId: id },
                headers: { 'Authorization': 'Bearer ' + token }
            })
            .then(({ data }) => {
                setPrice(data.userPrice[0])
            })
    }

    const getDebtCardsByClient = () => {
        axios
            .get(`/api/cheque/cardPrice`, {
                params: { userId: id },
                headers: { 'Authorization': 'Bearer ' + token }
            })
            .then(({ data }) => {
                console.log(data.cardPrice[0]);
                // setPrice(data.userPrice[0])
            })
    }

    useEffect(() => {
        getDebtByClient()
        getDebtCardsByClient()
        // eslint-disable-next-line
    }, [])

    return (
        <InnerDebt
            orderMenu={orderMenu}
            setOrderMenu={setOrderMenu}
            leftNames={leftNames}
            setLeftNames={setLeftNames}
            isModalVisible={isModalVisible}
            setIsModalVisible={setIsModalVisible}
            price={ price }
        />
    )
}

export default InnerDebtContainer