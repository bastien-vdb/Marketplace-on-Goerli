import React, { useEffect, useState } from 'react';
import { useAddress, useContract } from '@thirdweb-dev/react';
import axios from 'axios';
import './myitems.css'
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase-config';
import BigNumber from 'bignumber.js';
import questionMark from '../../assets/questionMark.png';

function MyItems(props) {

    const address = useAddress();
    const { contract } = useContract("0xfDfD9b10F8d7c870605996F6726F48E79F14cf4a", "marketplace");
    const NATIVE_TOKEN_ADDRESS = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";

    const [price, setPrice] = useState(0);

    const [nftsOwned, setNftsOwned] = useState([]);
    const [transactions, setTransactions] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        axios(`https://servermkt.onrender.com/balances/${address}`).then(({ data }) => {
            setNftsOwned(data.result);
        });
    }, [transactions, address]);

    useEffect(() => {
        if (transactions) {
            alert('Listing created successfully');
        }
    }, [transactions]);


    const handleCreateListing = async (tokenAddress, tokenId) => {
        if (price) {
            setLoading(true);
            // Data of the auction you want to create
            const auction = {
                // address of the contract the asset you want to list is on
                assetContractAddress: tokenAddress,
                // token ID of the asset you want to list
                tokenId: tokenId,
                // when should the listing open up for offers
                startTimestamp: new Date(),
                // how long the listing will be open for
                listingDurationInSeconds: 86400,
                // how many of the asset you want to list
                quantity: 1,
                // address of the currency contract that will be used to pay for the listing
                currencyContractAddress: NATIVE_TOKEN_ADDRESS,
                // how much people would have to bid to instantly buy the asset
                buyoutPricePerToken: price,
                // the minimum bid that will be accepted for the token
                reservePricePerToken: "0.01",
            }


            const tx = await contract.auction.createListing(auction);
            const receipt = tx.receipt; // the transaction receipt
            const listingIdBN = tx.id; // the id of the newly created listing
            const listingId = new BigNumber(listingIdBN._hex).toString();
            setTransactions(receipt);
            setLoading(false);

            //* Add listing to firebase
            try {
                await addDoc(collection(db, "listings"), {
                    listingId: listingId,
                    tokenId: tokenId,
                    tokenAddress: tokenAddress,
                    price: price,
                    seller: address,
                    status: 'active',
                    createdAt: new Date(),
                    userName: localStorage.getItem('name'),
                    userEmail: localStorage.getItem('email'),
                    userPpUrl: localStorage.getItem('ppUrl'),
                    likes: 0
                });
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }
        else {
            alert('Please enter a price');
        }
    }


    return (
        <>
            {!loading ? <div className='text-white '>
                {address ? <h1 className='my-20 m-auto w-fit text-4xl font-bold'>Your wallet</h1> : <h1 className='my-20 m-auto w-fit text-4xl font-bold'>Please connect your wallet</h1>}
                <div className='mx-20'>
                    {nftsOwned ? nftsOwned.map((e, key) => {

                        const tokenAddress = e.token_address;
                        const tokenId = e.token_id;

                        const url = e.normalized_metadata.image;
                        let urlHttps = '';
                        if (url) {
                            const idUrl = url?.slice(7);
                            urlHttps = 'https://gateway.pinata.cloud/ipfs/' + idUrl;
                        }
                        else {
                            urlHttps = questionMark;
                        }

                        return (
                            <div key={key}>
                                <div className="card-column">
                                    <div className="bids-card hover:scale-110 transition">
                                        <div className="bids-card-top">
                                            <img className='w-[600px] h-[300px] object-cover' src={urlHttps} alt={e.name} />
                                        </div>
                                        <div className="bids-card-bottom my-6 flex">
                                            <input className='rounded p-2 text-black w-20' onChange={(e) => setPrice(e.target.value)} type='number' placeholder='Price' />
                                            <button onClick={() => handleCreateListing(tokenAddress, tokenId)} className='bg-red-500 hover:bg-blue-700 text-white text-sm font-bold py-2 px-4 rounded'>
                                                Create Listing
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                        :
                        <div className='text-white '>
                            <h1 className='my-20 m-auto w-fit text-4xl font-bold'>No NFTs found</h1>
                        </div>
                    }
                </div>
            </div>
                :
                <div className='text-white '>
                    <h1 className='my-20 m-auto w-fit text-4xl font-bold'>Please wait...</h1>
                </div>
            }
        </>
    );
}

export default MyItems;