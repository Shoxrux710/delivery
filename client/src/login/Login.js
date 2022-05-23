import React from 'react'
import './login.css'

const Login = (props) => {

    const { submitHandler, username, setUsername, password, setPassword } = props

    return (
        <div className='login-component'>
            <form onSubmit={submitHandler}>
                <h1>Welcome to logo <span>delivery</span></h1>
                <div className='center'>
                    <div>
                        <label>Login</label>
                        <input 
                            type='text'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required 
                        />
                    </div>
                    <div>
                        <label>Parol</label>
                        <input 
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                    </div>
                </div>
                <button>Kirish</button>
            </form>
        </div>
    )
}

export default Login