// navigation without page reload
import {Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from "../assets/attire-logo.png";
// reads data from redux store and send actions to redux
import { useSelector,useDispatch } from "react-redux";
// Functions that modify state
import { logout } from "../redux/slices/authSlice";
import { clearCart } from "../redux/slices/cartSlice";
import { clearWishlist } from "../redux/slices/wishlistSlice";


function Navbar(){

    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        dispatch(clearCart());
        dispatch(clearWishlist());
        navigate("/");
    };

    return(
        <nav className="w-full bg-white shadow-md">
    
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <img src={logo} alt="Attire Logo" className="h-10 w-auto"/>

                <ul className="flex gap-6 font-medium text-gray-700">
                    <li>
                        <Link to="/"className="hover:text-blue-600">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/products"className="hover:text-blue-600">
                            Products
                        </Link>
                    </li>
                    <li>
                        <Link to="/cart"className="hover:text-blue-600">
                            Cart
                        </Link>
                    </li>
                    <li>
                        <Link to="/wishlist"className="hover:text-blue-600">
                            Wishlist
                        </Link>
                    </li>
                    {/* Conditional Rendering */}
                    <li>
                        {isLoggedIn ? (
                            <button 
                            onClick={handleLogout}
                            className="text-red-600 hover:text-red-700">
                                Logout
                            </button>
                        ) : (
                            <Link to="/login" className="hover:text-blue-600">
                                Login
                            </Link>
                        )}
                    </li>
                    {/* <li>
                        <Link to="/login" className="px-3 py-1 border border-blue-600 text-blue-600 rounded hover:bg-blue-50">
                            Login
                        </Link>
                    </li>  */}

                    <li>
                        <Link to="/signup" className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
                            Signup
                        </Link>    
                    </li>     
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;