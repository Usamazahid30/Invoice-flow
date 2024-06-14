import React, { useState, useEffect } from "react";
import { getDatabase, ref, push, get, child } from "firebase/database";
import { app } from "../../firebase";
import { useNavigate } from "react-router-dom";

const db = getDatabase(app);

const NewInvoice = () => {
  const [to, setTo] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState(1);
  const [products, setProducts] = useState([]);
  const [customerNumber, setCustomerNumber] = useState("");
  const [invoiceNo, setInvoiceNo] = useState("");
  const [posNo, setPosNo] = useState("");
  const [gstNo, setGstNo] = useState("");
  const [unit, setUnit] = useState("");
  const [invoices, setInvoices] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchInvoices = async () => {
      const dbRef = ref(db);
      const snapshot = await get(child(dbRef, "invoices"));
      if (snapshot.exists()) {
        const data = snapshot.val();
        const invoiceList = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setInvoices(invoiceList);
      }
    };

    fetchInvoices();
  }, []);

  const handleAddProduct = () => {
    if (name && price && qty) {
      setProducts([
        ...products,
        { name, price: parseFloat(price), qty: parseInt(qty) },
      ]);
      setName("");
      setPrice("");
      setQty(1);
    }
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value) && value.length <= 10) {
      setPrice(value);
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) && value.length <= 11) {
      setPhone(value);
    }
  };

  const getTotalAmount = () => {
    return products.reduce(
      (total, product) => total + product.price * product.qty,
      0
    );
  };

  const handleSave = () => {
    const invoicesRef = ref(db, "invoices");

    const invoiceData = {
      GstNo: gstNo,
      CustomerNo: customerNumber,
      InvoiceNo: invoiceNo,
      PosNo: posNo,
      To: to,
      Phone: phone,
      Address: address,
      Unit: unit,
      Products: products,
      totalAmount: getTotalAmount().toFixed(2),
    };
    push(invoicesRef, invoiceData)
      .then(() => {
        console.log("Invoice data saved successfully!");
        navigate("/dashboard/invoices");
      })
      .catch((error) => {
        console.log("Error saving invoice data:", error);
      });
  };

  const handleInvoiceSelect = (e) => {
    const selectedInvoiceId = e.target.value;
    const selectedInvoice = invoices.find(
      (invoice) => invoice.id === selectedInvoiceId
    );

    if (selectedInvoice) {
      setCustomerNumber(selectedInvoice.CustomerNo);
      setGstNo(selectedInvoice.GstNo);
      setAddress(selectedInvoice.Address);
      setTo(selectedInvoice.To);
    }
  };

  const handleClear = () => {
    setCustomerNumber("");
    setGstNo("");
    setAddress("");
    setTo("");
    setPhone("");
    setInvoiceNo("");
    setPosNo("");
    setName("");
    setPrice("");
    setQty(1);
    setUnit("");
    setProducts([]);
    document.getElementById("customerDropdown").value = "";
  };

  const getUniqueNTNs = (invoices) => {
    const seen = new Set();
    return invoices.filter((invoice) => {
      const duplicate = seen.has(invoice.CustomerNo);
      seen.add(invoice.CustomerNo);
      return !duplicate;
    });
  };

  return (
    <div className="flex justify-center items-end min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-center font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-800 mb-8 mt-2">
          NEW INVOICE
        </h1>
        <div className="flex justify-between mb-4">
          <select
            id="customerDropdown"
            onChange={handleInvoiceSelect}
            className="w-full border border-gray-300 rounded-md py-2 px-4 placeholder-gray-400 focus:outline-none focus:border-blue-500"
          >
            <option value="">Select existing customer</option>
            {getUniqueNTNs(invoices).map((invoice) => (
              <option key={invoice.id} value={invoice.id}>
                {invoice.CustomerNo}
              </option>
            ))}
          </select>
          <button
            className="ml-2 bg-red-500 text-white font-semibold py-2 px-4 rounded-md transition duration-300 hover:bg-red-600 focus:outline-none focus:bg-red-600"
            type="button"
            onClick={handleClear}
          >
            Clear
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <input
            onChange={(e) => setCustomerNumber(e.target.value)}
            className="w-full border border-gray-300 rounded-md py-2 px-4 placeholder-gray-400 focus:outline-none focus:border-blue-500"
            type="text"
            placeholder="NTN Number"
            value={customerNumber}
          />
          <input
            onChange={(e) => setGstNo(e.target.value)}
            className="w-full border border-gray-300 rounded-md py-2 px-4 placeholder-gray-400 focus:outline-none focus:border-blue-500"
            type="text"
            placeholder="GST No"
            value={gstNo}
          />
          <input
            onChange={(e) => setInvoiceNo(e.target.value)}
            className="w-full border border-gray-300 rounded-md py-2 px-4 placeholder-gray-400 focus:outline-none focus:border-blue-500"
            type="text"
            placeholder="Invoice No"
            value={invoiceNo}
          />
          <input
            onChange={(e) => setPosNo(e.target.value)}
            className="w-full border border-gray-300 rounded-md py-2 px-4 placeholder-gray-400 focus:outline-none focus:border-blue-500"
            type="text"
            placeholder="PO No"
            value={posNo}
          />
          <input
            onChange={(e) => setTo(e.target.value)}
            className="w-full border border-gray-300 rounded-md py-2 px-4 placeholder-gray-400 focus:outline-none focus:border-blue-500 col-span-2"
            type="text"
            placeholder="Company Name"
            value={to}
          />

          <input
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border border-gray-300 rounded-md py-2 px-4 placeholder-gray-400 focus:outline-none focus:border-blue-500 col-span-2"
            type="text"
            placeholder="Address"
            value={address}
          />
          <input
            onChange={handlePhoneChange}
            className="w-full border border-gray-300 rounded-md py-2 px-4 placeholder-gray-400 focus:outline-none focus:border-blue-500"
            type="text"
            placeholder="Phone"
            value={phone}
          />

          <input
            onChange={(e) => setUnit(e.target.value)}
            className="w-full border border-gray-300 rounded-md py-2 px-4 placeholder-gray-400 focus:outline-none focus:border-blue-500"
            type="text"
            placeholder="Unit"
            value={unit}
          />
          <input
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-md py-2 px-4 placeholder-gray-400 focus:outline-none focus:border-blue-500 col-span-2"
            type="text"
            placeholder="Product Name"
            value={name}
          />
          <input
            onChange={handlePriceChange}
            className="w-full border border-gray-300 rounded-md py-2 px-4 placeholder-gray-400 focus:outline-none focus:border-blue-500"
            type="text"
            placeholder="Price"
            value={price}
          />
          <input
            onChange={(e) => setQty(e.target.value)}
            className="w-full border border-gray-300 rounded-md py-2 px-4 placeholder-gray-400 focus:outline-none focus:border-blue-500"
            type="text"
            placeholder="Quantity"
            value={qty}
          />
        </div>
        <div>
          <button
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md transition duration-300 hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            type="button"
            onClick={handleAddProduct}
          >
            Add Product
          </button>
        </div>
        {products.length > 0 && (
          <div className="mt-8 overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Product Name
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Price
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Quantity
                  </th>
                  <th className="border border-gray-300 px-4 py-2 text-left">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-4 py-2">
                      {product.name}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {product.price.toFixed(2)}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {product.qty}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {(product.price * product.qty).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className="mt-16 border-t border-gray-500 pt-4 text-right">
          <span className="font-bold text-xl text-blue-700">
            Total Amount: {getTotalAmount().toFixed(2)}
          </span>
        </div>
        <div className="mt-8">
          <button
            className={`w-full py-2 rounded-md transition duration-300 focus:outline-none 
          ${
            products.length === 0
              ? "bg-gray-300  cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600 text-white"
          }`}
            type="button"
            onClick={handleSave}
            disabled={products.length === 0}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewInvoice;
