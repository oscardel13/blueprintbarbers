import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import OrdersCard from '../orders-card/orders-card.component';
import OrderCard from '../order-card/order-card.component';

import { getAPI } from '../../utils/api';

const OrdersList = () => {
    const [orders, setOrders] = useState([])

    useEffect(() => {
        const getOrders = async () => {
            try{
                const res = await getAPI('/orders')
                setOrders(res.data)
            }
            catch(err){
                console.log(err)
            }
        }
        
        getOrders()

    },[])

    return (
        <>
            <div className="flex overflow-auto bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                <div className='min-w-[1200px] w-[-webkit-fill-available]'>
                    <div className='flex bg-gray-200 p-4 mb-0'>
                        <div className="w-1/6">Date</div>
                        <div className="w-2/6">Order Id</div>
                        <div className="w-1/6">Total</div>
                        <div className="w-1/6">Status</div>
                        <div className="w-1/6">Action</div>
                    </div>
                    {orders.map((order) => (
                    <OrdersCard key={order._id} {...order} />
                    ))}
                </div>        
            </div>
        </>
    )
};

export default OrdersList;
