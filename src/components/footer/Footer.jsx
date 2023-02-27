import React from 'react'
import './footer.css'
import nftlogo from '../../assets/logo.png'
import { AiOutlineInstagram, AiOutlineTwitter, } from "react-icons/ai";
import { RiDiscordFill } from "react-icons/ri";
import { FaTelegramPlane } from "react-icons/fa";
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <div className='footer section__padding'>
      <div className="footer-links">
        <div className="footer-links_logo">
          <div>
            <img src={nftlogo} alt="logo" />
            <p>Bastien VDB</p>
          </div>
          <div>
            <input type="text" placeholder='Your message' />
            <button>Email Me!</button>
          </div>
        </div>
        <div className="footer-links_div">
          <h4>Bastiendeboisrolin.info</h4>
          <p><Link to='/'>Explorer</Link></p>
          <p><Link to='/Legal'>How it Works</Link></p>
        </div>
      </div>
      <div className="footer-copyright">
        <div>
          <p> © {(new Date().getFullYear())} Bastien info, All Rights Reserved</p>
        </div>
        <div>
          <AiOutlineInstagram size={25} color='white' className='footer-icon' />
          <AiOutlineTwitter size={25} color='white' className='footer-icon' />
          <RiDiscordFill size={25} color='white' className='footer-icon' />
          <FaTelegramPlane size={25} color='white' className='footer-icon' />
        </div>

      </div>
    </div>
  )
}

export default Footer
