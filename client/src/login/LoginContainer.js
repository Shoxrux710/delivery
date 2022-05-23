import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Login from './Login'

const LoginContainer = (props) => {

    const { render, setRender } = props

    const navigate = useNavigate()

    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')

    const submitHandler = (e) => {
        e.preventDefault()

        axios.post('/api/user/login', { login: username, password })
        .then(res => {
            window.localStorage.setItem('user', JSON.stringify(res.data))
            navigate('/')
            setRender(!render)
            toast.success("Muvaffaqqiyatli!", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        }).catch(err => {
            console.log(err)
            toast.error("Error!", {
                position: toast.POSITION.BOTTOM_RIGHT
            });
        })

    }

    return (
        <Login submitHandler={submitHandler} username={username} setUsername={setUsername} password={password} setPassword={setPassword} />
    )
}

export default LoginContainer