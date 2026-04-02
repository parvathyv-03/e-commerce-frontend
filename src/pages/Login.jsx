import React from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { login,clearPendingCartItem } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../redux/slices/cartSlice';
import { toggleWishlist } from '../redux/slices/wishlistSlice';

function Login() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const pendingItem = useSelector(state => state.auth.pendingCartItem)

    const pendingWishlistItem = JSON.parse(
        localStorage.getItem("pendingWishlistItem")
    );

    const handleLogin = () => {
       
        dispatch(login({name:"Demo User"}));

        // pending cart
        if(pendingItem){
            dispatch(addToCart(pendingItem));
            dispatch(clearPendingCartItem());
        }

        // pending wishlist
        if(pendingWishlistItem){
            dispatch(toggleWishlist(pendingWishlistItem));
            localStorage.removeItem("pendingWishlistItem");
        }

        navigate("/products");
    };

  return (
    <div className='min-h-screen flex items-center justify-center'>
        <div className='w-full max-w-md p-6 border rounded'>
            <h2 className='text-2xl font-bold mb-4 text-center'>Login</h2>

            <input type='email' placeholder='Email' className='w-full border p-2 mb-3 rounded'/>
            <input type='password' placeholder='Password' className='w-full border p-2 mb-4 rounded'/>

            <button onClick={handleLogin} className='w-full bg-blue-600 text-white py-2 rounded'>
                Login
            </button>

        </div>

    </div>
  );
}

export default Login;