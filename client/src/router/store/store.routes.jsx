import { Route } from "react-router-dom";
import Store from "./store.route";
import ProductPage from "./[product]/product.route";
import ProductItemPage from "./[product]/[item]/product-item.route";

function StoreRoutes() {
  return (
    <>
      <Route path="store">
        <Route index element={<Store />} />
        <Route path=":productName" element={<ProductPage />} />
        <Route path=":productName/:itemId" element={<ProductItemPage />} />
      </Route>
    </>
  );
}

export default StoreRoutes;
