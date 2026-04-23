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
// import { useEffect } from 'react';

// // for getting token
// import { useEffect } from 'react';
// import axios from 'axios';

import ProductDetail from './pages/ProductDetail';
import Checkout from './pages/Checkout';

function App() {
//   // const [count, setCount] = useState(0)

//   useEffect(() =>{
//     const access = localStorage.getItem("access");

  //   if (access){
  //     axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;
  //   }
  // },[]);
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
          <Route path="/products/:category/:slug" element={<ProductDetail />}/>
          <Route path="/checkout" element={<Checkout/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
