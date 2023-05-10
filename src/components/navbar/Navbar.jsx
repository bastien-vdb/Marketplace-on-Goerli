import React, { useState, useEffect, useContext} from "react";
import "./navbar.css";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import logo from "../../assets/photoPP.jpg";
import { Link } from "react-router-dom";
import { auth, provider, db } from "../../firebase-config";
import { signInWithPopup, signOut } from "firebase/auth";
import { collection, addDoc, updateDoc, doc, query, getDocs, where } from "firebase/firestore";
import Menu from "./Menu";
import {ToastsContext} from "../../hooks/useToasts";

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [user, setUser] = useState(null);

  const { successNotify, errorNotify, infoNotify } = useContext(ToastsContext);

  const handleLogout = async () => {
    await signOut(auth);
    infoNotify("You are now disconnected");
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
        successNotify("You are now connected");
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
          }
        });
      });
    } catch (error) {
      errorNotify(error.msg);
      console.log(error);
    }
  };

  const onAuthStateChanged = (currentUser) => {
    if (currentUser) {
      const uid = auth.currentUser.uid;
      const name = auth.currentUser.displayName;
      const email = auth.currentUser.email;
      const ppUrl = auth.currentUser.photoURL;
      setUser({ uid, name, email, ppUrl });
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(onAuthStateChanged);
    return unsubscribe;
  }, []);

  return (
    <div className="navbar">
      <div className="navbar-links">
        <div className="navbar-links_logo">
          <Link to="/">
            <img className="rounded-full w-10 min-w-[50px] border-2" src={logo} alt="logo" />
          </Link>
        </div>
        <div className="navbar-links_container">
          <Menu user={user} handleLogin={handleLogin} handleLogout={handleLogout} />
        </div>
      </div>

      <div className="navbar-menu">
        {!toggleMenu ? (
          <>
            <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />
          </>
        ) : (
          <>
            <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
            <div className="navbar-menu_container scale-up-center">
              <div className="navbar-menu_container-links">
                <Menu user={user} handleLogin={handleLogin} handleLogout={handleLogout} />
              </div>
              <div className="navbar-menu_container-links-sign"></div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
