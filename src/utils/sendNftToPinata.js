import axios from 'axios';

export const sendNftToPinata = async (metadata) => {

    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
    //making axios POST request to Pinata ⬇️
    return axios
        .post(url, metadata, {
            headers: {
                pinata_api_key: process.env.REACT_APP_PINATA_API_KEY,
                pinata_secret_api_key: process.env.REACT_APP_PINATA_API_SECRET,
            }
        })
        .then(function (response) {

            const uriToVisit = "https://gateway.pinata.cloud/ipfs/" + response.data.IpfsHash;
            const uriToMint = "ipfs://" + response.data.IpfsHash;
            return { uriToVisit, uriToMint };

        })
        .catch(function (error) {
            console.log(error)
            return error;
        })
}