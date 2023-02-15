import React, { createContext, useEffect, useState } from 'react';
import { useContract, useActiveListings } from '@thirdweb-dev/react';
import { collection, addDoc, getDoc, doc, getDocs, setDoc } from 'firebase/firestore';
import { db } from '../firebase-config';

export const GetNftsContext = createContext();

function GetNftsProvider({ children, listId }) {

    const { contract: marketPlaceContract } = useContract("0xfDfD9b10F8d7c870605996F6726F48E79F14cf4a", "marketplace");

    const { data: listings, isLoading, error } = useActiveListings(marketPlaceContract, { start: 0, count: 100 });

    return <GetNftsContext.Provider value={{ listings, isLoading }}>{children}</GetNftsContext.Provider>
}

export default GetNftsProvider;