import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue, remove, update } from "firebase/database";
import { app } from "../../firebase";
import { useNavigate } from "react-router-dom";

const db = getDatabase(app);

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [searchCustomerNo, setSearchCustomerNo] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [invoiceToDelete, setInvoiceToDelete] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const invoicesRef = ref(db, "invoices");
    onValue(invoicesRef, (snapshot) => {
      const data = snapshot.val();
      const loadedInvoices = [];
      for (const key in data) {
        loadedInvoices.push({ id: key, ...data[key] });
      }
      setInvoices(loadedInvoices);
      setFilteredInvoices(loadedInvoices);
    });
  }, []);

  const confirmDeleteInvoice = (id) => {
    setShowModal(true);
    setInvoiceToDelete(id);
  };

  const deleteInvoice = () => {
    const invoiceRef = ref(db, `invoices/${invoiceToDelete}`);
    remove(invoiceRef)
      .then(() => {
        console.log("Invoice deleted successfully!");
        setShowModal(false);
        setInvoiceToDelete(null);
        setInvoices((prevInvoices) =>
          prevInvoices.filter((invoice) => invoice.id !== invoiceToDelete)
        );
        setFilteredInvoices((prevInvoices) =>
          prevInvoices.filter((invoice) => invoice.id !== invoiceToDelete)
        );
      })
      .catch((error) => {
        console.error("Error deleting invoice:", error);
      });
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchCustomerNo(value);
    if (value === "") {
      setFilteredInvoices(invoices);
    } else {
      setFilteredInvoices(
        invoices.filter((invoice) =>
          invoice.CustomerNo.toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  const groupedInvoices = filteredInvoices.reduce((groups, invoice) => {
    if (!groups[invoice.CustomerNo]) {
      groups[invoice.CustomerNo] = [];
    }
    groups[invoice.CustomerNo].push(invoice);
    return groups;
  }, {});

  const handlePaidToggle = (id, paid) => {
    const invoiceRef = ref(db, `invoices/${id}`);
    update(invoiceRef, { paid: !paid })
      .then(() => {
        console.log("Paid status updated successfully!");
      })
      .catch((error) => {
        console.error("Error updating paid status:", error);
      });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Invoices</h1>
      <div className="mb-4">
        <div className="flex items-center border border-gray-800 rounded">
          <i className="fa-solid fa-magnifying-glass p-2 text-gray-600"></i>
          <input
            type="text"
            placeholder="Search by NTN No"
            value={searchCustomerNo}
            onChange={handleSearchChange}
            className="font-bold p-2  focus:outline-none w-full"
          />
        </div>
      </div>
      {Object.keys(groupedInvoices).length === 0 ? (
        <p>No invoices found.</p>
      ) : (
        <table className="min-w-full bg-gray-200 border">
          <thead>
            <tr className="bg-gray-400">
              <th className="border px-4 py-2 text-left">NTN No</th>
              <th className="border px-4 py-2 text-left">Company Name</th>
              <th className="border px-4 py-2 text-left">Invoice No</th>
              <th className="border px-4 py-2 text-left">Total Amount</th>
              <th className="border px-4 py-2 text-left">Status</th>
              <th className="border px-4 py-2">Actions</th>
              <th className="border px-4 py-2">Paid</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(groupedInvoices).map((customerNo, groupIndex) => (
              <React.Fragment key={customerNo}>
                {groupedInvoices[customerNo].map((invoice, index) => (
                  <tr key={invoice.id}>
                    {index === 0 && (
                      <td
                        className="border px-4 py-2"
                        rowSpan={groupedInvoices[customerNo].length}
                      >
                        {customerNo}
                      </td>
                    )}
                    <td className="border px-4 py-2">{invoice.To}</td>
                    <td className="border px-4 py-2">{invoice.InvoiceNo}</td>
                    <td className="border px-4 py-2">{invoice.totalAmount}</td>
                    <td className="border px-4 py-2">
                      {invoice.paid ? "Paid" : "Pending"}
                    </td>
                    <td className="border px-4 py-2">
                      <div className="flex justify-center">
                        <button
                          onClick={() => confirmDeleteInvoice(invoice.id)}
                          className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded-md mr-2"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => {
                            navigate("/dashboard/invoicedetail", {
                              state: invoice,
                            });
                          }}
                          className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded-md ml-2"
                        >
                          View
                        </button>
                      </div>
                    </td>
                    <td className="border px-4 py-2 flex justify-center">
                      <input
                        type="checkbox"
                        checked={invoice.paid}
                        onChange={() =>
                          handlePaidToggle(invoice.id, invoice.paid)
                        }
                        className="form-checkbox h-5 w-5 text-green-500"
                      />
                    </td>
                  </tr>
                ))}
                {groupIndex < Object.keys(groupedInvoices).length - 1 && (
                  <tr key={`separator-${customerNo}`}>
                    <td colSpan="7" className="bg-white h-5"></td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      )}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Confirm Deletion</h2>
            <p className="mb-4">
              Are you sure you want to delete this invoice?
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={deleteInvoice}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Invoices;
