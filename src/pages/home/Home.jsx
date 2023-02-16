import React, { useContext } from 'react';
import { Bids, Header, } from '../../components';
import { GetNftsContext } from '../../hooks/GetNfts';

const Home = () => {

  const { listings, isLoading } = useContext(GetNftsContext)

  return <div>
    <Header />
    {!isLoading && <Bids title="Hot Bids" listings={listings} />}
  </div>;
};

export default Home;
