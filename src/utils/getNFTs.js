import Web3 from 'web3';
import ERC721ABI from '../utils/ERC721ABI.json';

const web3 = new Web3(new Web3.providers.HttpProvider('https://goerli.infura.io/v3/97c0878953c249c8bce26055b5e0ee94'));

export async function getAllNFTs(walletAddress) {
  const nfts = [];
  const contractAddresses = await web3.eth.getContractAddresses();
  for (const contractAddress of contractAddresses) {
    const contract = new web3.eth.Contract(ERC721ABI, contractAddress);
    if (!contract.methods.balanceOf) {
      continue;
    }
    const balance = await contract.methods.balanceOf(walletAddress).call();
    if (balance === 0) {
      continue;
    }
    for (let i = 0; i < balance; i++) {
      const nft = await contract.methods.tokenOfOwnerByIndex(walletAddress, i).call();
      nfts.push(nft);
    }
  }
  return nfts;
}