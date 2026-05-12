function OrderSuccess(){
    return(
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white shadow-lg p-10 rounded-lg text-center">

                <h1 className="text-4xl font-bold text-black-600 mb-4">
                    Payment Successful
                </h1>

                <p className="text-gray-600 mb-6">
                    Your order has been placed succesfully.
                </p>

                <button onClick={() => window.location.href="/"}
                        className="bg-black text-white px-6 py-3 rounded">
                            Continue Shopping
                </button>
            </div>
        </div>
    );
}

export default OrderSuccess;