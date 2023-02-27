import React, { useState } from 'react'
import './bids.css'
import { AiFillHeart } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { query, collection, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase-config';

const BidCard = ({ imgSrc, title, price, itemId, allInfo }) => {

  const [likes, setLikes] = useState(0);

  const queryLikes = async () => {
    const q = query(collection(db, 'listings'), where('listingId', '==', itemId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setLikes(doc.data().likes);
    });
  }

  queryLikes();

  return (
    <>
      <div className='w-[300px] h-fit rounded-2xl bg-gray-700 p-6'>
        <div className='flex flex-col justify-center items-center'>
          <img src={imgSrc} alt='' />
          <Link to={`/item/${itemId}`}>
            <p className='text-white text-2xl uppercase'>{title}</p>
          </Link>
        </div>
        <div className='text-2xl flex justify-around items-center mt-8'>
          <div className='text-red-500 flex flex-col justify-center items-center'>
            <p>{price} <span>ETH</span></p>
          </div>
          <div className='flex justify-center items-center text-pink-600 gap-1'>
            <p>{likes ? likes : 0}</p>
            <AiFillHeart />
          </div>
        </div>
      </div>
    </>
  )
}

const Bids = ({ title, listings }) => {

  return (
    <div className='bids section__padding'>
      <div className="bids-container-text">
        <h1>{title}</h1>
      </div>
      <div className="bids-container-card flex gap-10 flex-wrap">
        {listings && listings.map(bid => {
          return (
            <BidCard
              key={bid.id}
              itemId={bid.id}
              imgSrc={bid.asset.image}
              title={bid.asset.name}
              price={bid.buyoutCurrencyValuePerToken.displayValue}
              linkTo={bid.asset.id}
              allInfo={bid}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Bids;