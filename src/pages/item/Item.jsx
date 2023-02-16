import React, { useEffect, useState } from 'react';
import './item.css'
import creator from '../../assets/seller2.png'
import { useContract, useListing, useMakeBid } from '@thirdweb-dev/react';
import { useParams } from 'react-router';
import ListBids from '../../components/bids/ListBids';
import { db } from '../../firebase-config';
import { updateDoc, collection, query, where, onSnapshot } from 'firebase/firestore';

const Item = () => {

  const [buyDisable, setBuyDisable] = useState(false);
  const [offers, setOffers] = useState([]);

  const { itemId } = useParams();

  const { contract: marketPlaceContract } = useContract("0xfDfD9b10F8d7c870605996F6726F48E79F14cf4a", "marketplace");
  const { data: listing } = useListing(marketPlaceContract, itemId);

  useEffect(() => {

    const viewListAuto = async () => {
      if (marketPlaceContract) {
        const offer = await marketPlaceContract.getOffers(itemId);
        console.log(offer);
        setOffers(offer);
      }
    }

    viewListAuto();
  }, [itemId, marketPlaceContract, setOffers])

  const viewList = async () => {
    if (marketPlaceContract) {
      const offer = await marketPlaceContract.getOffers(itemId);
      console.log(offer);
      setOffers(offer);
    }
  }

  const handleBuy = async () => {
    setBuyDisable(true)
    try {
      // The listing ID of the asset you want to buy
      const listingId = itemId;
      // Quantity of the asset you want to buy
      const quantityDesired = 1;
      await marketPlaceContract.buyoutListing(listingId, quantityDesired);
    }
    catch (error) {
      console.log(error)
    }
    setBuyDisable(false);
  }

  /**Create an Offer */
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const {
    mutate: makeBid,
    error,
  } = useMakeBid(marketPlaceContract);

  if (error) {
    console.error("Failed to make a bid: ", error);
  }

  const handleBid = async (offerPrice) => {
    makeBid({ listingId: itemId, bid: offerPrice }).then(res => {
      viewList();
    })
  }

  const handleLike = async () => {
    console.log('halo ah')
    const collectionRef = collection(db, "listings");
    const queryRef = query(collectionRef, where("listingId", "==", itemId));
    const unsubscribe = onSnapshot(queryRef, (querySnapshot) => {

      querySnapshot.forEach((doc) => {
        console.log(doc.data().likes)
        updateDoc(doc.ref, {
          likes: doc.data().likes + 1
        })
      })
      unsubscribe(); // unsubscribe from the listener after updating the document
    }
    )
  }

  return (
    <div className='item section__padding'>
      <div className="item-image">
        {listing && <img className='max-w-[500px] object-cover' src={listing.asset.image} alt={listing.asset.name} />}
      </div>
      <div className="item-content">
        <div className="item-content-title">
          <div className='flex gap-6'>
            <h1>{listing && listing.asset.name}</h1>
            <button onClick={handleLike}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="font-bold cursor-pointer text-white w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
              </svg>
            </button>
          </div>

        </div>
        <div className="item-content-creator">
          <div><p>Owner: {listing && listing.sellerAddress}</p></div>
          <div>
            <img src={creator} alt="creator" />
          </div>
        </div>
        <div className="item-content-detail">
          <p>{listing && listing.asset.description}</p>
        </div>
        {listing &&
          <div className="item-content-buy">
            <button disabled={buyDisable} style={{ background: buyDisable && 'gray', cursor: buyDisable && 'not-allowed' }} className="primary-btn" onClick={handleBuy}>Buy For {listing.buyoutCurrencyValuePerToken.displayValue > 0 ? <span>{listing.buyoutCurrencyValuePerToken.displayValue} ETH</span> : 'Free'}</button>
            <button disabled={buyDisable} style={{ background: buyDisable && 'gray', cursor: buyDisable && 'not-allowed' }} className="secondary-btn" onClick={toggleModal}>Make Offer</button>
            <Modal toggleModal={toggleModal} isOpen={isOpen} handleBid={handleBid} />
          </div>
        }
        <ListBids offers={offers} />
      </div>
    </div>
  )
};

const Modal = ({ toggleModal, isOpen, handleBid }) => {

  const [bidPrice, setBidPrice] = useState(0);

  return (
    <>
      <div style={{ display: isOpen ? 'block' : 'none' }} className="bg-slate-800 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0">
        <div className="bg-white px-16 py-14 rounded-md text-center">
          <h1 className="text-xl mb-4 font-bold text-slate-500">Do you Want Delete</h1>
          <input onChange={(e) => setBidPrice(e.target.value)} type='number' className='border' placeholder='offer' />
          <button className="bg-red-500 px-4 py-2 rounded-md text-md text-white" onClick={toggleModal}>Cancel</button>
          <button className="bg-indigo-500 px-7 py-2 ml-2 rounded-md text-md text-white font-semibold" onClick={() => handleBid(bidPrice)}>Offer</button>
        </div>
      </div>
    </>
  );
};

export default Item;
