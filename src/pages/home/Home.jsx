import React, { useContext, useEffect } from 'react';
import { Bids, Header, } from '../../components';
import { GetNftsContext } from '../../hooks/GetNfts';

const Home = () => {

  const { listings, isLoading } = useContext(GetNftsContext)

  useEffect(() => {
    console.log(listings);
  }, [])


  return <div>

    <Header />

    {!isLoading && <Bids title="Hot Bids" listings={listings} />}
  </div>;
};

export default Home;
