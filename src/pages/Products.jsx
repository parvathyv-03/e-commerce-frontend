import products from "../data/products.json";
import ProductCard from "../components/ProductCard";
import {Link} from "react-router-dom";


const categories = [
    {
        name:"For Him",
        slug:"men",
        image:"/src/assets/categories/categorymen.jpg"
    },
    {
        name:"For Her",
        slug:"women",
        image:"/src/assets/categories/category-women.jpg"
    },
    {
        name:"Footwear",
        slug:"footwear",
        image:"/src/assets/categories/category-footwear.jpg"
    },
    {
        name:"Jewellery",
        slug:"jewellery",
        image:"src/assets/categories/category-jewellery.jpg"
    },
    {
        name : "Watches For Men",
        slug : "watchesmen",
        image : "src/assets/categories/category-watchesmen.jpg"
    },
    {
        name : "Watches For Women",
        slug : "watcheswomen",
        image : "src/assets/categories/category-watcheswomen.jpg"
    },
    {
        name :"Beauty and Makeup",
        slug : "beautyandmakeup",
        image : "src/assets/categories/category-beautyandmakeup.jpg"
    },
    {
        name : "HandBags",
        slug: "handbags",
        image:"src/assets/categories/category-handbags.jpg"
    },
    {
        name : "Eyewear",
        slug : "eyewear",
        image:"src/assets/categories/category-eyewear.jpg"
    }
]

function Products(){
    return(
        <div className="category-page px-6">
            <h1 className="mt-4 mb-6 text-3xl font-bold">Shop by Category</h1>

            <div className="grid grid-cols-1 gap-8 category-grid">

                {categories.map((cat) =>(
                    <Link
                     key={cat.slug}
                     to={`/products/${cat.slug}`}
                     className="group relative h-64 md:h-80 w-full overflow-hidden rounded-2xl category-card">
                    
                    <img 
                    src={cat.image}
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
                ))}

            </div>
        </div>
    );
}

export default Products;