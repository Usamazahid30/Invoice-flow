// import React from "react";
// import { useLocation } from "react-router-dom";
// import jsPDF from "jspdf";
// import "jspdf-autotable";

// const DetailInvoice = () => {
//   const location = useLocation();
//   const {
//     id,
//     To,
//     Phone,
//     Address,
//     Products,
//     totalAmount,
//     InvoiceNo,
//     PosNo,
//     CustomerNo,
//     paid,
//     GstNo,
//   } = location.state;

//   const currentDate = new Date().toLocaleDateString();
//   const totalAmountNumber = parseFloat(totalAmount);
//   const salesTaxRate = 0.18;
//   const salesTaxAmount = parseFloat(
//     (totalAmountNumber * salesTaxRate).toFixed(2)
//   );
//   const netAmount = parseFloat((totalAmountNumber + salesTaxAmount).toFixed(2));
//   const paidImageUrl = "../../paid.jpg"

//   const backgroundImageUrl = paid ? paidImageUrl : null;

//   const generateInvoicePDF = () => {
//     const doc = new jsPDF();

//     if (backgroundImageUrl) {
//       const img = new Image();
//       img.src = backgroundImageUrl;
//       img.onload = function () {
//         doc.addImage(img, "JPEG", 50, 40, 120, 277);
//         addContent(doc);
//       };
//     } else {
//       addContent(doc);
//     }
//   };

//   const addContent = (doc) => {
//     // doc.setFontSize(10);
//     doc.text("DELIVERY CHALLAN", 105, 20, { align: "center" });

//     doc.setFontSize(12);
//     doc.text(`Invoice NO. ${InvoiceNo}`, 20, 30);
//     doc.text(`Date: ${currentDate}`, 20, 35);
//     doc.text(`To: ${To}`, 20, 40);
//     doc.text(`Address: ${Address}`, 20, 45);

//     doc.text("Dear sir,", 20, 55);
//     doc.text(
//       `Thank you very much for your valued P.O#${PosNo}. We are pleased to deliver the following items.`,
//       20,
//       60
//     );

//     doc.autoTable({
//       startY: 70,
//       head: [["SR. #", "DESCRIPTION", "QTY"]],
//       body: Products.map((product, index) => [
//         index + 1,
//         product.name,
//         product.qty,
//       ]),
//     });

//     doc.text(
//       "Kindly acknowledge the receipt.",
//       20,
//       doc.autoTable.previous.finalY + 10
//     );
//     doc.text("Thanks with Regards,", 20, doc.autoTable.previous.finalY + 15);
//     doc.text(
//       "FOR: Al-MEHRIA ENGINEERING WORKS",
//       20,
//       doc.autoTable.previous.finalY + 20
//     );

//     doc.addPage();

//     doc.text("Commercial Invoice", 105, 20, { align: "center" });

//     doc.text(`INVOICE NO. ${InvoiceNo}`, 20, 30);
//     doc.text(`Date: ${currentDate}`, 20, 40);
//     doc.text(`To: ${To}`, 20, 50);
//     doc.text(`Address: ${Address}`, 20, 55);
//     doc.text(`P.O# ${PosNo}`, 20, 70);

//     doc.autoTable({
//       startY: 80,
//       head: [["SR.", "DESCRIPTION", "U.PRICE", "QTY.", "T.AMOUNT"]],
//       body: Products.map((product, index) => [
//         index + 1,
//         product.name,
//         product.price.toFixed(2),
//         product.qty,
//         (product.qty * product.price).toFixed(2),
//       ]),
//     });

//     doc.text(
//       `TOTAL AMOUNT: ${totalAmountNumber.toFixed(2)}-`,
//       20,
//       doc.autoTable.previous.finalY + 10
//     );
//     doc.text(
//       `SALES TAX AMOUNT: Rs ${salesTaxAmount.toFixed(2)}/-`,
//       20,
//       doc.autoTable.previous.finalY + 15
//     );
//     doc.text(
//       `NET AMOUNT: Rs. ${netAmount.toFixed(2)}/-`,
//       20,
//       doc.autoTable.previous.finalY + 20
//     );

//     doc.addPage();

//     doc.text("SALES TAX INVOICE", 105, 20, { align: "center" });

//     doc.text(`INVOICE NO. ${InvoiceNo}`, 20, 30);
//     doc.text(`Al- Mehria Engineering NTN# 2876495-1`, 20, 35);
//     doc.text(`Date: ${currentDate}`, 20, 40);
//     doc.text(`GST# 3277876212202`, 20, 45);
//     doc.text(`To: ${To}`, 20, 50);
//     doc.text(`Address: ${Address}`, 20, 55);
//     doc.text(`NTN# ${CustomerNo}`, 20, 60);
//     doc.text(`GST# ${GstNo}`, 20, 65);
//     doc.text(`P.O# ${PosNo}`, 20, 70);

