// import React, { useEffect, useState } from "react";
// import { getDatabase, ref, onValue, remove, update } from "firebase/database";
// import { app } from "../../firebase";
// import { useNavigate } from "react-router-dom";
// import jsPDF from "jspdf";
// import "jspdf-autotable";

// const db = getDatabase(app);

// const Invoices = () => {
//   const [invoices, setInvoices] = useState([]);
//   const [filteredInvoices, setFilteredInvoices] = useState([]);
//   const [searchCustomerNo, setSearchCustomerNo] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [invoiceToDelete, setInvoiceToDelete] = useState(null);
//   const [selectedInvoices, setSelectedInvoices] = useState({});

//   const navigate = useNavigate();

//   useEffect(() => {
//     const invoicesRef = ref(db, "invoices");
//     onValue(invoicesRef, (snapshot) => {
//       const data = snapshot.val();
//       const loadedInvoices = [];
//       for (const key in data) {
//         loadedInvoices.push({ id: key, ...data[key] });
//       }
//       setInvoices(loadedInvoices);
//       setFilteredInvoices(loadedInvoices);
//     });
//   }, []);

//   const confirmDeleteInvoice = (id) => {
//     setShowModal(true);
//     setInvoiceToDelete(id);
//   };

//   const deleteInvoice = () => {
//     const invoiceRef = ref(db, `invoices/${invoiceToDelete}`);
//     remove(invoiceRef)
//       .then(() => {
//         console.log("Invoice deleted successfully!");
//         setShowModal(false);
//         setInvoiceToDelete(null);
//         setInvoices((prevInvoices) =>
//           prevInvoices.filter((invoice) => invoice.id !== invoiceToDelete)
//         );
//         setFilteredInvoices((prevInvoices) =>
//           prevInvoices.filter((invoice) => invoice.id !== invoiceToDelete)
//         );
//       })
//       .catch((error) => {
//         console.error("Error deleting invoice:", error);
//       });
//   };

//   const handleSearchChange = (e) => {
//     const value = e.target.value;
//     setSearchCustomerNo(value);
//     if (value === "") {
//       setFilteredInvoices(invoices);
//     } else {
//       setFilteredInvoices(
//         invoices.filter((invoice) =>
//           invoice.CustomerNo.toLowerCase().includes(value.toLowerCase())
//         )
//       );
//     }
//   };

//   const groupedInvoices = filteredInvoices.reduce((groups, invoice) => {
//     if (!groups[invoice.CustomerNo]) {
//       groups[invoice.CustomerNo] = [];
//     }
//     groups[invoice.CustomerNo].push(invoice);
//     return groups;
//   }, {});

//   const handlePaidToggle = (id, paid) => {
//     const invoiceRef = ref(db, `invoices/${id}`);
//     update(invoiceRef, { paid: !paid })
//       .then(() => {
//         console.log("Paid status updated successfully!");
//       })
//       .catch((error) => {
//         console.error("Error updating paid status:", error);
//       });
//   };

//   const handleSelectInvoice = (customerNo, id) => {
//     setSelectedInvoices((prevSelected) => {
//       const customerSelected = prevSelected[customerNo] || [];
//       if (customerSelected.includes(id)) {
//         return {
//           ...prevSelected,
//           [customerNo]: customerSelected.filter(
//             (invoiceId) => invoiceId !== id
//           ),
//         };
//       } else {
//         return {
//           ...prevSelected,
//           [customerNo]: [...customerSelected, id],
//         };
//       }
//     });
//   };

//   const generateSelectedInvoicesPDF = (customerNo, PosNo) => {
//     const selected = groupedInvoices[customerNo].filter((invoice) =>
//       selectedInvoices[customerNo].includes(invoice.id)
//     );

//     if (selected.length === 0) return;

