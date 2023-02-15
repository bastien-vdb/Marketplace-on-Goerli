import React, { useEffect, useState } from 'react'
import './navbar.css'
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import logo from '../../assets/photoPP.jpg'
import { Link } from "react-router-dom";
import { ConnectWallet } from "@thirdweb-dev/react";
import { auth, provider, db } from '../../firebase-config';
import { signInWithPopup, signOut } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import Cookies from 'universal-cookie';


const cookie = new Cookies();

const Menu = () => (
  <>
    <Link to="/"><p>Home</p></Link>
    <Link to="/myitems"><p>My Items</p> </Link>
  </>
)

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [user, setUser] = useState(false);
  const [localUserInfo, setLocalUserInfo] = useState({});

  const handleLogout = async () => {
    setUser(false);
    await signOut(auth);
    cookie.remove("auth-marketBVB");
    localStorage.clear();
  }

  const handleLogin = () => {
    try {
      signInWithPopup(auth, provider).then(result => {
        cookie.set("auth-marketBVB", result.user.refreshToken);
        setUser(true);
        const name = result.user.displayName;
        const email = result.user.email;
        const ppUrl = result.user.photoURL;
        localStorage.setItem('name', name);
        localStorage.setItem('email', email);
        localStorage.setItem('ppUrl', ppUrl)
        console.log(result);
        setLocalUserInfo({ name, email, ppUrl });
        addDoc(collection(db, "users"), {
          name,
          email,
          ppUrl
        });
      })
    }
    catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (cookie.get("auth-marketBVB")) {
      setUser(true);
      setLocalUserInfo({
        name: localStorage.getItem('name'),
        email: localStorage.getItem('email'),
        ppUrl: localStorage.getItem('ppUrl')
      });
    }
  }, []);

  return (
    <div className='navbar'>
      <div className="navbar-links">
        <div className="navbar-links_logo">
          <img className='rounded-full w-20 border-2' src={logo} alt="logo" />
          <Link to="/">
            <h1>Bastien Web3.0</h1>
            <span className='text-sm'>Market place</span>
          </Link>
        </div>
        <div className="navbar-links_container">
          <input type="text" placeholder='Search Item Here' autoFocus={true} />
          <Menu />
          {user && <Link to="/"><p onClick={handleLogout}>Logout</p></Link>}

        </div>

      </div>
      <div className="navbar-sign">
        {user ? (
          <div className='flex justify-center items-center gap-10'>
            <Link to="/create">
              <button type='button' className='primary-btn' >Create an NFT</button>
            </Link>
            <ConnectWallet />
            {localUserInfo &&
              <div className='flex flex-col justify-center items-center' style={{ margin: '0 20px', fontSize: '10px', color: 'white' }}>
                <img className='ppUrl' src={localUserInfo.ppUrl} alt={localStorage.getItem('name')} />
                <h3>{localUserInfo.name}</h3>
              </div>
            }
          </div>
        ) : (
          <>
            <button type='button' className='primary-btn' onClick={handleLogin} >Sign In</button>
          </>
        )}



      </div>
      <div className="navbar-menu">
        {toggleMenu ?
          <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
        {toggleMenu && (
          <div className="navbar-menu_container scale-up-center" >
            <div className="navbar-menu_container-links">
              <Menu />
            </div>
            <div className="navbar-menu_container-links-sign">
              {user ? (
                <>
                  <Link to="/create">
                    <button type='button' className='primary-btn' >Create</button>
                  </Link>
                  <button type='button' className='secondary-btn'>Connect</button>
                </>
              ) : (
                <>
                  <button type='button' className='primary-btn' onClick={handleLogin} >Sign In</button>
                </>
              )}

            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
