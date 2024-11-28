import { useState, useEffect } from "react";
import { getAPI } from "../../../../utils/api";
import { Link } from "react-router-dom";
import ItemCard from "../item-card/item-card.component";

const InventoryList = ({ items }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const productData = [];
      for (let i = 0; i < items.length; i++) {
        const { product, item } = items[i];
        try {
          const response = await getAPI(`/products/${product}/${item}`);
          productData.push(response.data);
        } catch (err) {
          console.log(err);
        }
      }
      setProducts(productData);
    };
    fetchItems();
  }, [items]);

  return (
    <div className="flex overflow-auto">
      <div className="flex w-full flex-col lg:flex-row flex-wrap gap-5">
        {products.map(({ product, item }, index) => (
          <ItemCard key={index} product={product} item={item} />
        ))}
      </div>
    </div>
  );
};

export default InventoryList;
