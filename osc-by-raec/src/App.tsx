import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Header/Navbar'
import Home from './pages/Home'
import Networking from './pages/Networking'
import Fundraising from './pages/Fundraising'
import Resources from './pages/Resources'
import Messages from './pages/Messages'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/networking" element={<Networking />} />
        <Route path="/fundraising" element={<Fundraising />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/messages" element={<Messages />} />
      </Routes>
    </div>
  )
}

export default App
