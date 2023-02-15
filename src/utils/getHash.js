import axios from 'axios';

export const getHash = async (picture) => {
    const formData = new FormData();
    formData.append('file', picture);

    try {
        const resFile = await axios({
            method: "post",
            url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
            data: formData,
            headers: {
                'pinata_api_key': `${process.env.REACT_APP_PINATA_API_KEY}`,
                'pinata_secret_api_key': `${process.env.REACT_APP_PINATA_API_SECRET}`,
                "Content-Type": "multipart/form-data"
            },
        });
        const hashUrl =  "https://gateway.pinata.cloud/ipfs/" + resFile.data.IpfsHash;
        const hashIpfs =  `ipfs://${resFile.data.IpfsHash}`;
        return {hashUrl, hashIpfs};
    }
    catch (error) {
        console.log('Erreur lors de l upload');
        console.log(error);
        return error;
    }
}