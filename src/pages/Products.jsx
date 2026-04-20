// import ProductCard from "../components/ProductCard";
import {useEffect,useState} from "react"
import {Link} from "react-router-dom";
import api from "../utils/api";

const imageMap = {   
    men : "/src/assets/categories/categorymen.jpg",
    women : "/src/assets/categories/category-women.jpg",
    footwear : "/src/assets/categories/category-footwear.jpg",
    jewellery : "/src/assets/categories/category-jewellery.jpg",
    watchesmen : "/src/assets/categories/category-watchesmen.jpg",
    watcheswomen : "/src/assets/categories/category-watcheswomen.jpg",
    "beauty and makeup" : "/src/assets/categories/category-beautyandmakeup.jpg",
    handbags : "/src/assets/categories/category-handbags.jpg",
    eyewear : "/src/assets/categories/category-eyewear.jpg",
}

function normalizeCategory(name){
    return name.toLowerCase().trim();
}

function Products(){

    const [categories,setCategories] = useState([]);

    useEffect(() => {
        api
            .get("/categories/")
            .then((res) => {
                console.log(res.data);
                setCategories(res.data)
            })
            .catch((err) => console.error(err));
    },[]);

    return(
        <div className="category-page px-6">
            <h1 className="mt-4 mb-6 text-3xl font-bold">Shop by Category</h1>

            <div className="grid grid-cols-1 gap-8 category-grid">

                {categories.map((cat) =>{

                    const key = normalizeCategory(cat.name);

                    return (
                        <Link
                        key={cat.id}
                        to={`/products/${cat.slug}`}
                        className="group relative h-64 md:h-80 w-full overflow-hidden rounded-2xl category-card">
                        
                            <img 
                            src={imageMap[key] || "/src/assets/categories/categorymen.jpg"}
                            alt={cat.name}
                            className="opacity-75 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"/>

                            <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition pointer-events-none"/>

                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white pointer-events-none">
                                <h2 className="text-3xl md:text-5xl font-bold tracking-wide">
                                    {cat.name}
                                </h2>

                                <button className="mt-4 rounded-full border border-black px-6 py-2 text-sm font-semibold transition group-hover:bg-white group-hover:text-black">
                                    Shop Now
                                </button>

                            </div>
                        </Link>
                    );
                    })}

            </div>
        </div>
    );
}

export default Products;