import { useDispatch,useSelector } from 'react-redux';
import { login,clearPendingCartItem } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../redux/slices/cartSlice';
import { toggleWishlist } from '../redux/slices/wishlistSlice';

// After backend authentication
import {useState,useEffect} from "react";
import api from "../utils/api";

function Login() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const pendingItem = useSelector(state => state.auth.pendingCartItem)
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

    const pendingWishlistItem = JSON.parse(
        localStorage.getItem("pendingWishlistItem")
    );

    // add state for inputs
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    useEffect(() => {
        if (isLoggedIn){
            navigate("/products");
        }
    },[isLoggedIn,navigate]);
    
    // Main part
    const handleLogin = async () => {
        try{
            const res = await api.post(
                "/login/",
                {
                    username,
                    password
                }
            );

            // Store JWT Token
            localStorage.setItem("access",res.data.access);
            localStorage.setItem("refresh",res.data.refresh);

            // set axios header
            api.defaults.headers.common["Authorization"]=`Bearer ${res.data.access}`;

            // Update Redux
            dispatch(login({
                isLoggedIn:true,
                user: username,
                token : res.data.access
            }));

            //restore pending cart
            if(pendingItem){
                dispatch(addToCart(pendingItem.id));
                dispatch(clearPendingCartItem());
            }

            // pending wishlist
            if(pendingWishlistItem){
                dispatch(toggleWishlist(pendingWishlistItem.id));
                localStorage.removeItem("pendingWishlistItem");
            }          

        } catch (err){
            console.log(err.response?.data);
            alert("Invalid username or password");
        }       
    };

  return (
    <div className='min-h-screen flex items-center justify-center'>
        <div className='w-full max-w-md p-6 border rounded'>
            <h2 className='text-2xl font-bold mb-4 text-center'>Login</h2>

            <input type='text' 
                placeholder='Username' 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                className='w-full border p-2 mb-3 rounded'/>

            <input type='password' 
                placeholder='Password' 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                className='w-full border p-2 mb-4 rounded'/>

            <button onClick={handleLogin} className='w-full bg-blue-600 text-white py-2 rounded'>
                Login
            </button>

        </div>

    </div>
  );
}

export default Login;