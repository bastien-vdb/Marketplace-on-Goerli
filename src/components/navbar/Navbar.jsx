import React, { useEffect, useState } from 'react'
import './navbar.css'
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import logo from '../../assets/logo.png'
import { Link } from "react-router-dom";
import { ConnectWallet } from "@thirdweb-dev/react";
import { auth, provider } from '../../firebase-config';
import { signInWithPopup, signOut } from 'firebase/auth';
import Cookies from 'universal-cookie';


const cookie = new Cookies();

const Menu = () => (
  <>
    <Link to="/"><p>Explore</p> </Link>
    <p>My Items</p>
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
        const email = result.user.displayName;
        const ppUrl = result.user.photoURL;
        localStorage.setItem('name', name);
        localStorage.setItem('email', email);
        localStorage.setItem('ppUrl', ppUrl)
        console.log(result);
        setLocalUserInfo({ name, email, ppUrl });
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

  // useEffect(() => {
  //   if (user) {
  //     setLocalUserInfo({
  //       name: localStorage.getItem('name'),
  //       email: localStorage.getItem('email'),
  //       ppUrl: localStorage.getItem('ppUrl')
  //     });
  //     console.log(localStorage.getItem('name'))
  //   } else {
  //     setLocalUserInfo({});
  //   }
  // }, [user]);

  return (
    <div className='navbar'>
      <div className="navbar-links">
        <div className="navbar-links_logo">
          <img src={logo} alt="logo" />
          <Link to="/">
            <h1>CryptoKet</h1>
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
          <>
            <Link to="/create">
              <button type='button' className='primary-btn' >Create</button>
            </Link>
            <button type='button' className='primary-btn'><ConnectWallet /></button>
            {localUserInfo &&
              <div style={{ margin: '0 20px', fontSize: '10px', color: 'white' }}>
                <img className='ppUrl' src={localUserInfo.ppUrl} alt={localStorage.getItem('name')} />
                <h3>{localUserInfo.name}</h3>
              </div>
            }
          </>
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
