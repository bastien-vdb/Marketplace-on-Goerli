import { Link } from "react-router-dom";
import { ConnectWallet } from "@thirdweb-dev/react";


const Menu = ({ user, handleLogin, handleLogout }) => (
    <>
      <Link to="/">
        <p>Home</p>
      </Link>
      <Link to="/ME">
        <p>About me</p>{" "}
      </Link>
      {user ? (
        <>
          <Link to="/myitems">
            <p>My Wallet</p>{" "}
          </Link>
          <Link to="/generate">
            <p className="text-red-500">AI Generation</p>
          </Link>
          <Link to="/create">
            <p className="">Create a NFT</p>
          </Link>
          <Link to="/shareapic">
            <p>Share a pic</p>
          </Link>
          <Link to="/">
            <p onClick={handleLogout}>Logout</p>
          </Link>
  
          <div className="flex gap-6 justify-center items-center">
            <ConnectWallet />
            <div className="hidden 2xl:block flex flex-col justify-center items-center" style={{ marginRight: "20px", fontSize: "10px", color: "white" }}>
              <img className="ppUrl rounded-full w-10 float-right" src={user.ppUrl} alt={user.name} />
              <h3>{user.name}</h3>
            </div>
          </div>
        </>
      ) : (
        <Link to="/">
          <p onClick={handleLogin}>Sign in</p>
        </Link>
      )}
    </>
  );

  export default Menu;