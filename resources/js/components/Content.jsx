import React from 'react'
import {  Route, Routes } from 'react-router-dom'
import Dashboard from './page/DashBoard'
import Admin from './page/Admin'
import Index from './partners/Index'
import Create from './partners/Create'
import CreateCms from './cms/CreateCms'
import Cms from './cms/cms'
import AddPageFields from './cms/AddPageFields'


export default function Content() {
  return (
    <Routes>
        <Route exact path="/" element={<Dashboard/>}/>
        <Route exact path="/partner" element={<Index/>}/>
        <Route exact path="/partner/create" element={<Create/>}/>
        <Route exact path="/cms" element={<Cms/>}/>
        <Route exact path="/cms/create" element={<CreateCms/>}/>
        <Route exact path="/cms/pageFileds" element={<AddPageFields/>}/>
    </Routes>
  )
}
