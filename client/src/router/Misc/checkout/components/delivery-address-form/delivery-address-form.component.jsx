const DeliverAddressForm = ({deliveryAddress, handleChange}) => {
    return (
        <>
            <h2 className="text-2xl font-bold mb-6 mt-10">Delivery Address</h2>
            <form>
                <div className="mb-4">
                <label htmlFor="country" className="block text-sm font-medium text-gray-600">
                    Country/Region
                </label>
                <input
                    type="text"
                    id="country"
                    name="country"
                    placeholder="Country/Region"
                    value={deliveryAddress.country}
                    className="mt-1 p-2 border rounded-md w-full"
                    onChange={handleChange}
                    required
                />
                </div>
                <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-600">
                    Name
                </label>
                <div className="grid lg:space-x-2">
                    <input
                    type="text"
                    id="name"
                    name="name"
                    value={deliveryAddress.name}
                    className="mt-1 p-2 flex-1 border rounded-md"
                    placeholder="Name"
                    onChange={handleChange}
                    required
                    />
                </div>
                </div>
                <div className="mb-4">
                <label htmlFor="address" className="block text-sm font-medium text-gray-600">
                    Address
                </label>
                <input
                    type="text"
                    id="line1"
                    name="line1"
                    value={deliveryAddress.line1}
                    placeholder="Address"
                    className="mt-1 p-2 border rounded-md w-full"
                    onChange={handleChange}
                />
                </div>
                <div className="mb-4">
                <label htmlFor="apartment" className="block text-sm font-medium text-gray-600">
                    Apartment
                </label>
                <input
                    type="text"
                    id="line2"
                    name="line2"
                    placeholder="Optional"
                    value={deliveryAddress.line2}
                    className="mt-1 p-2 border rounded-md w-full"
                    onChange={handleChange}
                />
                </div>
                <div className="mb-4">
                <label htmlFor="city" className="block text-sm font-medium text-gray-600">
                    City, State, Zip Code
                </label>
                <div className="grid lg:grid-cols-3 lg:space-x-2">
                    <input
                    type="text"
                    id="city"
                    name="city"
                    value={deliveryAddress.city}
                    className="mt-1 p-2 border rounded-md max-w-2/3"
                    placeholder="City"
                    onChange={handleChange}
                    required
                    />
                    <input
                    type="text"
                    id="state"
                    name="state"
                    value={deliveryAddress.state}
                    className="mt-1 p-2 flex border rounded-md"
                    placeholder="State"
                    onChange={handleChange}
                    required
                    />
                    <input
                    type="text"
                    id="postal_code"
                    name="postal_code"
                    value={deliveryAddress.postal_code}
                    className="mt-1 p-2 flex border rounded-md"
                    placeholder="Zip Code"
                    onChange={handleChange}
                    required
                    />
                </div>
                </div>
            </form>
        </>
    )
}

export default DeliverAddressForm;