import DeliverAddressForm from "../delivery-address-form/delivery-address-form.component";


const DeliveryMethod = ({method, setMethod, deliveryAddress, handleChange}) => {
    return (
        <>
            <div className="w-full mt-8 py-6 pl-5 pr-5 lg:pr-12 lg:pl-40">
                <h2 className="font-bold text-2xl mb-6 w-full">Delivery Method</h2>
                <div className="delivery-method-container">
                    <div className="delivery-method-item">
                        <input
                            type="radio"
                            name="delivery-method"
                            id="delivery"
                            value="delivery"
                            checked={method === 'delivery'}
                            onChange={(e) => setMethod(e.target.value)}
                            disabled //Remove Later when delivery is availeble
                        />
                        <label htmlFor="delivery" >Delivery <span className="text-gray-500">(Coming Soon)</span></label> {/* //Remove Later when delivery is availeble */}
                    </div>
                    <div className="delivery-method-item">
                        <input
                            type="radio"
                            name="delivery-method"
                            id="pickup"
                            value="pickup"
                            checked={method === 'pickup'}
                            onChange={(e) => setMethod(e.target.value)}
                        />
                        <label htmlFor="pickup">Pickup</label>
                    </div>
                </div>
                {method === 'delivery' && (
                <DeliverAddressForm deliveryAddress={deliveryAddress} handleChange={handleChange}/>
                )}
            </div>
        </>
    )
}

export default DeliveryMethod;