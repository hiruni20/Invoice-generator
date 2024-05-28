import React from 'react'
import Navbar from './components/Navbar/Navbar'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import InvoiceTemp from './components/InvoiceTemp/InvoiceTemp'

function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<InvoiceTemp/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App

