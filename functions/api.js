const serverless = require('serverless-http');
const Moralis = require('moralis').default;
const express = require('express');
const cors = require('cors');

const { EvmChain } = require('@moralisweb3/common-evm-utils');
const { response } = require('express');

const app = express();

// allow access to React app domain
app.use(
    cors({
        origin: 'https://main--spiffy-puppy-a66c52.netlify.app/',
        credentials: true,
    })
);

const MORALIS_API_KEY = 'B23o2RvkbaPp28e6TardbHQFyed6aXS7fBMECKjLUD7UCQvrGZeg8FW52Ac8gHSF';

app.get('/balances/:address', async (req, res) => {
    try {

        const address = req.params.address;

        const chain = EvmChain.GOERLI;

        const data = await Moralis.EvmApi.nft.getWalletNFTs({
            address,
            chain,
            normalizeMetadata: true,
        });
        res.json(data);
        console.log(data?.result);
    } catch (e) {
        console.error(e);
    }
});

// wrap the Express app with serverless-http to create a handler function
const handler = serverless(app);

// export the handler function for use as a serverless function
module.exports.handler = async (event, context) => {
  const result = await handler(event, context);
  return result;
};
