import {useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../utils/api";

function Checkout(){
    const location = useLocation();
    const navigate = useNavigate();
    const product = location.state?.product;
    const cartItems = location.state?.cartItems;


    const [formData,setFormData] = useState({
        full_name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pincode: "",
        payment_method: "Cash on Delivery",
    })

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:e.target.value,
        });
    };

    const handleSubmit = async () => {
        try {
            const payload = {
                ...formData,
                total_amount:totalAmount,
                product_id:product.id,
            };

            await api.post("/checkout/",payload);

            alert("Order placed successfully");
            navigate("/");
        }catch(err){
            console.log(err);
        }
    }

    let totalAmount = 0;
        if(product){
            totalAmount = Number(product.price);
        }

        if(cartItems && cartItems.length > 0){
            totalAmount = cartItems.reduce(
                (sum,item) => sum + Number(item.price),
                0
            );
        }

    return (
        <div className="max=w=5xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-bold mb-8">Checkout Page</h1>

            <div className="grid md:grid-cols-2 gap-8">
                {/* LEFTSIDE */}
                <div className="space-y-4">
                    <input
                        type="text"
                        name="full_name"
                        placeholder="Full Name"
                        onChange={handleChange}
                        className="w-full border p-3 rounded"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        className="w-full border p-3 rounded"
                    />
                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone"
                        onChange={handleChange}
                        className="w-full border p-3 rounded"
                    />
                    <input
                        name="address"
                        placeholder="Address"
                        onChange={handleChange}
                        className="w-full border p-3 rounded"
                    />
                    <input
                        type="text"
                        name="city"
                        placeholder="City"
                        onChange={handleChange}
                        className="w-full border p-3 rounded"
                    />
                    <input
                        type="text"
                        name="state"
                        placeholder="State"
                        onChange={handleChange}
                        className="w-full border p-3 rounded"
                    />
                    <input
                        type="text"
                        name="pincode"
                        placeholder="Pincode"
                        onChange={handleChange}
                        className="w-full border p-3 rounded"
                    />
                </div>

                {/* RIGHTSIDE */}
                <div className="border rounded-lg p-6 shadow h-fit">
                    <h2 className="text-xl font-bol mb-6">
                        Order Summary
                    </h2>

                    {product && (
                        <div className="mb-6">
                            <img src={`http://127.0.0.1:8000${product.image}`}
                                alt={product.name}
                                className="w-32 h-32 object-cover rounded mb-3"
                            />

                            <h3 className="font-semibold text-lg">
                                {product.name}
                            </h3>

                            <p className="text-gray-600">
                                Rs.{product.price}
                            </p>
                        </div>

                    )}
                    {cartItems && cartItems.map((item) => (
                        <div key={item.id} className="mb-4 border-b pb-4">

                           <img
                                src={`http://127.0.0.1:8000${item.image}`}
                                alt={item.name}
                                className="w-24 h-24 object-cover rounded mb-2"
                            />

                            <h3 className="font-semibold">
                                {item.name}
                            </h3> 

                            <p className="text-gray-600">
                                Rs.{item.price}
                            </p>
                        </div>
                    ))

                    }

                    <div className="border-t pt-4">
                        <p className="text-lg font-bold">
                            Total Amount:Rs.{totalAmount}
                        </p>
                    </div>

                    <button
                        onClick={handleSubmit}
                        className="w-full bg-black text-white py-3 rounded mt-6"
                    >
                        Place Order 
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Checkout;