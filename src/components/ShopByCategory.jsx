import React,{useEffect,useState} from "react";
import api from "../utils/api";
import footwear from "../assets/home-category/footwear.jpg"
import men from "../assets/home-category/men.jpg"
import women from "../assets/home-category/women.jpg"
import jewellery from "../assets/home-category/jewellery.jpg"
import bagpacks from "../assets/home-category/bagpacks.jpg"
import beautyandmakeup from "../assets/home-category/beautyandmakeup.jpg"
import eyewear from "../assets/home-category/eyewear.jpg"
import handbags from "../assets/home-category/handbags.jpg"
import watchesmen from "../assets/home-category/watchesmen.jpg"
import watcheswomen from "../assets/home-category/watcheswomen.jpg"


import { useNavigate } from "react-router-dom";

const categorySlugMap = {
    "watches for men": "watchesmen",
    "watches for women": "watcheswomen",
    "beauty and makeup": "beautyandmakeup",
    "handbags": "handbags",
};

const imageMap = {
    footwear,
    men,
    women,
    jewellery,
    bagpacks,
    "beauty and makeup":beautyandmakeup,
    eyewear,
    handbags,
    "watches for men":watchesmen,
    "watches for women":watcheswomen,
}

const normalizeCategory = (name) => name.toLowerCase().trim();

const ShopByCategory = () => {
    const[categories,setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        api
            .get("/categories/")
            .then((res) => setCategories(res.data))
            .catch((err) => console.log(err));
    },[]);

    return (
        <div className="py-10 text-center">
            <h2 className="text-2xl font-bold mb-6">Shop By Category</h2>

            <div className="grid grid-cols-3 gap-5  mx-auto px-4">
                {categories.map((cat) => {
                    const key = normalizeCategory(cat.name);
                    return (
                    <div key={cat.id}
                        onClick={() =>  {
                            const name = cat.name.toLowerCase().trim();

                            const slug = categorySlugMap[name] || name;

                            navigate(`/products/${slug}`)}}
                            className="cursor-pointer rounded-xl overflow-hidden bg-gray-100 shadow hover:scale-105 transition duration-300">

                        <img src={imageMap[key] || men} 
                        alt={cat.name} 
                        className="w-full h-44 object-cover"/>
                        <p className="py-3 font-semibold text-lg">
                            {cat.name}
                        </p>
                    </div>
                );
            })}
            </div>
        </div>
    );
};

export default ShopByCategory;