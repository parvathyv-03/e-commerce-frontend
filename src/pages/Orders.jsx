import { useEffect,useState } from "react";
import api from "../utils/api";

function Orders(){

    const [orders,setOrders]= useState([]);

    useEffect(() => {

        api.get("/my-orders/")
            .then((res) => setOrders(res.data))
            .catch((err) => console.log(err));

    },[]);

    return(

        <div className="max-w-6xl mx-auto px-6 py-10">
            <h1 className="text-3xl font-bold mb-8"> 
                My Orders
            </h1>

            <div className="space-y-6">

                {orders.map((order) => (
                    <div key={order.id} className="border rounded-xl p-5 shadow">

                            <h2 className="text-xl font-semibold">
                                Order #{order.id}
                            </h2>

                            <p>
                                Quantity : {order.quantity}
                            </p>

                            <p>
                                Total: Rs.{order.total_amount}
                            </p>

                            <p className="text-green-600 font-semibold">
                                {order.order_status}
                            </p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Orders;