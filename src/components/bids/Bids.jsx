import React, { useEffect, useState } from 'react'
import './bids.css'
import { AiFillHeart } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { query, collection, where, getDocs, addDoc } from 'firebase/firestore';
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
    <div className="card-column">
      <div className="bids-card">
        <div className="bids-card-top">
          <img className='w-[600px] h-[300px] object-cover hover:scale-110 transition' src={imgSrc} alt="" />
          <Link to={`/item/${itemId}`}>
            <p className="bids-title">{title}</p>
          </Link>
        </div>
        <div className='flex relative'>
          <div className="bids-card-bottom">
            <p className='text-xl font-bold flex justify-center items-center'>{price} <span>ETH</span></p>
          </div>
          <div className='flex justify-center items-center text-pink-600 text-xl font-bold mx-10'>{likes ? likes : 0} <AiFillHeart /></div>
        </div>
      </div>
    </div>
  )
}

const Bids = ({ title, listings }) => {

  // const [like, setLike] = useState(0);

  // //* Get likes from firebase/firestore with the itemId
  // useEffect(() => {
  //   listings && listings.map(bid => {
  //     const queryLikes = async () => {
  //       const q = query(collection(db, 'listings'), where('listingId', '==', bid.id));
  //       const querySnapshot = await getDocs(q);
  //       querySnapshot.forEach((doc) => {
  //         console.log(doc.id, ' => ', doc.data().likes);
  //         setLike(doc.data().likes);
  //       });
  //     }
  //     queryLikes();
  //   })

  // }, [listings])

  return (
    <div className='bids section__padding'>
      <div className="bids-container">
        <div className="bids-container-text">
          <h1>{title}</h1>
        </div>
        <div className="bids-container-card">
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
    </div>
  )
}

export default Bids;