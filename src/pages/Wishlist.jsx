import { useSelector,useDispatch } from "react-redux";
import { toggleWishlist } from "../redux/slices/wishlistSlice";

function Wishlist(){
    const items = useSelector(state => state.wishlist.items);
    const dispatch = useDispatch();

    if (items.length == 0){
        return<p className="text-center text-xl font-bold mt-10">Wishlist is empty</p>
    }

    return(
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(item => (
            <div key={item.id} className="border rounded-lg p-4 shadow-sm">
                <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded"/>
                <h2 className="mt3 font-semibold text-lg">{item.name}</h2>

                <p className="text-sm text-gray-600">{item.description}</p>

                <p className="mt-2 font-bold text-blue-600">Rs. {item.price}</p>

                <button onClick={() => dispatch(toggleWishlist(item))}
                    className="mt-3 text-red-600 hover:text-red-700">
                        Remove
                </button>
            </div>
        ))}

       </div>
    );
}

export default Wishlist;