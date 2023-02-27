import React from 'react'
import './header.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import seller1 from '../../assets/seller1.jpg'
import seller2 from '../../assets/seller2.png'
import seller3 from '../../assets/seller3.png'
import seller4 from '../../assets/seller4.png'
import seller5 from '../../assets/seller5.png'
import seller6 from '../../assets/seller6.jpg'
import verify from '../../assets/verify.png'
import coin from '../../assets/coin.png'
import bannerMKP from '../../assets/bannerMKP.png'
import { Link } from 'react-router-dom';
const Header = () => {
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1160,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          swipeToSlide: true,
        }
      },
      {
        breakpoint: 950,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          swipeToSlide: true,
        }
      },
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        }
      },
      {
        breakpoint: 550,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 470,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          variableWidth: true,
        }
      }
    ]
  };
  return (
    <div className='header section__padding'>
      <div className='mainMessage text-sm sm:text-md m-2 text-justify text-left 2xl:px-32 2xl:mx-32 leading-10'>
        <p>"Bonjour, je suis <b className='text-yellow-300'>Bastien</b>, développeur web JS spécialisé dans les interfaces utilisateur modernes et fonctionnelles avec <b className='text-red-300'>React</b>.</p>
        <p><b className='text-red-300'>Fullstack</b> sur les bords, j'ai créé cette Marketplace avec des technologies avancées telles que le SDK <b className='text-red-300'>WEB 3.0 js</b>, <b className='text-red-300'>Firebase</b> et <b className='text-red-300'>Express</b> pour le <b className='text-red-300'>backend</b>.</p>
        <p>Contactez-moi si vous cherchez un <b className='text-yellow-300'>développeur fun et talentueux</b> pour votre prochain projet web!"</p>
      </div>
      {/* <div className='flex flex-wrap justify-center items-center gap-20'>
        <img className='shake-vertical w-1/2 h-72 min-w-[300px] rounded-2xl' src={bannerMKP} alt="" />
        <img className='shake-vertical w-72' src={coin} alt="" />
      </div> */}
      <div className="header-slider">
        <h1>Top Sellers</h1>
        <Slider {...settings} className='slider'>
          <div className='slider-card'>
            <p className='slider-card-number'>1</p>
            <div className="slider-img">
              <img src={seller1} alt="" />
              <img src={verify} className='verify' alt="" />
            </div>
            <Link to={`/profile/Rian`}>
              <p className='slider-card-name'>James Bond</p>
            </Link>
            <p className='slider-card-price'>5.250 <span>ETH</span></p>
          </div>
          <div className='slider-card'>
            <p className='slider-card-number'>2</p>
            <div className="slider-img">
              <img src={seller2} alt="" />
              <img src={verify} className='verify' alt="" />
            </div>
            <Link to={`/profile/Rian`}>
              <p className='slider-card-name'>Rian Leon</p>
            </Link>
            <p className='slider-card-price'>4.932 <span>ETH</span></p>
          </div>
          <div className='slider-card'>
            <p className='slider-card-number'>3</p>
            <div className="slider-img">
              <img src={seller3} alt="" />
              <img src={verify} className='verify' alt="" />
            </div>
            <Link to={`/profile/Rian`}>
              <p className='slider-card-name'>Lady Young</p>
            </Link>
            <p className='slider-card-price'>4.620 <span>ETH</span></p>
          </div>
          <div className='slider-card'>
            <p className='slider-card-number'>4</p>
            <div className="slider-img">
              <img src={seller4} alt="" />
              <img src={verify} className='verify' alt="" />
            </div>
            <Link to={`/profile/Rian`}>
              <p className='slider-card-name'>Black Glass</p>
            </Link>
            <p className='slider-card-price'>4.125 <span>ETH</span></p>
          </div>
          <div className='slider-card'>
            <p className='slider-card-number'>5</p>
            <div className="slider-img">
              <img src={seller5} alt="" />
              <img src={verify} className='verify' alt="" />
            </div>
            <Link to={`/profile/Rian`}>
              <p className='slider-card-name'>Budhiman</p>
            </Link>
            <p className='slider-card-price'>3.921 <span>ETH</span></p>
          </div>
          <div className='slider-card'>
            <p className='slider-card-number'>6</p>
            <div className="slider-img">
              <img src={seller6} alt="" />
              <img src={verify} className='verify' alt="" />
            </div>
            <Link to={`/profile/Rian`}>
              <p className='slider-card-name'>Alex</p>
            </Link>
            <p className='slider-card-price'>3.548 <span>ETH</span></p>
          </div>
        </Slider>
      </div>
    </div>
  )
}

export default Header