//     const doc = new jsPDF();
//     doc.setFontSize(12);
//     doc.text("Attn", 20, 20);
//     doc.text("Purchase/Accounts Department", 20, 25);
//     doc.text(`Date ${new Date().toLocaleDateString()}`, 150, 25);
//     doc.text(`M/S. ${selected[0].To}`, 20, 35); // Assuming same recipient for selected invoices
//     doc.text("Korangi Industrial Area", 20, 40);
//     doc.text("KARACHI", 20, 45);
//     doc.text(
//       "Kindly arrange the payment as soon as possible against this pending invoices Update ledger",
//       20,
//       55
//     );
//     doc.text("REMINDER PAYMENT PENDING REQUIRED MONTH OF", 20, 65);
//     doc.text("March/April/May/September Old Bill 2023", 20, 70);
//     doc.text("AGAINST JOB ORDER Bill", 20, 75);
//     doc.text("Pending Invoices Payment Required", 20, 85);
//     doc.text("Sr.# Invoice No /Date Po No. Total payment Due", 20, 95);

//     const invoiceData = selected.map((invoice, index) => [
//       index + 1,
//       invoice.InvoiceNo,
//       invoice.PosNo,
//       `Rs.${invoice.totalAmount}/-`,
//     ]);

//     doc.autoTable({
//       startY: 100,
//       head: [["Sr.#", "Invoice No /Date", "Po No.", "Total payment Due"]],
//       body: invoiceData,
//       margin: { top: 95 },
//       headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0] },
//     });

//     doc.text("Thanks With Regards .", 20, 140 + 10 * invoiceData.length);
//     doc.text(
//       "Zain Ul Abideen .Cell.03032155063 / 03062772260",
//       20,
//       145 + 10 * invoiceData.length
//     );

//     doc.save(`selected_invoices_${customerNo}.pdf`);
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl font-bold mb-4">Invoices</h1>
//       <div className="mb-4">
//         <div className="flex items-center border border-gray-800 rounded">
//           <i className="fa-solid fa-magnifying-glass p-2 text-gray-600"></i>
//           <input
//             type="text"
//             placeholder="Search by NTN No"
//             value={searchCustomerNo}
//             onChange={handleSearchChange}
//             className="font-bold p-2 focus:outline-none w-full"
//           />
//         </div>
//       </div>
//       {Object.keys(groupedInvoices).length === 0 ? (
//         <p>No invoices found.</p>
//       ) : (
//         <table className="min-w-full bg-gray-200 border">
//           <thead>
//             <tr className="bg-gray-400">
//               <th className="border px-4 py-2 text-left">NTN No</th>
//               <th className="border px-4 py-2 text-left w-1/3">Company Name</th>
//               <th className="border px-4 py-2 text-left">Invoice No</th>
//               <th className="border px-4 py-2 text-left">Total Amount</th>
//               <th className="border px-4 py-2 text-left">Status</th>
//               <th className="border px-4 py-2">Actions</th>
//               <th className="border px-4 py-2">Select</th>
//               <th className="border px-4 py-2">Paid</th>
//             </tr>
//           </thead>
//           <tbody>
//             {Object.keys(groupedInvoices).map((customerNo, groupIndex) => (
//               <React.Fragment key={customerNo}>
//                 {groupedInvoices[customerNo].map((invoice, index) => (
//                   <tr key={invoice.id}>
//                     {index === 0 && (
//                       <td
//                         className="border px-4 py-2"
//                         rowSpan={groupedInvoices[customerNo].length}
//                       >
//                         {customerNo}
//                       </td>
//                     )}
//                     <td className="border px-4 py-2 w-1/3">{invoice.To}</td>
//                     <td className="border px-4 py-2">{invoice.InvoiceNo}</td>
//                     <td className="border px-4 py-2">{invoice.totalAmount}</td>
//                     <td className="border px-4 py-2">
//                       {invoice.paid ? "Paid" : "Pending"}
//                     </td>
//                     <td className="border px-4 py-2">
//                       <div className="flex justify-center">
//                         <button
//                           onClick={() => confirmDeleteInvoice(invoice.id)}
//                           className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded-md"
//                         >
//                           <i className="fa-solid fa-trash"></i>
//                         </button>
//                         <button
//                           onClick={() => {
//                             navigate("/dashboard/invoicedetail", {
//                               state: invoice,
//                             });
//                           }}
//                           className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-md ml-1"
//                         >
//                           <i className="fa-regular fa-eye"></i>
//                         </button>
//                         {index === 0 && (
//                           <button
//                             onClick={() =>
//                               generateSelectedInvoicesPDF(customerNo)
//                             }
//                             className="bg-gray-500 hover:bg-green-600 text-white py-1 px-3 rounded-md ml-1"
//                           >
//                             <i className="fa-solid fa-download"></i>
//                           </button>
//                         )}
//                       </div>
//                     </td>

