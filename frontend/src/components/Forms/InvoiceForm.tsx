import React from "react";
import {FiDownload} from "react-icons/fi";

const InvoiceForm: React.FC = () => {
  // Dummy data for multiple rows
  const invoiceItems = [
    {
      id: 1,
      service: "Invoice Item 1",
      qty: 1,
      price: "4,000.00",
      total: "4,000.00",
    },
    {
      id: 2,
      service: "Invoice Item 2",
      qty: 2,
      price: "2,500.00",
      total: "5,000.00",
    },
    {
      id: 3,
      service: "Invoice Item 3",
      qty: 3,
      price: "1,000.00",
      total: "3,000.00",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      
      {/* Header and Body */}
      <div className="space-y-6">

        {/* Header */}
        <div className="flex items-center">
          <h2 className="text-xl font-bold mr-4">Download Invoice</h2>
          <button className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-black border border-gray-300 rounded-md hover:bg-gray-100 transition">
            <FiDownload className="text-lg" /> {/* Download Icon */}
          </button>
        </div>
        {/* Invoice Header */}
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex flex-col md:flex-row justify-between">
            <div>
              <h3 className="text-2xl font-bold">Invoice</h3>
              <p className="text-sm text-gray-600 mt-2">Billed To:</p>
              <p className="text-sm font-semibold text-black mt-2">
                Client Name
              </p>
              <p className="text-sm text-black">Address / Contact Info</p>
            </div>
            <div className="text-left md:text-right mt-4 md:mt-0">
              <p className="text-sm text-gray-600">
                <span>Invoice No.</span>
              </p>
              <p className="text-lg font-bold text-black">#000123</p>
              <p className="text-sm text-gray-600 mt-2">
                <span>Issued on:</span>
              </p>
              <p className="text-sm text-black">December 7, 2024</p>
              <p className="text-sm text-gray-600 mt-2">
                <span>Payment Due:</span>
              </p>
              <p className="text-sm text-black">December 22, 2024</p>
            </div>
          </div>
        </div>
        {/* Services Table */}
        <div>
          {/* Labels */}
          <div className="grid grid-cols-4 gap-4 font-semibold text-black text-sm border-b border-gray-200 pb-2">
            <p className="text-left">Services</p>
            <p className="text-center">Qty.</p>
            <p className="text-center">Price</p>
            <p className="text-center">Total</p>
          </div>

          {/* Data Rows */}
          {invoiceItems.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-4 gap-4 text-gray-600 border-b border-gray-200 py-2"
            >
              <p className="text-left">{item.service}</p>
              <p className="text-center">{item.qty}</p>
              <p className="text-center">{item.price}</p>
              <p className="text-center">{item.total}</p>
            </div>
          ))}
        </div>
        {/* Total */}
        <div className="flex justify-end border-t border-b border-gray-200 py-4">
          <div className="bg-gray-50 rounded-lg px-6 py-2 text-right">
            <p className="text-xl font-bold text-black">
              <span className="text-sm font-semibold text-gray-600 mr-4">
                Total (USD):
              </span>
              12,000.00
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-10 space-y-6 md:space-y-0 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Company Info */}
        <div className="text-sm text-gray-600">
          <p className="text-lg font-semibold mb-2 text-black">
            Company Name LLC
          </p>
          <p>Address / Contact Info</p>
          <p>email@company.com</p>
          <p className="mt-2">
            <span>ID#1 Label:</span>
          </p>
          <p className="text-black">1234567890-123</p>
          <p className="mt-2">
            <span>ID#2 Label:</span>
          </p>
          <p className="text-black">1234567890-123</p>
        </div>

        {/* Payment Instructions */}
        <div className="text-sm text-gray-600">
          <p className="font-semibold mb-2 text-black">Payment Instructions</p>
          <p>
            Voluptas nisi aut. Est vitae dolore molestias porro praesentium.
            Tempore recusandae voluptatem necessitatibus corporis inventore
            neque magnam ut.
          </p>
        </div>

        {/* Additional Notes */}
        <div className="text-sm text-gray-600">
          <p className="font-semibold mb-2 text-black">Additional Notes</p>
          <p>Have a great day</p>
        </div>
      </div>
    </div>
  );
};

export default InvoiceForm;
