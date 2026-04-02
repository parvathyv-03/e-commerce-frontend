function Signup(){
    return(
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md p-6 border rounded">
                <h2 className="text-2xl font-bold mb-4 text-center">
                    Sign Up
                </h2>

                <input type="text" placeholder="Email" className="w-full border p-2 mb-3 rounded"/>
                <input type="password" placeholder="Password" className="w-full border p-2 mb-4 rounded"/>

                <button className="w-full bg-green-600 text-white py-2 rounded">
                    Create Account
                </button>
            </div>
        </div>
    );
}

export default Signup;