//                     <td className="border px-4 py-2 flex justify-center items-center mt-3">
//                       <input
//                         type="checkbox"
//                         checked={
//                           selectedInvoices[customerNo]?.includes(invoice.id) ||
//                           false
//                         }
//                         onChange={() =>
//                           handleSelectInvoice(customerNo, invoice.id)
//                         }
//                         className="form-checkbox h-5 w-5 text-blue-600"
//                       />
//                     </td>
//                     <td className="border px-4 py-2 flex justify-center items-center ">
//                       <input
//                         type="checkbox"
//                         checked={invoice.paid}
//                         onChange={() =>
//                           handlePaidToggle(invoice.id, invoice.paid)
//                         }
//                         className="form-checkbox h-5 w-5 text-blue-600"
//                       />
//                     </td>
//                   </tr>
//                 ))}
//               </React.Fragment>
//             ))}
//           </tbody>
//         </table>
//       )}
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
//           <div className="bg-white p-8 rounded shadow-md">
//             <p>Are you sure you want to delete this invoice?</p>
//             <div className="mt-4 flex justify-end">
//               <button
//                 onClick={deleteInvoice}
//                 className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md mr-2"
//               >
//                 Delete
//               </button>
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Invoices;

import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue, remove, update } from "firebase/database";
import { app } from "../../firebase";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

