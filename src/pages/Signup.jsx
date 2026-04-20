import {useState} from "react";
import api from "../utils/api";


function Signup(){

    // added state
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");

    const handleSignup = async () => {
        try{
            await api.post("/signup/",{
                username,
                password
            });

            alert("Signup successful");

        }catch(err){
            console.log(err.response?.data);
            alert("Signup failed");
        }
    };

    return(
        <div className="min-h-screen flex items-center justify-center">
            <div className="w-full max-w-md p-6 border rounded">
                <h2 className="text-2xl font-bold mb-4 text-center">
                    Sign Up
                </h2>

                {/* connected inputs as value,onchange */}
                <input type="text" 
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} 
                    className="w-full border p-2 mb-3 rounded"/>

                <input type="password" 
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} 
                    className="w-full border p-2 mb-4 rounded"/>

                {/* button triggers API */}
                <button onClick={handleSignup} className="w-full bg-green-600 text-white py-2 rounded">
                    Create Account
                </button>
            </div>
        </div>
    );
}

export default Signup;