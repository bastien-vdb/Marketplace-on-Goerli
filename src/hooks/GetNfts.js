import React, { createContext } from 'react';
import { useContract, useActiveListings } from '@thirdweb-dev/react';

export const GetNftsContext = createContext();

function GetNftsProvider({ children }) {

    const { contract: marketPlaceContract } = useContract("0xfDfD9b10F8d7c870605996F6726F48E79F14cf4a", "marketplace");

    const { data: listings, isLoading } = useActiveListings(marketPlaceContract, { start: 0, count: 100 });


    return <GetNftsContext.Provider value={{ listings, isLoading }}>{children}</GetNftsContext.Provider>
}

export default GetNftsProvider;