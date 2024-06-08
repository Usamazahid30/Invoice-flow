// import React, { useEffect, useState } from "react";
// import { getDatabase, ref, onValue } from "firebase/database";
// import { app } from "../../firebase";
// import { Bar } from "react-chartjs-2";
// import "chart.js/auto"; // Automatically register chart components

// const db = getDatabase(app);

// const Home = () => {
//   const [invoices, setInvoices] = useState([]);
//   const [totalInvoices, setTotalInvoices] = useState(0);
//   const [totalPendingInvoices, setTotalPendingInvoices] = useState(0);
//   const [totalPaidInvoices, setTotalPaidInvoices] = useState(0);
//   const [totalAmount, setTotalAmount] = useState(0);
//   const [companyAmounts, setCompanyAmounts] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const invoicesRef = ref(db, "invoices");
//     const unsubscribe = onValue(
//       invoicesRef,
//       (snapshot) => {
//         const data = snapshot.val();
//         const loadedInvoices = [];
//         let total = 0;
//         let pending = 0;
//         let paid = 0;
//         let amount = 0;
//         let companyAmounts = {};

//         for (const key in data) {
//           const invoice = { id: key, ...data[key] };
//           loadedInvoices.push(invoice);
//           total++;
//           if (invoice.paid) {
//             paid++;
//           } else {
//             pending++;
//           }
//           amount += parseFloat(invoice.totalAmount);

//           // Calculate total amount per company
//           if (companyAmounts[invoice.To]) {
//             companyAmounts[invoice.To] += parseFloat(invoice.totalAmount);
//           } else {
//             companyAmounts[invoice.To] = parseFloat(invoice.totalAmount);
//           }
//         }

//         setInvoices(loadedInvoices);
//         setTotalInvoices(total);
//         setTotalPendingInvoices(pending);
//         setTotalPaidInvoices(paid);
//         setTotalAmount(amount);
//         setCompanyAmounts(companyAmounts);
//         setLoading(false);
//       },
//       (error) => {
//         setError(error);
//         setLoading(false);
//       }
//     );

//     return () => unsubscribe();
//   }, []);

//   const invoiceCountData = {
//     labels: ["Total Invoices", "Paid Invoices", "Pending Invoices"],
//     datasets: [
//       {
//         label: "# of Invoices",
//         data: [totalInvoices, totalPaidInvoices, totalPendingInvoices],
//         backgroundColor: [
//           "rgba(75, 192, 192, 0.6)",
//           "rgba(54, 162, 235, 0.6)",
//           "rgba(255, 99, 132, 0.6)",
//         ],
//         borderColor: [
//           "rgba(75, 192, 192, 1)",
//           "rgba(54, 162, 235, 1)",
//           "rgba(255, 99, 132, 1)",
//         ],
//         borderWidth: 1,
//       },
//     ],
//   };

//   const companyAmountData = {
//     labels: Object.keys(companyAmounts),
//     datasets: [
//       {
//         label: "Total Amount",
//         data: Object.values(companyAmounts),
//         backgroundColor: "rgba(153, 102, 255, 0.6)",
//         borderColor: "rgba(153, 102, 255, 1)",
//         borderWidth: 1,
//       },
//     ],
//   };

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>Error loading data: {error.message}</p>;
//   }

//   return (
//     <div className="p-8">
//       <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
//         <InfoBox
//           title="Total Invoices"
//           value={totalInvoices}
//           bgColor="from-green-400 to-blue-500"
//         />
//         <InfoBox
//           title="Pending Invoices"
//           value={totalPendingInvoices}
//           bgColor="from-red-400 to-yellow-500"
//         />
//         <InfoBox
//           title="Paid Invoices"
//           value={totalPaidInvoices}
//           bgColor="from-blue-400 to-indigo-500"
//         />
//         <InfoBox
//           title="Total Amount"
//           value={`${totalAmount.toFixed(2)}`}
//           bgColor="from-purple-400 to-pink-500"
//         />
//       </div>
//       <div className="bg-white p-6 rounded-lg shadow-md mb-6">
//         <Bar data={invoiceCountData} />
//       </div>
//       <div className="bg-white p-6 rounded-lg shadow-md">
//         <Bar data={companyAmountData} />
//       </div>
//     </div>
//   );
// };

// const InfoBox = ({ title, value, bgColor }) => (
//   <div
//     className={`p-6 bg-gradient-to-r ${bgColor} text-white rounded-lg shadow-md`}
//   >
//     <h2 className="text-xl font-bold">{title}</h2>
//     <p className="text-3xl">{value}</p>
//   </div>
// );

