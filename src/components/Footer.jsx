import {Link} from "react-router-dom";
import {
    FaInstagram,FaFacebook,
    FaTwitter,FaYoutube
} from "react-icons/fa";

const Footer = () => {
    return (

        <footer className="bg-gray-900 text-gray-400 pt-14 pb-6 mt-10">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                    {/* Brand section */}
                    <div>
                        <h2 className="text-2xl font-bold text-white mb-4">
                            ATTIRE
                        </h2>
                        <p className="text-sm leading-6">
                            Discover trendy fashion and premium styles for every occasion.
                        </p>
                    </div>

                    {/* Quick links */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">
                            Quick Links
                        </h3>

                        <ul className="space-y-3">
                            <li>
                                <Link to="/" className="hover:text-white duration-300">
                                    Home
                                </Link>
                            </li>

                            <li>
                               <Link to="/products"
                                    className="hover:text-white duration-300">
                                        Products
                               </Link> 
                            </li>


                            <li className="mb-2">
                                <Link to="/wishlist" className="hover:text-white duration-300">
                                    Wishlist
                                </Link>
                            </li>

                            <li className="mb-2">
                                <Link to="/cart" className="hover:text-white duration-300">
                                    Cart 
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Customer Support */}
                    <div>
                        <h5 className="text-white text-lg font-semibold mb-4">
                            Customer Support
                        </h5>

                        <ul className="space-y-3">
                            <li className="hover:text-white duration-300 cursor-pointer">Help Center</li>
                            <li className="hover:text-white duration-300 cursor-pointer">Shipping Info</li>
                            <li className="hover:text-white duration-300 cursor-pointer">Returns</li>
                            <li className="hover:text-white duration-300 cursor-pointer">Privacy Policy</li>
                        </ul>
                    </div>

                    {/* Social Media */}
                    <div>
                        <h3 className="text-white text-lg font-semibold mb-4">Follow Us</h3>

                        <div className="flex gap-5 text-2xl">
                            <a href="#" className="hover:text-white duration-300">
                                <FaInstagram/>
                            </a>
                            <a href="#" className="hover:text-white duration-300">
                                <FaFacebook/>
                            </a>
                            <a href="#" className="hover:text-white duration-300">
                                <FaTwitter/>
                            </a>
                            <a href="#" className="hover:text-white duration-300">
                                <FaYoutube/>
                            </a>

                        </div>

                    </div>

                </div>

                <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm">
                    
                         © 2026 ATTIRE. All Rights Reserved.
                
                </div>
            </div>
        </footer>
    )
}

export default Footer;