import { useEffect, useState } from "react";
import ProductCard from "../product_card/product_card.component";

import { getAPI } from "../../../../utils/api";

const ProductList = ({ curProduct }) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getAPI("/products/published");
        setProducts(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProducts();
  }, []);
  return (
    <div className="pt-14 flex flex-col items-center">
      <h2 className="text-2xl font-medium">New Goods</h2>
      <div className="w-full py-5 px-4 grid grid-cols-1 sm:grid-cols-2 gap-5 md:grid-cols-3 md:gap-5 lg:grid-cols-4">
        {products.map((product) => {
          if (product._id !== curProduct?._id) {
            return <ProductCard product={product} key={product._id} />;
          }
        })}
      </div>
    </div>
  );
};

export default ProductList;
