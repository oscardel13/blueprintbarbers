import { Route } from "react-router-dom";
import Store from "./store.route";
import ProductPage from "./routes/[product]/product.route";
import ProductItemPage from "./routes/[product]/[item]/product-item.router";

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
