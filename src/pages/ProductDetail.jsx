import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import {api} from "../utils/api.js"

import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../redux/slices/cartSlice.js";
import { setPendingCartItem } from "../redux/slices/authSlice.js";
import { toggleWishlist } from "../redux/slices/wishlistSlice.js";
import {FaHeart,FaRegHeart} from "react-icons/fa";

function ProductDetail(){
    const {slug} = useParams();
    const[product,setProduct] = useState(null);
    const [quantity,setQuantity] = useState(1);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    const increaseQuantity = () => {
        setQuantity((prev) => prev+1);
    };

    const decreaseQuantity = () => {
        if(quantity > 1) {
            setQuantity((prev) => prev - 1);
        }
    };

    const wishlistItems = useSelector(
        (state) => state.wishlist.items
    );
    const isWishlisted = wishlistItems.some(
        item => item.id === product?.id
    );

    const handleWishlist = () => {
        if(!isLoggedIn){
            navigate("/login");
            return;
        }

        dispatch(toggleWishlist(product.id));
    };

    const handleAddToCart = () => {
        if(!isLoggedIn){
            dispatch(setPendingCartItem(product));
            navigate("/login");
        }else{
            dispatch(addToCart(product.id));
        }
    }

    const handleBuyNow = () => {
        const token = localStorage.getItem("access");

        if(!token){
            navigate("/login");
            return;
        }

        navigate("/checkout",{
            state:{
                product: product,
                quantity:quantity
            }
        });

    };

    useEffect(() => {
        api.get(`products/${slug}/`)
            .then((res) => setProduct(res.data))
            .catch((err) => console.log(err));
    },[slug]);

    if (!product) return <p>Loading...</p>

    return(
        <div className="max-w-6xl mx-auto px-6 py-10">
            <div className="grid md:grid-cols-2 gap-10">
                <div>
                    <img 
                        src={`http://127.0.0.1:8000${product.image}`}
                        alt={product.name}
                        className="w-full h-[500px] object-cover rounded-xl"/>
                </div>

                <div>
                    <h1 className="text-3xl font-bold mb-4">
                        {product.name}
                    </h1>

                    <p className="text-xl text-blue-600 fnt-semibold mb-4">
                        Rs.{product.price}
                    </p>

                    <p className="text-gray-600 mb-6">
                        {product.description}
                    </p>

                    <div className="flex flex-col items-center mt-8">

                        <span className="font-semibold text-lg mb-3">
                            Quantity
                        </span>

                        <div className="flex items-center border rounded-lg overflow-hidden shadow-sm">

                            <button
                                onClick={decreaseQuantity}
                                className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-xl"
                            >
                                -
                            </button>

                            <span className="px-8 py-2 text-lg font-semibold bg-white">
                                {quantity}
                            </span>

                            <button
                                onClick={increaseQuantity}
                                className="px-5 py-2 bg-gray-200 hover:bg-gray-300 text-xl"
                            >
                                +
                            </button>

                        </div>
                    </div>

                    <div className="flex gap-4 mt-6 justify-center">

                        <button onClick={handleWishlist}
                            className={`px-5 py-3 rounded-lg flex items-center gap-2 transition duration-300 
                                        ${isWishlisted 
                                            ? "bg-red-500 text-white"
                                            : "bg-gray-200 text-black hover:bg-gray-300"
                                        }`}>

                                            {isWishlisted ? <FaHeart/> : <FaRegHeart/>}

                                            {isWishlisted ? "Wishlisted" : "Wishlist"}

                        </button>

                        <button onClick={handleAddToCart} className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800">
                                Add to Cart
                        </button>

                        <button
                            onClick={handleBuyNow}
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-green-700">
                                Buy Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;