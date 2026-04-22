import { useParams } from "react-router-dom";
import { useEffect,useState } from "react";
import api from "../utils/api";
import ProductCard from "../components/ProductCard";

import { useNavigate } from "react-router-dom";

const categoryDisplayNames = {
    watchesmen: "Watches for Men",
    watcheswomen: "Watches for Women",
    beautyandmakeup: "Beauty and Makeup",
    handbags: "Handbags",
};

function CategoryProducts(){
    const {category} = useParams();
    const[products,setProducts] = useState([]);
    const navigate = useNavigate();

    console.log(category)
    useEffect(() => {
        console.log(category);

        api
            .get(`/products/?category=${category}`)
            .then((res) => {
                console.log(res.data);
                setProducts(res.data)
            })
            .catch((err) => console.log(err));
    }, [category]);

    return(
        <div className="px-6 pt-10">
            <h1 className="mb-8 text-3xl md:text-4xl font-extrabold capitalize">
                {categoryDisplayNames[category] || category}
            </h1>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {products.length > 0 ?(
                    products.map((product) => (
                        <div
                            key={product.id}
                            onClick={() => navigate(`/products/${category}/${product.slug}`)}
                            className="cursor-pointer">
                                <ProductCard product={product}/>
                        </div>

                    ))
                ) : (
                    <p className="col-span-full text-center text-gray-500">
                        No Products found
                    </p>
                )}
            </div>
        </div>
    )
}

export default CategoryProducts;