import { useDispatch,useSelector } from "react-redux";
import { addToCart } from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { setPendingCartItem } from "../redux/slices/authSlice";
import { toggleWishlist } from "../redux/slices/wishlistSlice";

function ProductCard({product}){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector(state => state.auth.isLoggedIn);
    const wishlistItems = useSelector(state => state.wishlist.items);

    const isWishlisted = wishlistItems.some(
        item => item.id === product.id
    );

    const handleAddToCart = () => {
        if (!isLoggedIn){
            dispatch(setPendingCartItem(product));
            navigate("/login");
        } else{
            dispatch(addToCart(product));
        }
    };
    
    return(
        <div className="border rounded-lg shadow-sm p-4 hover:shadow-md transition">
            <div className="relative w-full h-60 bg-gray-200 rounded ">
                <img src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover rounded"
                />

                <button onClick={() => {
                    if (!isLoggedIn){
                        localStorage.setItem(
                            "pendingWishlistItem",
                             JSON.stringify(product)
                            );
                        navigate("/login");
                        return;
                    }
                dispatch(toggleWishlist(product));
                }}
                className={`absolute top-2 right-2 text-xl ${isWishlisted ? "text-red-500" : "text-black-400"}`}
                >
                   ♥ 
                </button>

            </div>
            

            <h3 className="mt-3 font-semibold text-lg">
                {product.name}
            </h3>
            
            <p className="text-gray-600 text-sm">
                {product.description}
            </p>

            <div className="mt-2 flex justify-between items-center">
                <span className="font-bold text-blue-600">
                    Rs.{product.price}
                </span>

                

                <button onClick={handleAddToCart} 
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">
                    Add to Cart
                </button>
            </div>
        </div>
    );
}

export default ProductCard;