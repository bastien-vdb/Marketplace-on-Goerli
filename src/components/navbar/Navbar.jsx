import React, { useEffect, useState } from "react";
import "./navbar.css";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import logo from "../../assets/photoPP.jpg";
import { Link } from "react-router-dom";
import { ConnectWallet } from "@thirdweb-dev/react";
import { auth, provider, db } from "../../firebase-config";
import { signInWithPopup, signOut } from "firebase/auth";
import { collection, addDoc, updateDoc, doc, query, getDocs, where } from "firebase/firestore";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [user, setUser] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    localStorage.clear();
  };

  const handleLogin = async () => {
    try {
      signInWithPopup(auth, provider).then((result) => {
        const uid = result.user.uid;
        const name = result.user.displayName;
        const email = result.user.email;
        const ppUrl = result.user.photoURL;
        setUser({ uid, name, email, ppUrl });

        //check if user exists in firestore
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", email));
        getDocs(q).then((querySnapshot) => {
          if (querySnapshot.size === 0) {
            // If the user does not exist in Firestore, add a new document to the "users" collection
            addDoc(collection(db, "users"), {
              uid,
              name,
              email,
              ppUrl,
            });
          } else {
            // If the user already exists in Firestore, update their information
            const docRef = doc(db, "users", querySnapshot.docs[0].id);
            updateDoc(docRef, {
              uid,
              name,
              email,
              ppUrl,
            });
            console.log("User information updated");
          }
        });
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(true);
      }
    });

    return unsubscribe;
  }, [user]);

  return (
    <div className="navbar">
      <div className="navbar-links">
        <div className="navbar-links_logo">
          <img className="rounded-full w-20 min-w-[100px] border-2" src={logo} alt="logo" />
          <Link to="/">
            <div className="logo-title">
              <h1>Bastien Web3.0</h1>
              <span className="text-sm">Market place</span>
            </div>
          </Link>
        </div>
        <div className="navbar-links_container">
          <Menu />
          {auth.currentUser && (
            <Link to="/">
              <p onClick={handleLogout}>Logout</p>
            </Link>
          )}
        </div>
      </div>
      <div className="navbar-sign">
        {auth.currentUser ? (
          <div className="flex justify-center items-center gap-10">
            <Link to="/generate">
              <button type="button" className="primary-btn">
                Generate an image
              </button>
            </Link>
            <Link to="/create">
              <button type="button" className="primary-btn">
                Create a NFT
              </button>
            </Link>
            <Link to="/shareapic">
              <button type="button" className="primary-btn">
                Just Share a pic
              </button>
            </Link>
            <ConnectWallet />
            {auth.currentUser && (
              <div className="flex flex-col justify-center items-center" style={{ marginRight: "20px", fontSize: "10px", color: "white" }}>
                <img className="ppUrl" src={auth.currentUser.photoURL} alt={auth.currentUser.displayName} />
                <h3>{auth.currentUser.displayName}</h3>
              </div>
            )}
          </div>
        ) : (
          <>
            <button type="button" className="primary-btn" onClick={handleLogin}>
              Sign In
            </button>
          </>
        )}
      </div>

      <div className="navbar-menu">
        {toggleMenu ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} /> : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
        {toggleMenu && (
          <div className="navbar-menu_container scale-up-center">
            <div className="navbar-menu_container-links">
              <Menu />
            </div>
            <div className="navbar-menu_container-links-sign">
              {user ? (
                <div className="flex flex-col">
                  <Link to="/generate">
                    <button type="button" className="secondary-btn">
                      Generate
                    </button>
                  </Link>
                  <Link to="/create">
                    <button type="button" className="secondary-btn">
                      Create
                    </button>
                  </Link>
                  <ConnectWallet />
                </div>
              ) : (
                <>
                  <button type="button" className="primary-btn" onClick={handleLogin}>
                    Sign In
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

const Menu = () => (
  <>
    <Link to="/">
      <p>Home</p>
    </Link>
    <Link to="/myitems">
      <p>Your Wallet</p>{" "}
    </Link>
    <Link to="/ME">
      <p>ME</p>{" "}
    </Link>
  </>
);