const db = getDatabase(app);

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);
  const [searchCustomerNo, setSearchCustomerNo] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [invoiceToDelete, setInvoiceToDelete] = useState(null);
  const [selectedInvoices, setSelectedInvoices] = useState({});

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

  const handleSelectInvoice = (customerNo, id) => {
    setSelectedInvoices((prevSelected) => {
      const customerSelected = prevSelected[customerNo] || [];
      if (customerSelected.includes(id)) {
        return {
          ...prevSelected,
          [customerNo]: customerSelected.filter(
            (invoiceId) => invoiceId !== id
          ),
        };
      } else {
        return {
          ...prevSelected,
          [customerNo]: [...customerSelected, id],
        };
      }
    });
  };

  const generateSelectedInvoicesPDF = (customerNo) => {
    const selected = groupedInvoices[customerNo].filter((invoice) =>
      selectedInvoices[customerNo].includes(invoice.id)
    );

    if (selected.length === 0) return;

    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text("Attn", 20, 40);
    doc.text("Purchase/Accounts Department", 20, 45);
    doc.text(`Date ${new Date().toLocaleDateString()}`, 150, 45);
    doc.text(`M/S. ${selected[0].To}`, 20, 55);
    doc.text(`${selected[0].Address}`, 20, 60);
    doc.text(
      "Kindly arrange the payment as soon as possible against this pending invoices Update ledger",
      20,
      75
    );
    // doc.text("REMINDER PAYMENT PENDING REQUIRED MONTH OF", 20, 65);
    // doc.text("March/April/May/September Old Bill 2023", 20, 70);
    // doc.text("AGAINST JOB ORDER Bill", 20, 75);
    // doc.text("Pending Invoices Payment Required", 20, 85);

    doc.text(
      "Pending Invoices Payment Required",
      doc.internal.pageSize.width / 2,
      90,
      { align: "center" }
    );
    doc.setLineWidth(0.5);
    doc.line(
      doc.internal.pageSize.width / 2 - 40,
      92,
      doc.internal.pageSize.width / 2 + 40,
      92
    ); // Underline

    const invoiceData = selected.map((invoice, index) => [
      index + 1,
      invoice.InvoiceNo,
      invoice.PosNo,
      `Rs.${invoice.totalAmount}/-`,
    ]);

    doc.autoTable({
      startY: 100,
      head: [["Sr.#", "Invoice No /Date", "Po No.", "Total payment Due"]],
      body: invoiceData,
      margin: { top: 95 },
      headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0] },
    });

    doc.text("Thanks With Regards .", 20, 140 + 10 * invoiceData.length);
    doc.text(
      "Zain Ul Abideen .Cell.03032155063 / 03062772260",
      20,
      145 + 10 * invoiceData.length
    );

    doc.save(`selected_invoices_${customerNo}.pdf`);
  };

  return (
    <div className="p-6  min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Invoices
      </h1>
      <div className="mb-6 flex justify-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by NTN No"
            value={searchCustomerNo}
            onChange={handleSearchChange}
            className="p-2 rounded border border-gray-800 focus:outline-none w-full"
          />
          <i className="fa-solid fa-magnifying-glass absolute right-2 top-3 text-gray-600"></i>
        </div>
      </div>
      {Object.keys(groupedInvoices).length === 0 ? (
        <p className="text-center text-gray-600">No invoices found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="py-2 px-4 text-left">NTN No</th>
                <th className="py-2 px-4 text-left w-1/3">Company Name</th>
                <th className="py-2 px-4 text-left">Invoice No</th>
                <th className="py-2 px-4 text-left">Total Amount</th>
                <th className="py-2 px-4 text-left">Status</th>
                <th className="py-2 px-4 text-center">Actions</th>
                <th className="py-2 px-4 text-center">Select</th>
                <th className="py-2 px-4 text-center">Paid</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(groupedInvoices).map((customerNo) => (
                <React.Fragment key={customerNo}>
                  {groupedInvoices[customerNo].map((invoice, index) => (
                    <tr key={invoice.id} className="hover:bg-gray-300">
                      {index === 0 && (
                        <td
                          className="py-2 px-4 border-t border-gray-200"
                          rowSpan={groupedInvoices[customerNo].length}
                        >
                          {customerNo}
                        </td>
                      )}
                      <td className="py-2 px-4 border-t border-gray-200 w-1/3">
                        {invoice.To}
                      </td>
                      <td className="py-2 px-4 border-t border-gray-200">
                        {invoice.InvoiceNo}
                      </td>
                      <td className="py-2 px-4 border-t border-gray-200">
                        {invoice.totalAmount}
                      </td>
                      <td className="py-2 px-4 border-t border-gray-200">
                        {invoice.paid ? "Paid" : "Pending"}
                      </td>
                      <td className="py-2 px-4 border-t border-gray-200 text-center">
                        <div className="flex justify-center items-center">
                          <button
                            onClick={() => confirmDeleteInvoice(invoice.id)}
                            className="bg-red-500 hover:bg-red-600 text-white py-1 px-2 rounded mr-2"
                            title="Delete"
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                          <button
                            onClick={() => {
                              navigate("/dashboard/invoicedetail", {
                                state: invoice,
                              });
                            }}
                            className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded mr-2"
                            title="View Details"
                          >
                            <i className="fa-regular fa-eye"></i>
                          </button>
                          {index === 0 && (
                            <button
                              onClick={() =>
                                generateSelectedInvoicesPDF(customerNo)
                              }
                              className="bg-gray-500 hover:bg-green-600 text-white py-1 px-2 rounded"
                              title="Download Selected Invoices"
                            >
                              <i className="fa-solid fa-download"></i>
                            </button>
                          )}
                        </div>
                      </td>
                      <td className="py-2 px-4 border-t border-gray-200 text-center">
                        <input
                          type="checkbox"
                          checked={
                            selectedInvoices[customerNo]?.includes(
                              invoice.id
                            ) || false
                          }
                          onChange={() =>
                            handleSelectInvoice(customerNo, invoice.id)
                          }
                          className="form-checkbox h-5 w-5 text-blue-600"
                        />
                      </td>
                      <td className="py-2 px-4 border-t border-gray-200 text-center">
                        <input
                          type="checkbox"
                          checked={invoice.paid}
                          onChange={() =>
                            handlePaidToggle(invoice.id, invoice.paid)
                          }
                          className="form-checkbox h-5 w-5 text-blue-600"
                        />
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
          <div className="bg-white p-8 rounded shadow-md">
            <p className="text-center text-gray-700">
              Are you sure you want to delete this invoice?
            </p>
            <div className="mt-4 flex justify-center">
              <button
                onClick={deleteInvoice}
                className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md mr-2"
              >
                Delete
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-4 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Invoices;
