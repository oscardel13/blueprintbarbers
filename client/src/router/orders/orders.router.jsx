import OrdersList from "../../components/orders-list/orders-list.component";
import PageHeader from "../../components/page-header/page-header.component";

const OrdersPage = () => {
    return (
        <div className="min-h-screen w-screen bg-gray-300 p-5">
            <PageHeader title="Orders" />
            <OrdersList/>
        </div>
    )
}

export default OrdersPage;