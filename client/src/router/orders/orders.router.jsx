import OrdersList from "../../components/orders-list/orders-list.component";
import PageHeader from "../../components/page-header/page-header.component";

const OrdersPage = () => {
    return (
        <div className="min-h-screen bg-gray-300 py-5 px-3 md:px-5">
            <PageHeader title="Orders" />
            <OrdersList/>
        </div>
    )
}

export default OrdersPage;