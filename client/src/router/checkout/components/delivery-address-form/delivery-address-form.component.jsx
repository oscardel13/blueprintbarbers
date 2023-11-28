

const DeliverAddressForm = ({deliveryAddress, handleChange, handleSubmit }) => {
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
                    value={deliveryAddress.country}
                    className="mt-1 p-2 border rounded-md w-full"
                    onChange={handleChange}
                    required
                />
                </div>
                <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-600">
                    First Name Last Name
                </label>
                <div className="grid lg:grid-cols-2 lg:space-x-2">
                    <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={deliveryAddress.firstName}
                    className="mt-1 p-2 flex-1 border rounded-md"
                    placeholder="First Name"
                    onChange={handleChange}
                    required
                    />
                    <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={deliveryAddress.lastName}
                    className="mt-1 p-2 flex-1 border rounded-md"
                    placeholder="Last Name"
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
                    id="address"
                    name="address"
                    value={deliveryAddress.address}
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
                    id="apartment"
                    name="apartment"
                    placeholder="Optional"
                    value={deliveryAddress.apartment}
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
                    id="zipCode"
                    name="zipCode"
                    value={deliveryAddress.zipCode}
                    className="mt-1 p-2 flex border rounded-md"
                    placeholder="Zip Code"
                    onChange={handleChange}
                    required
                    />
                </div>
                </div>
                <div className="mb-4">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-600">
                    Phone
                </label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="Phone"
                    value={deliveryAddress.phone}
                    className="mt-1 p-2 border rounded-md w-full"
                    onChange={handleChange}
                    required
                />
                </div>
            </form>
        </>
    )
}

export default DeliverAddressForm;