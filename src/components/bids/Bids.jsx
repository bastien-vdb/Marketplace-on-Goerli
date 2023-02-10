import React, { useContext } from 'react'
import './bids.css'
import { AiFillHeart } from "react-icons/ai";
import { Link } from 'react-router-dom';
import { GetNftsContext } from '../../hooks/GetNfts';

const BidCard = ({ imgSrc, title, price, likes = '0', linkTo = '/', allInfo }) => {

  const { setNftSelected } = useContext(GetNftsContext);

  const handleSelectNft = (allInfo) => {
    setNftSelected(allInfo);
  }

  return (
    <div className="card-column">
      <div className="bids-card">
        <div className="bids-card-top">
          <img src={imgSrc} alt="" />
          <Link onClick={() => handleSelectNft(allInfo)} to={`/item/${linkTo}`}>
            <p className="bids-title">{title}</p>
          </Link>
        </div>
        <div className="bids-card-bottom">
          <p>{price} <span>ETH</span></p>
          <p> <AiFillHeart /> {likes}</p>
        </div>
      </div>
    </div>
  )
}

const Bids = ({ title, listings }) => {

  return (
    <div className='bids section__padding'>
      <div className="bids-container">
        <div className="bids-container-text">
          <h1>{title}</h1>
        </div>
        <div className="bids-container-card">
          {listings.map(bid => (
            <BidCard
              key={bid.id}
              imgSrc={bid.asset.image}
              title={bid.asset.name}
              // price={bid.price}
              // likes={bid.likes}
              linkTo={bid.asset.id}
              allInfo={bid}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Bids;