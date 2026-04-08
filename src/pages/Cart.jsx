import {useDispatch,useSelector} from "react-redux";
import { increaseQuantity,decreaseQuantity,removeFromCart } from "../redux/slices/cartSlice";

function Cart(){
const cartItems = useSelector((state) => state.cart.items);
const dispatch = useDispatch();
const cartTotal = cartItems.reduce(
    (total,item) => total + item.price * item.quantity,
    0
);
    return(
        <div >
            <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                <div className="space-y-4">
                    {cartItems.map((item) =>(
                        <div key={item.id} className="border p-4 rounded flex justify-between">
                        <div className="flex items-center gap-4 border p-4 rounded-lg shadow-sm">
                            <img src={`http://127.0.0.1:8000${item.image}`} alt={item.image} className="w-20 h-20 object-cover rounded"/>
                        </div>
                            <div className="flex-1 flex flex-col justify-center gap-2 p-3 max-w-md">
                                <h2 className="font-semibold leading-tight">{item.name}</h2>
                                <p className="text-sm text-gray-600">Quantity:{item.quantity}</p>
                                <p className="text-sm font-medium">Price : Rs. {item.price}</p>
                            </div>

                            <div className="flex items-center gap-3 mt-2">
                                <button className="px-3 py-1 border rounded hover:bg-gray-100" onClick={() => dispatch(decreaseQuantity(item.id))}>
                                    -
                                </button>

                                <span className="font-semibold px-3 py-1 border rounded hover:bg-gray-100">{item.quantity}</span>
                                
                                <button className="px-3 py-1 border rounded hover:bg-gray-100" onClick={() => dispatch(increaseQuantity(item.id))}>
                                    +
                                </button>

                                <p>Total : Rs.{item.price * item.quantity}</p>

                                <button className="text-red-600 px-3 py-1 border rounded hover:text-red-700" onClick={() => dispatch(removeFromCart(item.id))}>
                                    Remove
                                </button>

                                
                            </div>
                        </div>
                    ))}
                    <button className="max-w-3xl mx-auto p-4 px-3 py-1 border rounded">
                                    <h1>Your Cart</h1>
                                    <h2>Grand Total : Rs.{cartTotal}</h2>
                    </button>
                </div>
            )}
        </div>
    );
}

export default Cart;