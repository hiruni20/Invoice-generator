import React from 'react'
import './Navbar.css'
import images from '../../constant/images'
import {Link} from 'react-router-dom'
import { WiDaySunny } from "react-icons/wi";

function Navbar() {
  return (
    <section className="nav-container">
        <Link to={'/'} className="nav-left"  style={{textDecoration:"none"}}>
        <img src={images.logo} alt="" />
        <h5 style={{textDecoration:"none"}}>Invoice-Generator</h5>
        </Link>
        <div className='nav-midle'>
            <div className='nav-links'>
            <div className='nav-items'>
                <div>Help</div>
            </div>
            <div className='nav-items'>
                <div>History</div>
            </div>
            <div className='nav-items'>
                <div>Invoicing guide</div>
            </div>
            </div>

        </div>
        <div className='nav-right'>
            <div className='nav-items'>
            <WiDaySunny style={{ fontSize: '1.6em', marginTop:'7px' }} />
            </div>
            <div className='nav-buttons'>
                <button style={{backgroundColor:'white', color:'rgb(69, 67, 67)' }}>Sign in</button>
                <button>Sign up</button>
            </div>
        
        </div>
    </section>
  )
}

export default Navbar
