import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Dashboard from "./components/dashboard/Dashboard";
import Home from "./components/dashboard/Home";
import Invoices from "./components/dashboard/Invoices";
import NewInvoice from "./components/dashboard/NewInvoice";
import Setting from "./components/dashboard/Setting";
import DetailInvoice from "./components/dashboard/DetailInvoice";

function App() {
  const myRouter = createBrowserRouter([
    { path: "", Component: Login },
    { path: "/login", Component: Login },
    { path: "/register", Component: Register },
    {
      path: "/dashboard",
      Component: Dashboard,
      children: [
        { path: "", Component: Home },
        { path: "home", Component: Home },
        { path: "invoices", Component: Invoices },
        { path: "newinvoice", Component: NewInvoice },
        { path: "setting", Component: Setting },
        { path: "invoicedetail", Component: DetailInvoice },
      ],
    },
  ]);
  return (
    <div className="App">
      <RouterProvider router={myRouter}></RouterProvider>
    </div>
  );
}

export default App;

// import React from "react";
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   useLocation,
// } from "react-router-dom";
// import "./App.css";
// import Login from "./components/login/Login";
// import Register from "./components/register/Register";
// import Dashboard from "./components/dashboard/Dashboard";
// import Home from "./components/dashboard/Home";
// import Invoices from "./components/dashboard/Invoices";
// import NewInvoice from "./components/dashboard/NewInvoice";
// import Setting from "./components/dashboard/Setting";
// import DetailInvoice from "./components/dashboard/DetailInvoice";
// import IdleTimeoutHandler from "./components/IdleTimeoutHandler";

// function App() {
//   return (
//     <Router>
//       <AppContent />
//     </Router>
//   );
// }

// function AppContent() {
//   const location = useLocation();
//   const isIdleTimeoutActive = !location.pathname.startsWith("/login"); // Check if not on login page

//   return (
//     <div className="App">
//       {isIdleTimeoutActive && <IdleTimeoutHandler />}{" "}
//       {/* Conditionally render IdleTimeoutHandler */}
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/dashboard/*" element={<Dashboard />}>
//           <Route path="home" element={<Home />} />
//           <Route path="invoices" element={<Invoices />} />
//           <Route path="newinvoice" element={<NewInvoice />} />
//           <Route path="setting" element={<Setting />} />
//           <Route path="invoicedetail" element={<DetailInvoice />} />
//         </Route>
//         <Route path="*" element={<Login />} />{" "}
//         {/* Fallback route for unknown paths */}
//       </Routes>
//     </div>
//   );
// }

// export default App;
