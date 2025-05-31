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
import Maintainance from "./components/login/maintain";
function App() {
  const myRouter = createBrowserRouter([
    { path: "", Component: Login },
    { path: "/login", Component: Login },
    { path: "/register", Component: Register },
    // { path: "", Component: Maintainance },
    // { path: "/login", Component: Maintainance },

    {
      path: "/dashboard",
      Component: Dashboard,
      // Component: Maintainance,
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
