import { useCallback, useRef, useState } from "react";
import "./App.css";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Suppliers from "./pages/Suppliers";
import Orders from "./pages/Orders";
import Stock from "./pages/Stock";
import Wastage from "./pages/Wastage";
import Reports from "./pages/Reports";

import Login from "./pages/Login";
import Register from "./pages/Register";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";

const TITLES = {
  dashboard: [
    "Dashboard",
    "Real-time snapshot of the entire warehouse",
  ],
  products: [
    "Products",
    "Manage SKUs, pricing and category assignment",
  ],
  categories: [
    "Categories",
    "Organize the catalogue into groups",
  ],
  suppliers: [
    "Suppliers",
    "Vendors who keep the shelves stocked",
  ],
  orders: [
    "Orders",
    "Customer orders and automatic stock deduction",
  ],
  stock: [
    "Stock In / Out",
    "Track every unit moving through the door",
  ],
  wastage: [
    "Wastage",
    "Log damaged or lost inventory",
  ],
  reports: [
    "Reports",
    "Raw data across every module",
  ],
};

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* AUTH PAGES */}
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* DASHBOARD / APPLICATION */}
        <Route
          path="/dashboard"
          element={
            <WarehouseApp>
              <Dashboard />
            </WarehouseApp>
          }
        />

        <Route
          path="/products"
          element={
            <WarehouseApp>
              <Products />
            </WarehouseApp>
          }
        />

        <Route
          path="/categories"
          element={
            <WarehouseApp>
              <Categories />
            </WarehouseApp>
          }
        />

        <Route
          path="/suppliers"
          element={
            <WarehouseApp>
              <Suppliers />
            </WarehouseApp>
          }
        />

        <Route
          path="/orders"
          element={
            <WarehouseApp>
              <Orders />
            </WarehouseApp>
          }
        />

        <Route
          path="/stock"
          element={
            <WarehouseApp>
              <Stock />
            </WarehouseApp>
          }
        />

        <Route
          path="/wastage"
          element={
            <WarehouseApp>
              <Wastage />
            </WarehouseApp>
          }
        />

        <Route
          path="/reports"
          element={
            <WarehouseApp>
              <Reports />
            </WarehouseApp>
          }
        />

        {/* DEFAULT */}
        <Route
          path="/"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />

        <Route
          path="*"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />

      </Routes>
    </BrowserRouter>
  );
}


function WarehouseApp({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [toast, setToast] = useState(null);

  const timerRef = useRef(null);

  const notify = useCallback(
    (message, type = "success") => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }

      setToast({
        message,
        type,
      });

      timerRef.current = setTimeout(() => {
        setToast(null);
      }, 2600);
    },
    []
  );


  // Determine active page from URL
  const active =
    location.pathname
      .replace("/", "") || "dashboard";


  const [title, sub] =
    TITLES[active] || TITLES.dashboard;


  // Sidebar navigation
  const handleNavigation = (page) => {
    navigate(`/${page}`);
  };


  return (
    <div className="shell">

      {/* SIDEBAR */}
      <Sidebar
        active={active}
        onChange={handleNavigation}
      />


      {/* MAIN AREA */}
      <div className="stage">

        {/* TOP BAR */}
        <div className="topbar">

          <div>

            <h1>
              {title}
            </h1>

            <div className="sub">
              {sub}
            </div>

          </div>


          <div className="topbar-right">

            <span className="badge badge-mute">
              localStorage
            </span>

          </div>

        </div>


        {/* PAGE CONTENT */}
        <div className="content">

          {children}

        </div>

      </div>


      {/* TOAST */}
      {toast && (
        <div
          className={`toast${
            toast.type === "error"
              ? " error"
              : ""
          }`}
        >

          <span className="dot" />

          {toast.message}

        </div>
      )}

    </div>
  );
}


export default App;