import React from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import Content from '../Content'
import Footer from './Footer'
import { BrowserRouter } from 'react-router-dom'

export default function Layout() {
  return (
    // <BrowserRouter>
     <div class="app-wrapper"> 
        <Header/>
        <Sidebar/>
        <Content/>
        <Footer/> 
     </div> 
    //  </BrowserRouter>
  )
}
