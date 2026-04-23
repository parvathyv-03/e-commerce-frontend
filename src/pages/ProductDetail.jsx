import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import {api} from "../utils/api.js"

import { useDispatch,useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../redux/slices/cartSlice.js";
import { setPendingCartItem } from "../redux/slices/authSlice.js";

function ProductDetail(){
    const {slug} = useParams();
    const[product,setProduct] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    const handleAddToCart = () => {
        if(!isLoggedIn){
            dispatch(setPendingCartItem(product));
            navigate("/login");
        }else{
            dispatch(addToCart(product.id));
        }
    }

    const handleBuyNow = () => {
        navigate("/checkout",{
            state:{
                product : product
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

                    <div className="flex gap-4 mt-6 justify-center">
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