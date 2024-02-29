import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

import PageHeader from "../../components/page-header/page-header.component";
import ItemCard from "./components/item-card.component";

import { getAPI } from "../../utils/api";


const OrderPage = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState({products:[]})
    useEffect(() => {
        const fetchOrder = async () => {
            try{
                const res = await getAPI(`/orders/${orderId}`)
                setOrder(res.data)
            }
            catch(err){
                console.log(err)
            }
        }
        fetchOrder()
    },[])

    const totalCost = () => {
        var total = order.total + order.shippingCost + order.salesTax
        return (total / 100.00).toFixed(2)
    }
    return (
        <div className="flex flex-col min-h-screen bg-gray-300 py-5 pl-3 pr-3 sm:px-5 md:px-24 lg:px-48">
            <PageHeader title="Order" />
            <h5>Orderd on {new Date(order.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                        })}
            </h5>
            <h5>Status: {order.status}</h5>
            <br/>
            <div className="flex flex-row border-solid border-black border-1 rounded-md bg-gray-200 py-4 px-4 sm:px-5 max-w-7xl">
                <div className="flex-auto flex flex-col">   
                    {
                        order.shipping && order.shipping.address ? 
                            <>
                                <p className="text-gray-600 font-semibold text-lg">Shipping Address:</p>
                                <div className="flex-col">
                                    <p>{order.shipping.address.line1}</p>
                                    <p>{order.shipping.address.line2}</p>
                                    <p>{order.shipping.address.city}, {order.shipping.address.state}, {order.shipping.address.postal_code}</p>
                                    <p>{order.shipping.address.country}</p>
                                </div>
                            </> 
                        :   
                            <div className="max-w-28">
                                <p className="text-gray-600 font-semibold text-lg">Pick up:</p>
                                <a className="underline text-blue-700 flex-col" href="https://www.google.com/maps/search/?api=1&query=11178+Huron+St,+Suite+200,+Northglenn+CO+80234" target="_blank">
                                    <p>11178 Huron St</p>
                                    <p>Suite 200</p>
                                    <p>Northglenn, CO 80234</p>
                                    <p>United States</p>
                                </a>
                            </div>
                    }    
                </div>
                <div className="flex-auto flex flex-col text-gray-800">
                    <h5 className="text-gray-600 font-semibold text-lg">Order Summary</h5>
                    <div className="flex flex-row justify-between">
                        <span>Item Total: </span>
                        <span>${(order.total/ 100.00).toFixed(2)}</span>
                    </div>

                    <div className="flex flex-row justify-between">
                        <span>Sales Tax: </span>
                        <span>${(order.salesTax / 100).toFixed(2)}</span>
                    </div>
                    
                    <div className="flex flex-row justify-between">
                        <span>Shipping: </span>
                        {
                            order.shipping ? 
                            <span>${(order.shipping.cost / 100.00).toFixed(2)}</span> :
                            <span>$0.00</span>
                            
                        }
                    </div>
                    <div className="flex flex-row justify-between">
                        <span>Total: </span>
                        <span>{totalCost()}</span>
                    </div>
                </div>
                
            </div>
            <br/>
            <div className="border-solid border-black border-1 rounded-md bg-gray-200 p-4 space-y-5 max-w-7xl">
                <h3 className="text-xl font-semibold">Items</h3>
                <br/>
                {order.products.map((product) => 
                    <ItemCard product={product} key={product._id}/>
                )}
            </div>
        </div>
    )
}

export default OrderPage;