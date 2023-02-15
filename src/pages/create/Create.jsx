import './create.css'
import Image from '../../assets/Image.png'
import { useState, useRef, useEffect } from 'react';
import { getHash } from '../../utils/getHash';
import { sendNftToPinata } from '../../utils/sendNftToPinata';
import { useContractWrite, useAddress, useContract, MediaRenderer, useTotalCount } from '@thirdweb-dev/react';
import { Link } from 'react-router-dom';


const Create = () => {

  //to handle the file upload
  const [file, setFile] = useState(null);
  const [pictureUrl, setPictureUrl] = useState(null); //To show on our website
  const [error, setError] = useState(null);
  const [imageUrlIpfs, setImageUrlIpfs] = useState(''); //ipfs url be added to a json file and send to Pinata
  const [imageUrlUrl, setImageUrlUrl] = useState(''); //ipfs url be added to a json file and send to Pinata


  //to handle the submit form
  const nameRef = useRef();
  const descriptionRef = useRef();
  const prop1NameRef = useRef();
  const prop1DescriptionRef = useRef();
  const prop2NameRef = useRef();
  const prop2DescriptionRef = useRef();

  const [tx, setTx] = useState(null);
  const [tokenUriToVisit, setTokenUriToVisit] = useState(null);


  //connection to the Smart contract
  const { contract } = useContract("0xC2817C822957e322B9296621E0d7d7a57C10f7d2");

  const addressConnected = useAddress();

  const { mutateAsync: mintTo, isLoading, isError } = useContractWrite(contract, "mintTo");

  const handleUpload = (e) => {
    console.log(addressConnected);
    if (addressConnected !== undefined) {
      const file = e.target.files[0];
      setFile(file);
      setPictureUrl(URL.createObjectURL(file));
    }
    else {
      setError('Connect your wallet');
      alert('Connect your wallet');
    }
  }

  const handleSendPictureToIpfs = async () => {
    const { hashUrl, hashIpfs, error } = await getHash(file);
    if (!error) {
      setImageUrlIpfs(hashIpfs);
      setImageUrlUrl(hashUrl);
    }
    else {
      setError(error);
    }
  }

  const handleCreate = async (e) => {
    e.preventDefault();
    console.log('create');

    //constitute the metadata
    const metadata = {
      name: nameRef.current.value,
      image: imageUrlIpfs,
      description: descriptionRef.current.value,
      date: Date.now(),
      attributes: [
        {
          trait_type: prop1NameRef.current.value,
          value: prop1DescriptionRef.current.value
        },
        {
          trait_type: prop2NameRef.current.value,
          value: prop2DescriptionRef.current.value
        },
      ]
    }

    const { uriToVisit, uriToMint, error } = await sendNftToPinata(metadata);
    setTokenUriToVisit(uriToVisit);
    setError(error);

    //connection to the Smart contract here
    getMint(uriToMint);
  }

  const { data: count } = useTotalCount(contract);

  useEffect(() => {
    console.log(count);
  }, [count])




  const getMint = async (uriToMint) => {
    console.log(contract);
    await mintTo([addressConnected, uriToMint])
      .then(response => {
        console.log(response);
        setTx(response);
      })
      .catch(err => console.log(err));
  }

  return (
    <>
      <div style={{ display: tx || error ? 'none' : 'flex' }} className='create section__padding'>
        <div className="create-container">
          <h1>Create new Item</h1>
          <p className='upload-file'>Upload File</p>
          <div className="upload-img-show">
            <h3>JPG, PNG, GIF, SVG, WEBM, MP3, MP4. Max 100mb.</h3>
            <img src={pictureUrl ? pictureUrl : Image} alt="banner" />
          </div>
          <form className='writeForm' autoComplete='off'>

            <div className="formGroup">
              <input accept="image/*" multiple type="file" onChange={handleUpload} className='custom-file-input'
              />
            </div>
            {addressConnected && <button type='button' className='uploadButton' onClick={handleSendPictureToIpfs}>Upload</button>}
            {error && <p className='error'>{error}</p>}
          </form>

          {imageUrlUrl &&
            <form className='writeForm' onSubmit={handleCreate}>
              <p className='success my-4'><span className='font-bold text-gray-500'>hashUrl:</span> <br />{imageUrlUrl}</p>
              <p className='success my-4'><span className='font-bold text-gray-500'>hashIpfs:</span> <br />{imageUrlIpfs}</p>
              <div className="my-4 formGroup">
                <label>Name</label>
                <input ref={nameRef} type="text" placeholder='Item Name' autoFocus={true} />
              </div>
              <div className="formGroup">
                <label>Description</label>
                <textarea ref={descriptionRef} type="text" rows={4}
                  placeholder='Decription of your item'
                ></textarea>
              </div>
              <div className="my-4 formGroup">
                <label>property 1</label>
                <input ref={prop1NameRef} type="text" className='my-2' placeholder='name' autoFocus={true} />
                <input ref={prop1DescriptionRef} type="text" placeholder='description' autoFocus={true} />
              </div>
              <div className="my-4 formGroup">
                <label>property 2</label>
                <input ref={prop2NameRef} type="text" className='my-2' placeholder='name' autoFocus={true} />
                <input ref={prop2DescriptionRef} type="text" placeholder='description' autoFocus={true} />
              </div>
              {/* <div className="formGroup">
                <label>Price</label>
                <div className="twoForm">
                  <input ref={priceRef} type="text" placeholder='Price' />
                  <select>
                    <option value="ETH">ETH</option>
                  </select>
                </div>
              </div> */}
              {isLoading ?
                <p className='m-auto text-2xl text-red-600'>Loading... Please wait'</p>
                :
                <div>
                  <button type='submit' className='writeButton'>Create Nft</button>
                </div>}
            </form>
          }
        </div>
      </div>


      {/* SUCCESS */}
      <div style={{ display: tx || error ? 'block' : 'none' }} className='create section__padding'>
        <div className="create-container">
          {tx &&
            <div>
              <h1>Transaction successful</h1>
              <p className='upload-file'>Transaction hash</p>
              <p className='my-4'><span className='font-bold text-gray-500'>Transaction hash: </span>{tx.receipt.transactionHash}</p>
              <div className="upload-img-show my-8">
                <MediaRenderer src={imageUrlIpfs} alt={"Nft uploaded"} />
              </div>
            </div>
          }
          {error &&
            <div className='text-5xl my-4'><span className='font-bold text-red-700'>Error : </span>{error}</div>
          }
          <div className='flex flex-col my-10 gap-6'>
            <a href='/create'>
              <button className='text-2xl writeButton'>-&gt; Go to create again</button>
            </a>
            <Link to={`/`}>
              <button className='text-2xl writeButton'>-&gt; Go to home</button>
            </Link>
          </div>
        </div>
      </div>

    </>

  )
};

export default Create;
