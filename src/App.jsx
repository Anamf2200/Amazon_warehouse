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

const TITLES = {
  dashboard: ["Dashboard", "Real-time snapshot of the entire warehouse"],
  products: ["Products", "Manage SKUs, pricing and category assignment"],
  categories: ["Categories", "Organize the catalogue into groups"],
  suppliers: ["Suppliers", "Vendors who keep the shelves stocked"],
  orders: ["Orders", "Customer orders and automatic stock deduction"],
  stock: ["Stock In / Out", "Track every unit moving through the door"],
  wastage: ["Wastage", "Log damaged or lost inventory"],
  reports: ["Reports", "Raw data across every module"],
};

function App() {
  const [active, setActive] = useState("dashboard");
  const [toast, setToast] = useState(null);
  const timerRef = useRef(null);

  const notify = useCallback((message, type = "success") => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setToast({ message, type });
    timerRef.current = setTimeout(() => setToast(null), 2600);
  }, []);

  const [title, sub] = TITLES[active];

  return (
    <div className="shell">
      <Sidebar active={active} onChange={setActive} />

      <div className="stage">
        <div className="topbar">
          <div>
            <h1>{title}</h1>
            <div className="sub">{sub}</div>
          </div>
          <div className="topbar-right">
            <span className="badge badge-mute">localStorage</span>
          </div>
        </div>

        <div className="content">
          {active === "dashboard" && <Dashboard />}
          {active === "products" && <Products notify={notify} />}
          {active === "categories" && <Categories notify={notify} />}
          {active === "suppliers" && <Suppliers notify={notify} />}
          {active === "orders" && <Orders notify={notify} />}
          {active === "stock" && <Stock notify={notify} />}
          {active === "wastage" && <Wastage notify={notify} />}
          {active === "reports" && <Reports />}
        </div>
      </div>

      {toast && (
        <div className={`toast${toast.type === "error" ? " error" : ""}`}>
          <span className="dot" />
          {toast.message}
        </div>
      )}
    </div>
  );
}

export default App;
