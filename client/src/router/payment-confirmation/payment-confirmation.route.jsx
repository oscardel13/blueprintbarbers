import React from 'react';
import { Link } from 'react-router-dom';

const PaymentConfirmationPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4">Order Confirmed!</h2>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your order has been confirmed.
        </p>
        <div className="flex justify-end">
          <Link
            className="flex bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 h-12 items-center"
            to="/account"
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmationPage;