//     doc.autoTable({
//       startY: 80,
//       head: [["SR.", "DESCRIPTION", "U.PRICE", "QTY.", "T.AMOUNT"]],
//       body: Products.map((product, index) => [
//         index + 1,
//         product.name,
//         product.price.toFixed(2),
//         product.qty,
//         (product.qty * product.price).toFixed(2),
//       ]),
//     });

//     doc.text(
//       `TOTAL AMOUNT: ${totalAmountNumber.toFixed(2)}-`,
//       20,
//       doc.autoTable.previous.finalY + 10
//     );
//     doc.text(
//       `SALES TAX AMOUNT: Rs ${salesTaxAmount.toFixed(2)}/-`,
//       20,
//       doc.autoTable.previous.finalY + 15
//     );
//     doc.text(
//       `NET AMOUNT: Rs. ${netAmount.toFixed(2)}/-`,
//       20,
//       doc.autoTable.previous.finalY + 20
//     );

//     doc.save(`Invoice_${InvoiceNo}.pdf`);
//   };

//   return (
//     <div className="p-8 bg-white rounded-lg shadow-md max-w-4xl mx-auto">
//       <h2 className="text-2xl font-bold mb-6">Invoice Details</h2>

//       <div className="mb-4">
//         <h3 className="text-lg font-semibold">NTN No:</h3>
//         <p>{CustomerNo}</p>
//       </div>
//       <div className="mb-4">
//         <h3 className="text-lg font-semibold">Company Name:</h3>
//         <p>{To}</p>
//       </div>

//       <div className="mb-4">
//         <h3 className="text-lg font-semibold">Invoice No:</h3>
//         <p>{InvoiceNo}</p>
//       </div>
//       <div className="mb-4">
//         <h3 className="text-lg font-semibold">Pos No:</h3>
//         <p>{PosNo}</p>
//       </div>

//       <div className="mb-4">
//         <h3 className="text-lg font-semibold">Phone:</h3>
//         <p>{Phone}</p>
//       </div>
//       <div className="mb-4">
//         <h3 className="text-lg font-semibold">Address:</h3>
//         <p>{Address}</p>
//       </div>

//       <div className="mb-4">
//         <h3 className="text-lg font-semibold">Products:</h3>
//         <table className="w-full border border-gray-300 rounded">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="px-4 py-2">S.No</th>
//               <th className="px-4 py-2">Description</th>
//               <th className="px-4 py-2">U.Price</th>
//               <th className="px-4 py-2">Quantity</th>
//               <th className="px-4 py-2">Total Amount</th>
//             </tr>
//           </thead>
//           <tbody>
//             {Products.map((product, index) => (
//               <tr key={index}>
//                 <td className="border px-4 py-2">{index + 1}</td>
//                 <td className="border px-4 py-2">{product.name}</td>
//                 <td className="border px-4 py-2">{product.price.toFixed(2)}</td>
//                 <td className="border px-4 py-2">{product.qty}</td>
//                 <td className="border px-4 py-2">
//                   {(product.qty * product.price).toFixed(2)}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="mb-4">
//         <h3 className="text-lg font-semibold">Total Amount:</h3>
//         <p>Rs. {totalAmountNumber.toFixed(2)}</p>
//       </div>

//       <div className="mb-4">
//         <h3 className="text-lg font-semibold">Sales Tax Amount:</h3>
//         <p>Rs. {salesTaxAmount.toFixed(2)}</p>
//       </div>

//       <div className="mb-4">
//         <h3 className="text-lg font-semibold">Net Amount:</h3>
//         <p>Rs. {netAmount.toFixed(2)}</p>
//       </div>

//       <div className="mb-4">
//         <h3 className="text-lg font-semibold">Status:</h3>
//         <p>{paid ? "Paid" : "Pending"}</p>
//       </div>

//       <button
//         onClick={generateInvoicePDF}
//         className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
//       >
//         Download Invoice
//       </button>
//     </div>
//   );
// };

// export default DetailInvoice;

import React from "react";
import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import "jspdf-autotable";

