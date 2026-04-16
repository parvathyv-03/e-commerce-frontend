import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import axios from "axios";
// import products from "../data/products.json";
import ProductCard from "../components/ProductCard";

const categoryDisplayNames = {
    watchesmen: "Watches for Men",
    watcheswomen: "Watches for Women",
    beautyandmakeup: "Beauty and Makeup",
    handbags: "Handbags",
};

function CategoryProducts(){
    const {category} = useParams();
    const[products,setProducts] = useState([]);

    useEffect(() => {
        axios 
            .get(`http://127.0.0.1:8000/api/products/?category=${category}`,
                {
                    headers:{
                        Authorization : undefined
                    }
                }
            )
            .then((res) => setProducts(res.data))
            .catch((err) => console.log(err));
    }, [category]);


    // const filteredProducts = products.filter(
    //     (product) => product.category === category
    // );

    return(
        <div className="px-6 pt-10">
            <h1 className="mb-8 text-3xl md:text-4xl font-extrabold capitalize">
                {categoryDisplayNames[category] || category}
            </h1>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {products.length > 0 ?(
                    products.map((product) => (
                        <ProductCard key={product.id} product={product}/>
                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500">
                        No Products found
                    </p>
                )}
            </div>
        </div>


        // <div className="products-page">
        //     <h2>{category.toUpperCase()}</h2>

        //     <div className="products-grid">
        //          {filteredProducts.length > 0 ?(
        //             filteredProducts.map((product) => (
        //                 <ProductCard key={product.id} product={product}/>
        //             ))
        //          ) : (
        //             <p>No products found</p>
        //          )}
        //     </div>
        // </div>
    )
}

export default CategoryProducts;