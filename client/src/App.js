import React, { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { useSelector } from 'react-redux'
import LoginContainer from './login/LoginContainer'
import AdminHomeContainer from './admin/admin-home/AdminHomeContainer'
import { ToastContainer } from "react-toastify";
import AgentHomeContainer from './agent/agent-home/AgentHomeContainer'
import ManagerHomeContainer from './manager/manager-home/ManagerHomeContainer'
import KuryerHomeContainer from './kuryer/kuryer-home/KuryerHomeContainer'
import AllManagersContainer from './admin/managers/AllManagersContainer'
import AllAgentsContainer from './admin/agents/AllAgentsContainer'
import AllKuryersContainer from './admin/kuryers/AllKuryersContainer'

const App = () => {

  const [ render, setRender ] = useState(false)
  const { menu } = useSelector(state => state)

  const token = JSON.parse(window.localStorage.getItem('user'))?.token
  const auth = token ? true : false
  const role = JSON.parse(window.localStorage.getItem('user'))?.position

  const loginRoutes = (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path='/login' element={<LoginContainer render={render} setRender={setRender} />} />
        <Route path="/*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  )


  const adminRoleRoutes = (
    <Routes>
      <Route path='/' element={<AdminHomeContainer />} />
      <Route path='/all-managers' element={<AllManagersContainer />} />
      <Route path='/all-agents' element={<AllAgentsContainer />} />
      <Route path='/all-couriers' element={<AllKuryersContainer />} />
    </Routes>
  )

  const managerRoleRoutes = (
    <Routes>
      <Route path='/' element={<ManagerHomeContainer />} />
    </Routes>
  )

  const agentRoleRoutes = (
    <Routes>
      <Route path='/' element={<AgentHomeContainer />} />
    </Routes>
  )

  const kuryerRoleRoutes = (
    <Routes>
      <Route path='/' element={<KuryerHomeContainer />} />
    </Routes>
  )

  const isAdminRoleRoutes = role === 'admin' ? adminRoleRoutes : null
  const isManagerRoleRoutes = role === 'manager' ? managerRoleRoutes : null
  const isAgentRoleRoutes = role === 'agent' ? agentRoleRoutes : null
  const isKuryerRoleRoutes = role === 'courier' ? kuryerRoleRoutes : null

  const authRoutes = (
    <BrowserRouter>
      <ToastContainer />
      {isAdminRoleRoutes}
      {isManagerRoleRoutes}
      {isAgentRoleRoutes}
      {isKuryerRoleRoutes}
    </BrowserRouter>
  )

  return (
    <div className={menu ? 'app-component app-component-true' : 'app-component'}>
      <div className='components-wrapper'>
        {
          auth ? authRoutes : loginRoutes
        }
      </div>
    </div>
  )
}

export default App