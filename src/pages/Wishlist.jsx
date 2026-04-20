import {useEffect} from "react";
import { useSelector,useDispatch } from "react-redux";
import { fetchWishlist, toggleWishlist } from "../redux/slices/wishlistSlice";

function Wishlist(){
    const items = useSelector(state => state.wishlist.items);
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

    useEffect(() => {
        if(isLoggedIn){
            dispatch(fetchWishlist());
        }
    },[dispatch,isLoggedIn]);

    if(!isLoggedIn){
        return <p className="text-center text-xl font-bold mt-10">Please login to view your wishlist.</p>
    }

    if (items.length == 0){
        return<p className="text-center text-xl font-bold mt-10">Wishlist is empty</p>
    }

    return(
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(item => (
            <div key={item.id} className="border rounded-lg p-4 shadow-sm">
                <img src={`http://127.0.0.1:8000${item.image}`} alt={item.name} className="w-full h-48 object-cover rounded"/>
                <h2 className="mt3 font-semibold text-lg">{item.name}</h2>

                <p className="text-sm text-gray-600">{item.description}</p>

                <p className="mt-2 font-bold text-blue-600">Rs. {item.price}</p>

                <button onClick={() => dispatch(toggleWishlist(item.id))}
                    className="mt-3 text-red-600 hover:text-red-700">
                        Remove
                </button>
            </div>
        ))}

       </div>
    );
}

export default Wishlist;