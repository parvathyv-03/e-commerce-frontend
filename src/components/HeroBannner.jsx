import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";

import banner1 from "../assets/banners/banner1.jpg";
import banner2 from "../assets/banners/banner2.jpg";
import banner3 from "../assets/banners/banner3.jpg";

function HeroBanner(){
    const navigate = useNavigate();

    // banner data
    const banners = [
        {
            image : banner1,
            title:"Dresses for Women.",
            subtitle:"Min 60% off",
            button:"Shop Now",
            category:"women"
        },
        {
            image : banner2,
            title:"Shirts for Men.",
            subtitle:"Trending styles",
            button:"Explore",
            category:"men"
        },
        {
            image : banner3,
            title:"Shoes.",
            subtitle:"Min 30% off",
            button:"View Collection",
            category:"footwear"
        }
    ];

    // state (tracks when banner is active)
    const[currentIndex,setCurrentIndex] = useState(0);

    // auto-slide logic
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev+1) % banners.length);
        },3000);

        return () => clearInterval(interval);
    },[]);

    return(
        <div className="relative w-full h-[70vh] overflow-hidden">

            {/* sliding effect(moves images horizontally,smooth transition) */}
            <div className="flex h-full transition-transform duration-700 ease-in-out"
            style={{transform:`translateX(-${currentIndex * 100}%)`}}>

                {banners.map((banner,index) => (
                    <img key={index} src={banner.image} 
                        alt={banner.title}
                        className="w-full h-full object-cover flex-shrink-0"/>
                ))}
            </div>

            
            {/* tailwind css used for ui */}
            <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-start px-16">
                <h1 className="text-white text-4xl md:text-5xl font-bold mb-4"> 
                    {banners[currentIndex].title}
                </h1>

                <p className="text-white text-lg mb-6">
                    {banners[currentIndex].subtitle}
                </p>

                {/* This is how category page is triggered */}
                <button onClick={() => navigate(`/products/${banners[currentIndex].category}`)} 
                    className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-md font-semibold transition">
                    {banners[currentIndex].button}
                </button>
            </div>
        </div>
    );
}

export default HeroBanner;