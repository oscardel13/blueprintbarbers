import { useState } from "react"
import DeliverAddressForm from "../delivery-address-form/delivery-address-form.component";


const DeliveryMethod = () => {
    const [method, setMethod] = useState('delivery')
    const [deliveryAddress, setDeliveryAddress] = useState({
        country: '',
        firstName: '',
        lastName: '',
        address: '',
        apartment: '',
        city: '',
        state: '',
        zipCode: '',
        phone: '',
      })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDeliveryAddress((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic with deliveryAddress
        console.log('Form submitted:', deliveryAddress);
      };

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
                        />
                        <label htmlFor="delivery" >Delivery</label>
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
                <DeliverAddressForm deliveryAddress={deliveryAddress} handleChange={handleChange} handleSubmit={handleSubmit}/>
                )}
            </div>
        </>
    )
}

export default DeliveryMethod;