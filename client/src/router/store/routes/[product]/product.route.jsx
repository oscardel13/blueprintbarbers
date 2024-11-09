import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getAPI } from "../../../../utils/api";

import ProductList from "../../components/product_list/product_list.component";
import ProductView from "../../../../components/product-view/product-view.component";

const productHolder = {
  name: "",
  description: "",
  pricing: 0,
  images: ["https://blue-print-static.s3.amazonaws.com/product_defult.jpg"],
  stock: {},
  size: "",
  sizes: [],
};

const ProductPage = () => {
  const { productName } = useParams();
  const [product, setProduct] = useState(productHolder);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getAPI(`/products/store/${productName}`);
        setProduct(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchProduct();
  }, []);

  return (
    <>
      <ProductView product={product} setProduct={setProduct} />
      <ProductList curProduct={product} />
    </>
  );
};

export default ProductPage;
