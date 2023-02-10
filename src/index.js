import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import GetNftsProvider from './hooks/GetNfts';


ReactDOM.render(
  <BrowserRouter>
    <ThirdwebProvider desiredChainId={ChainId.Goerli}>
      <GetNftsProvider>
        <App />
      </GetNftsProvider>
    </ThirdwebProvider>
  </BrowserRouter>,
  document.getElementById('root')
);

