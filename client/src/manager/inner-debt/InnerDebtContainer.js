import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import { formatString } from '../../utils/number'
import { getDateInMonthString } from '../../utils/date'

import InnerDebt from './InnerDebt'

const InnerDebtContainer = () => {
    const { id } = useParams()
    const { token } = JSON.parse(localStorage.getItem("user"))
    const client = localStorage.getItem("client")

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

    const [ debtCards, setDebtCards ] = useState([])
    const getDebtCardsByClient = () => {
        axios
            .get(`/api/cheque/cardPrice`, {
                params: { userId: id },
                headers: { 'Authorization': 'Bearer ' + token }
            })
            .then(({ data }) => {
                setDebtCards(data.cardPrice)
            })
    }

    const [ modalData, setModalData ] = useState(null)
    const getChequeById = (id) => {
        axios
            .get(`/api/cheque/${id}`, {
                headers: { "Authorization": 'Bearer ' + JSON.parse(localStorage.getItem('user')).token }
            })
            .then(({ data: { chequeId } }) => {
                setModalData({
                    id: chequeId.deliveryId.orderId.code,
                    date: getDateInMonthString(chequeId.date),
                    price: formatString(chequeId.deliveryId.orderId.products.reduce((price, product) => product.productId.price + price, 0)),
                    payment: formatString(chequeId.cash + chequeId.card),
                    clientName: chequeId.deliveryId.orderId.customerId.fullname,
                    clientPhone: chequeId.deliveryId.orderId.customerId.phone,
                    products: chequeId.deliveryId.orderId.products
                });
                setIsModalVisible(true)
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
            cards={ debtCards }
            client={ client ? client : "Mijoz ismi" }
            getChequeById={ getChequeById }
            modalData={ modalData }
            setModalData={ setModalData }
        />
    )
}

export default InnerDebtContainer