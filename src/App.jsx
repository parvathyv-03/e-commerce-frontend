import { useState } from 'react'
import './App.css'
import MainLayout from './layouts/MainLayout';
// pages
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';

import { BrowserRouter,Routes, Route } from 'react-router-dom';
// auth
import Login from './pages/Login';
import Signup from './pages/Signup';
// others
import Wishlist from './pages/Wishlist';
import CategoryProducts from './pages/CategoryProducts';
function App() {
  // const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout/>}>
          <Route path="/" element={<Home/>}/>
          <Route path='/products' element={<Products/>}/>
          <Route path="/products/:category" element={<CategoryProducts/>}/>
          <Route path="/cart" element={<Cart/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/wishlist' element={<Wishlist/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
