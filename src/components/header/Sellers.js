import React from 'react';
import Slider from "react-slick";
import seller1 from '../../assets/seller1.jpg'
import seller2 from '../../assets/seller2.png'
import seller3 from '../../assets/seller3.png'
import seller4 from '../../assets/seller4.png'
import seller5 from '../../assets/seller5.png'
import seller6 from '../../assets/seller6.jpg'
import verify from '../../assets/verify.png';
import { settings } from '../../utils/slidersSettings';
import { Link } from 'react-router-dom';

function Sellers(props) {
    return (
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
    );
}

export default Sellers;