// export default Home;

import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue } from "firebase/database";
import { app } from "../../firebase";
import { Bar } from "react-chartjs-2";
import "chart.js/auto"; // Automatically register chart components

const db = getDatabase(app);

const Home = () => {
  const [invoices, setInvoices] = useState([]);
  const [totalInvoices, setTotalInvoices] = useState(0);
  const [totalPendingInvoices, setTotalPendingInvoices] = useState(0);
  const [totalPaidInvoices, setTotalPaidInvoices] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [companyAmounts, setCompanyAmounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const invoicesRef = ref(db, "invoices");
    const unsubscribe = onValue(
      invoicesRef,
      (snapshot) => {
        const data = snapshot.val();
        const loadedInvoices = [];
        let total = 0;
        let pending = 0;
        let paid = 0;
        let amount = 0;
        let companyAmounts = {};

        for (const key in data) {
          const invoice = { id: key, ...data[key] };
          loadedInvoices.push(invoice);
          total++;
          if (invoice.paid) {
            paid++;
          } else {
            pending++;
          }
          amount += parseFloat(invoice.totalAmount);

          // Calculate total amount per company
          if (companyAmounts[invoice.To]) {
            companyAmounts[invoice.To] += parseFloat(invoice.totalAmount);
          } else {
            companyAmounts[invoice.To] = parseFloat(invoice.totalAmount);
          }
        }

        setInvoices(loadedInvoices);
        setTotalInvoices(total);
        setTotalPendingInvoices(pending);
        setTotalPaidInvoices(paid);
        setTotalAmount(amount);
        setCompanyAmounts(companyAmounts);
        setLoading(false);
      },
      (error) => {
        setError(error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const recentInvoices = invoices.slice(-5).reverse(); // Get the most recent 5 invoices

  const invoiceCountData = {
    labels: ["Total Invoices", "Paid Invoices", "Pending Invoices"],
    datasets: [
      {
        label: "# of Invoices",
        data: [totalInvoices, totalPaidInvoices, totalPendingInvoices],
        backgroundColor: [
          "rgba(75, 192, 192, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 99, 132, 0.6)",
        ],
        borderColor: [
          "rgba(75, 192, 192, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 99, 132, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const companyAmountData = {
    labels: Object.keys(companyAmounts),
    datasets: [
      {
        label: "Total Amount",
        data: Object.values(companyAmounts),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
        borderColor: "rgba(153, 102, 255, 1)",
        borderWidth: 1,
      },
    ],
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen ">
        <i class="fa-solid fa-spinner"></i>
      </div>
    );
  }

  if (error) {
    return <p>Error loading data: {error.message}</p>;
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <InfoBox
          title="Total Invoices"
          value={totalInvoices}
          bgColor="from-green-400 to-blue-500"
        />
        <InfoBox
          title="Pending Invoices"
          value={totalPendingInvoices}
          bgColor="from-red-400 to-yellow-500"
        />
        <InfoBox
          title="Paid Invoices"
          value={totalPaidInvoices}
          bgColor="from-blue-400 to-indigo-500"
        />
        <InfoBox
          title="Total Amount"
          value={`${totalAmount.toFixed(2)}`}
          bgColor="from-purple-400 to-pink-500"
        />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-bold mb-4">Recent Invoices</h2>
        <div className="grid grid-cols-1 gap-4">
          {recentInvoices.map((invoice) => (
            <div
              key={invoice.id}
              className="p-4 border rounded-lg shadow-md bg-gradient-to-r from-blue-200 to-blue-400"
            >
              <h3 className="text-xl font-semibold">
                Invoice No : {invoice.InvoiceNo}
              </h3>
              <p className="text-sm">Company: {invoice.To}</p>
              <p className="text-sm">Total Amount: {invoice.totalAmount}</p>
              <p className="text-sm">
                Status: {invoice.paid ? "Paid" : "Pending"}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <Bar data={invoiceCountData} />
      </div> */}

      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">
          Revenue Breakdown by Company
        </h2>

        <Bar data={companyAmountData} />
      </div>
    </div>
  );
};

const InfoBox = ({ title, value, bgColor }) => (
  <div
    className={`p-6 bg-gradient-to-r ${bgColor} text-white rounded-lg shadow-md`}
  >
    <h2 className="text-xl font-bold">{title}</h2>
    <p className="text-3xl">{value}</p>
  </div>
);

export default Home;
