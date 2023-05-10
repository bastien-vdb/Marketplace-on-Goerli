import React from 'react'
import './header.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Sellers from './Sellers';
import FavoritePictures from './FavoritePictures';

const Header = () => {
  return (
    <div className='header section__padding'>
      <div className='mainMessage text-sm sm:text-md m-2 text-justify text-left 2xl:px-32 2xl:mx-32 leading-10'>
        <p>"Je suis <b className='text-yellow-300'>Bastien</b>, développeur <b className='text-red-300'>React JS</b>.</p>
        <p><b className='text-red-300'>Fullstack</b> sur les bords, j'ai créé cette Marketplace avec des outils avancées telles que <b className='text-red-300'>WEB3Js</b>, <b className='text-red-300'>Firebase,</b> et<b className='text-red-300'>Express</b> pour le <b className='text-red-300'>backend</b>.</p>
        <p>Contactez-moi si vous cherchez un <b className='text-yellow-300'>développeur fun et talentueux</b> pour votre prochain projet web!"</p>
      </div>

      <div className="header-slider">
        <h1>Favorite pictures</h1>
        <FavoritePictures/>
      </div>
      <div className="header-slider">
        <h1>Top Sellers</h1>
        <Sellers/>
      </div>
    </div>
  )
}

export default Header