const DetailInvoice = () => {
  const location = useLocation();
  const {
    id,
    To,
    Phone,
    Address,
    Products,
    totalAmount,
    InvoiceNo,
    PosNo,
    CustomerNo,
    paid,
    GstNo,
  } = location.state;

  const currentDate = new Date().toLocaleDateString();
  const totalAmountNumber = parseFloat(totalAmount);
  const salesTaxRate = 0.18;
  const salesTaxAmount = parseFloat(
    (totalAmountNumber * salesTaxRate).toFixed(2)
  );
  const netAmount = parseFloat((totalAmountNumber + salesTaxAmount).toFixed(2));

  const paidImageUrl =
    "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEBLAEsAAD/4QBWRXhpZgAATU0AKgAAAAgABAEaAAUAAAABAAAAPgEbAAUAAAABAAAARgEoAAMAAAABAAIAAAITAAMAAAABAAEAAAAAAAAAAAEsAAAAAQAAASwAAAAB/+0ALFBob3Rvc2hvcCAzLjAAOEJJTQQEAAAAAAAPHAFaAAMbJUccAQAAAgAEAP/hDIFodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvADw/eHBhY2tldCBiZWdpbj0n77u/JyBpZD0nVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkJz8+Cjx4OnhtcG1ldGEgeG1sbnM6eD0nYWRvYmU6bnM6bWV0YS8nIHg6eG1wdGs9J0ltYWdlOjpFeGlmVG9vbCAxMC4xMCc+CjxyZGY6UkRGIHhtbG5zOnJkZj0naHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyc+CgogPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9JycKICB4bWxuczp0aWZmPSdodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyc+CiAgPHRpZmY6UmVzb2x1dGlvblVuaXQ+MjwvdGlmZjpSZXNvbHV0aW9uVW5pdD4KICA8dGlmZjpYUmVzb2x1dGlvbj4zMDAvMTwvdGlmZjpYUmVzb2x1dGlvbj4KICA8dGlmZjpZUmVzb2x1dGlvbj4zMDAvMTwvdGlmZjpZUmVzb2x1dGlvbj4KIDwvcmRmOkRlc2NyaXB0aW9uPgoKIDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PScnCiAgeG1sbnM6eG1wTU09J2h0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8nPgogIDx4bXBNTTpEb2N1bWVudElEPmFkb2JlOmRvY2lkOnN0b2NrOjJmYTQ0ZWIzLTA1OWMtNDE5OC1hOTZlLTU3MTQ5YjNiODIwZTwveG1wTU06RG9jdW1lbnRJRD4KICA8eG1wTU06SW5zdGFuY2VJRD54bXAuaWlkOjY3ODM2N2MzLTZhMjAtNDNjMy04NmUwLTJjNDUzMDQyYTVkMDwveG1wTU06SW5zdGFuY2VJRD4KIDwvcmRmOkRlc2NyaXB0aW9uPgo8L3JkZjpSREY+CjwveDp4bXBtZXRhPgogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgCiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAKICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIAo8P3hwYWNrZXQgZW5kPSd3Jz8+/9sAQwAFAwQEBAMFBAQEBQUFBgcMCAcHBwcPCwsJDBEPEhIRDxERExYcFxMUGhURERghGBodHR8fHxMXIiQiHiQcHh8e/9sAQwEFBQUHBgcOCAgOHhQRFB4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4e/8AAEQgBaAH9AwERAAIRAQMRAf/EABwAAQACAwEBAQAAAAAAAAAAAAAGCAQFBwEDAv/EAD4QAAIBAwMCBAUCBAQEBwEBAAECAwAEEQUSIQYxBxMiQQgUMlFhI3EVQoGRUqGxwSQzYnIW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FAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAwPtQDFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUAoBQCgFAKAUB//Z";

  const backgroundImageUrl = paid ? paidImageUrl : null;

  const generateInvoicePDF = () => {
    const doc = new jsPDF();

    if (backgroundImageUrl) {
      const img = new Image();
      img.src = backgroundImageUrl;
      img.onload = function () {
        addContent(doc, img);
      };
    } else {
      addContent(doc);
    }
  };

  const addContent = (doc, img) => {
    const width = doc.internal.pageSize.getWidth();
    const height = doc.internal.pageSize.getHeight();
    const imgWidth = 60; // Adjust the width of the image
    const imgHeight = 138; // Adjust the height of the image
    const x = (width - imgWidth) / 2; // Center horizontally
    const y = height - imgHeight - 10; // Position near the bottom with some margin

    const addBackgroundImage = () => {
      if (img) {
        doc.addImage(img, "JPEG", x, y, imgWidth, imgHeight, "", "FAST");
      }
    };

    addBackgroundImage();

    doc.text("DELIVERY CHALLAN", 105, 20, { align: "center" });

    doc.setFontSize(12);
    doc.text(`Invoice NO. ${InvoiceNo}`, 20, 30);
    doc.text(`Date: ${currentDate}`, 20, 35);
    doc.text(`To: ${To}`, 20, 40);
    doc.text(`Address: ${Address}`, 20, 45);

    doc.text("Dear sir,", 20, 55);
    doc.text(
      `Thank you very much for your valued P.O#${PosNo}. We are pleased to deliver the following items.`,
      20,
      60
    );

    doc.autoTable({
      startY: 70,
      head: [["SR. #", "DESCRIPTION", "QTY"]],
      body: Products.map((product, index) => [
        index + 1,
        product.name,
        product.qty,
      ]),
    });

    doc.text(
      "Kindly acknowledge the receipt.",
      20,
      doc.autoTable.previous.finalY + 10
    );
    doc.text("Thanks with Regards,", 20, doc.autoTable.previous.finalY + 15);
    doc.text(
      "FOR: Al-MEHRIA ENGINEERING WORKS",
      20,
      doc.autoTable.previous.finalY + 20
    );

    doc.addPage();
    addBackgroundImage();

    doc.text("Commercial Invoice", 105, 20, { align: "center" });

    doc.text(`INVOICE NO. ${InvoiceNo}`, 20, 30);
    doc.text(`Date: ${currentDate}`, 20, 40);
    doc.text(`To: ${To}`, 20, 50);
    doc.text(`Address: ${Address}`, 20, 55);
    doc.text(`P.O# ${PosNo}`, 20, 70);

    doc.autoTable({
      startY: 80,
      head: [["SR.", "DESCRIPTION", "U.PRICE", "QTY.", "T.AMOUNT"]],
      body: Products.map((product, index) => [
        index + 1,
        product.name,
        product.price.toFixed(2),
        product.qty,
        (product.qty * product.price).toFixed(2),
      ]),
    });

    doc.text(
      `TOTAL AMOUNT: ${totalAmountNumber.toFixed(2)}-`,
      20,
      doc.autoTable.previous.finalY + 10
    );
    doc.text(
      `SALES TAX AMOUNT: Rs ${salesTaxAmount.toFixed(2)}/-`,
      20,
      doc.autoTable.previous.finalY + 15
    );
    doc.text(
      `NET AMOUNT: Rs. ${netAmount.toFixed(2)}/-`,
      20,
      doc.autoTable.previous.finalY + 20
    );

    doc.addPage();
    addBackgroundImage();

    doc.text("SALES TAX INVOICE", 105, 20, { align: "center" });

    doc.text(`INVOICE NO. ${InvoiceNo}`, 20, 30);
    doc.text(`Al- Mehria Engineering NTN# 2876495-1`, 20, 35);
    doc.text(`Date: ${currentDate}`, 20, 40);
    doc.text(`GST# 3277876212202`, 20, 45);
    doc.text(`To: ${To}`, 20, 50);
    doc.text(`Address: ${Address}`, 20, 55);
    doc.text(`NTN# ${CustomerNo}`, 20, 60);
    doc.text(`GST# ${GstNo}`, 20, 65);
    doc.text(`P.O# ${PosNo}`, 20, 70);

    doc.autoTable({
      startY: 80,
      head: [["SR.", "DESCRIPTION", "U.PRICE", "QTY.", "T.AMOUNT"]],
      body: Products.map((product, index) => [
        index + 1,
        product.name,
        product.price.toFixed(2),
        product.qty,
        (product.qty * product.price).toFixed(2),
      ]),
    });

    doc.text(
      `TOTAL AMOUNT: ${totalAmountNumber.toFixed(2)}-`,
      20,
      doc.autoTable.previous.finalY + 10
    );
    doc.text(
      `SALES TAX AMOUNT: Rs ${salesTaxAmount.toFixed(2)}/-`,
      20,
      doc.autoTable.previous.finalY + 15
    );
    doc.text(
      `NET AMOUNT: Rs. ${netAmount.toFixed(2)}/-`,
      20,
      doc.autoTable.previous.finalY + 20
    );

    doc.save(`Invoice_${InvoiceNo}.pdf`);
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-md max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Invoice Details</h2>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">NTN No:</h3>
        <p>{CustomerNo}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Company Name:</h3>
        <p>{To}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Invoice No:</h3>
        <p>{InvoiceNo}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Pos No:</h3>
        <p>{PosNo}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Phone:</h3>
        <p>{Phone}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Address:</h3>
        <p>{Address}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Products:</h3>
        <table className="w-full border border-gray-300 rounded">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2">S.No</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">U.Price</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Total Amount</th>
            </tr>
          </thead>
          <tbody>
            {Products.map((product, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{index + 1}</td>
                <td className="border px-4 py-2">{product.name}</td>
                <td className="border px-4 py-2">{product.price.toFixed(2)}</td>
                <td className="border px-4 py-2">{product.qty}</td>
                <td className="border px-4 py-2">
                  {(product.qty * product.price).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold">Total Amount:</h3>
        <p>{totalAmountNumber.toFixed(2)} Rs</p>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-semibold">GST No:</h3>
        <p>{GstNo}</p>
      </div>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={generateInvoicePDF}
      >
        Download PDF
      </button>
    </div>
  );
};

export default DetailInvoice;