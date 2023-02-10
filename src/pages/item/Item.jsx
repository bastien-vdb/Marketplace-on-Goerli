import React, { useContext, useState } from 'react';
import './item.css'
import creator from '../../assets/seller2.png'
import { GetNftsContext } from '../../hooks/GetNfts';
import { useContract, useSDK } from '@thirdweb-dev/react';

import { ChainId, NATIVE_TOKENS } from "@thirdweb-dev/sdk";


const Item = () => {

  const { nftSelected } = useContext(GetNftsContext);
  const [buyDisable, setBuyDisable] = useState(false);

  console.log(nftSelected);

  const { contract: marketPlaceContract } = useContract("0xfDfD9b10F8d7c870605996F6726F48E79F14cf4a", "marketplace");

  const handleBuy = async () => {
    console.log('clicked');
    setBuyDisable(true)
    try {
      // The listing ID of the asset you want to buy
      const listingId = nftSelected.id;
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

  const sdk = useSDK();

  // The listing ID of the asset you want to offer on
  const listingId = nftSelected.id;
  // The price you are willing to offer per token
  const pricePerToken = 1;
  // The quantity of tokens you want to receive for this offer
  const quantity = 1;
  // The address of the currency you are making the offer in (must be ERC-20)
  const currencyContractAddress = NATIVE_TOKENS[ChainId.Goerli].wrapped.address

  const handleOffer = async () => {
    await marketPlaceContract.direct.makeOffer(
      listingId,
      quantity,
      currencyContractAddress,
      pricePerToken
    );
  }

  return (
    <div className='item section__padding'>
      <div className="item-image">
        {nftSelected && <img src={nftSelected.asset.image} alt={nftSelected.asset.name} />}
      </div>
      <div className="item-content">
        <div className="item-content-title">
          <h1>{nftSelected && nftSelected.asset.name}</h1>
          <p>From <span>4.5 ETH</span> ‧ 20 of 25 available</p>
        </div>
        <div className="item-content-creator">
          <div><p>Owner: {nftSelected && nftSelected.sellerAddress}</p></div>
          <div>
            <img src={creator} alt="creator" />
          </div>
        </div>
        <div className="item-content-detail">
          <p>{nftSelected && nftSelected.asset.description}</p>
        </div>
        <div className="item-content-buy">
          <button disabled={buyDisable} style={{ background: buyDisable && 'gray', cursor: buyDisable && 'not-allowed' }} className="primary-btn" onClick={handleBuy}>Buy For {nftSelected.buyoutCurrencyValuePerToken.displayValue > 0 ? <span>{nftSelected.buyoutCurrencyValuePerToken.displayValue} ETH</span> : 'Free'}</button>
          <button disabled={buyDisable} style={{ background: buyDisable && 'gray', cursor: buyDisable && 'not-allowed' }} className="secondary-btn" onClick={() => { }}>Make Offer</button>
          <Modal toggleModal={toggleModal} isOpen={isOpen} />
        </div>
      </div>
    </div>
  )
};

const Modal = ({ children, buttonText, title, toggleModal, isOpen }) => {



  return (
    <>
      <button onClick={toggleModal}>{buttonText}</button>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <header className="modal-header">
              <h3>{title}</h3>
              <button onClick={toggleModal}>X</button>
            </header>
            <div className="modal-body">{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default Item;
