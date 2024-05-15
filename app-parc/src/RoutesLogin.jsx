import React from 'react'
import { Router, Routes, Route } from 'react-router-dom';
import Login from './components/SignUp/Login';
import SignUp from './components/SignUp/SignUp';
import Forgot from './components/SignUp/Forgot';
import ResetPassword from './components/SignUp/ResetPassword';

function RoutesLogin() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/Forgot" element={<Forgot />} />
        <Route path="/ResetPassword/:id/:resetToken" element={<ResetPassword />} />
      </Routes>
    </div>
  )
}

export default RoutesLogin
/*import React from 'react'
import { Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/scenes/dashboard/index'
import Contacts from './components/scenes/contacts/index'
import Invoices from './components/scenes/invoices/index'
import Form from './components/scenes/form/index';
import Bar from './components/scenes/bar/index'
import Pie from './components/scenes/pie/index'
import Line from './components/scenes/line/index'
import FAQ from './components/scenes/faq/index';
import Calendar from './components/scenes/calendar/calendar';
import Geography from './components/scenes/geography/index'
import Team from './components/scenes/team';
function RoutesConfig() {
  return (
      <Routes>
        <Route path="/Dashboard/*" element={<Dashboard />} />
        <Route path="/Team" element={<Team />} />
        <Route path="/Contacts" element={<Contacts />} />
        <Route path="/Invoices" element={<Invoices />} />
        <Route path="/Form" element={<Form />} />
        <Route path="/Bar" element={<Bar />} />
        <Route path="/Pie" element={<Pie />} />
        <Route path="/Line" element={<Line />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/Calendar" element={<Calendar />} />
        <Route path="/Geography" element={<Geography />} />
      </Routes>
  )
}

export default RoutesConfig
*/