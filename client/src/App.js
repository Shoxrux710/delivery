import React, { useState } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { useSelector } from 'react-redux'
import { ToastContainer } from "react-toastify";
import LoginContainer from './login/LoginContainer'
import AdminHomeContainer from './admin/admin-home/AdminHomeContainer'
import AgentHomeContainer from './agent/agent-home/AgentHomeContainer'
import ManagerHomeContainer from './manager/manager-home/ManagerHomeContainer'
import KuryerHomeContainer from './kuryer/kuryer-home/KuryerHomeContainer'
import AllManagersContainer from './admin/managers/AllManagersContainer'
import AllAgentsContainer from './admin/agents/AllAgentsContainer'
import AllKuryersContainer from './admin/kuryers/AllKuryersContainer'
import AllAgentsInManegerContainer from './manager/agents/AllAgentsInManegerContainer'
import AllKuryersInManagerContainer from './manager/kuryers/AllKuryersInManagerContainer'
import AllAdminsContainer from './admin/all-admins/AllAdminsContainer'
import KuryerMoneyContainer from './kuryer/kuryer-money/KuryerMoneyContainer'
import InnerOrderContainer from './kuryer/inner-order/InnerOrderContainer'
import AgentProfileContainer from './agent/agent-profile/AgentProfileContainer'
import InnerOrderAgentContainer from './agent/inner-order/InnerOrderAgentContainer'
import AgentDebtContainer from './agent/agent-debt/AgentDebtContainer'
import ManagerDebtContainer from './manager/manager-debt/ManagerDebtContainer';
import InnerDebtContainer from './manager/inner-debt/InnerDebtContainer';
import AllManagerMoneyContainer from './manager/all-manager-money/AllManagerMoneyContainer';
import AllAdminMoneyContainer from './admin/all-admin-money/AllAdminMoneyContainer';
import AddProductContainer from './admin/add-product/AddProductContainer';

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
      {
        role === 'super-admin' ? (
          <Route path='/all-admins' element={<AllAdminsContainer />} />
        ) : ''
      }
      <Route path='/all-managers' element={<AllManagersContainer />} />
      <Route path='/all-agents' element={<AllAgentsContainer />} />
      <Route path='/all-couriers' element={<AllKuryersContainer />} />
      <Route path='/all-money' element={<AllAdminMoneyContainer />} />
      <Route path='/add-product' element={<AddProductContainer />} />
    </Routes>
  )

  const managerRoleRoutes = (
    <Routes>
      <Route path='/' element={<ManagerHomeContainer />} />
      <Route path='/all-agents' element={<AllAgentsInManegerContainer />} />
      <Route path='/all-couriers' element={<AllKuryersInManagerContainer />} />
      <Route path='/all-money' element={<AllManagerMoneyContainer />} />
      <Route path='/debt' element={<ManagerDebtContainer />} />
      <Route path='/debt/:id' element={<InnerDebtContainer />} />
    </Routes>
  )

  const agentRoleRoutes = (
    <Routes>
      <Route path='/' element={<AgentHomeContainer />} />
      <Route path='/profile' element={<AgentProfileContainer />} />
      <Route path='/profile/order/:id' element={<InnerOrderAgentContainer />} />
      <Route path='/profile/debt' element={<AgentDebtContainer />} />
    </Routes>
  )

  const kuryerRoleRoutes = (
    <Routes>
      <Route path='/' element={<KuryerHomeContainer />} />
      <Route path='/money' element={<KuryerMoneyContainer />} />
      <Route path='/order/:id' element={<InnerOrderContainer />} />
    </Routes>
  )

  const isAdminRoleRoutes = role === 'admin' || role === 'super-admin' ? adminRoleRoutes : null
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