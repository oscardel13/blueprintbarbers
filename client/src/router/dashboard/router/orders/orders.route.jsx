import OrdersList from "./components/orders-list/orders-list.component";
import PageHeader from "../../compoenents/page-header/page-header.component";

const Orders = () => {
    return (
        <div className="container">
            <PageHeader title="Orders" />
            <OrdersList/>
        </div>
    )
}

export default Orders;