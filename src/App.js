import './App.css';
import { Navbar, Footer } from './components'
import { Home, Profile, Item, Create, Login, Register } from './pages'
import MyItems from './pages/myitems/MyItems';
import { Routes, Route } from "react-router-dom";

function App() {

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/item/:itemId" element={<Item />} />
        <Route path="/create" element={<Create />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/myitems" element={<MyItems />} />
        <Route path="/Pago" element={<Register />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
