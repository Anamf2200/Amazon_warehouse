import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  selectDashboardSummary,
  selectCategories
} from "../store/selectors";

import { logout } from "../api/userApi";

import StatCard from "../components/StatCard";

import {
  IconBox,
  IconTag,
  IconTruck,
  IconOrders,
  IconLayers,
  IconCash,
  IconTrendUp,
  IconWastage,
  IconClock,
  IconGauge,
  IconAlert
} from "../components/icons";

const money = (n) =>
  `Rs. ${Number(n || 0).toLocaleString("en-PK", {
    maximumFractionDigits: 0
  })}`;

export default function Dashboard() {

  const navigate = useNavigate();

  const summary = useSelector(selectDashboardSummary);
  const categories = useSelector(selectCategories);

  // =========================
  // LOGOUT
  // =========================

  const handleLogout = async () => {
    try {
      // Call backend logout API
      await logout();

      // Remove logged-in user
      localStorage.removeItem("user");

      // Redirect to login
      navigate("/login");

    } catch (error) {

      console.error("Logout failed:", error);

      // Even if backend logout fails,
      // clear local login and redirect
      localStorage.removeItem("user");

      navigate("/login");
    }
  };

  // =========================
  // CATEGORY
  // =========================

  const getCategoryById = (id) => {
    return categories.find((c) => c.id == id);
  };

  // =========================
  // DASHBOARD STATS
  // =========================

  const stats = [
    {
      icon: <IconBox />,
      label: "Total Products",
      value: summary.totalProducts,
      accent: "#ff9d2e",
      accentSoft: "rgba(255,157,46,.14)"
    },

    {
      icon: <IconTag />,
      label: "Categories",
      value: summary.totalCategories,
      accent: "#4da3ff",
      accentSoft: "rgba(77,163,255,.14)"
    },

    {
      icon: <IconTruck />,
      label: "Suppliers",
      value: summary.totalSuppliers,
      accent: "#4da3ff",
      accentSoft: "rgba(77,163,255,.14)"
    },

    {
      icon: <IconOrders />,
      label: "Total Orders",
      value: summary.totalOrders,
      accent: "#c084fc",
      accentSoft: "rgba(192,132,252,.16)"
    },

    {
      icon: <IconLayers />,
      label: "Units In Stock",
      value: summary.totalStock,
      accent: "#3ddc97",
      accentSoft: "rgba(61,220,151,.14)"
    },

    {
      icon: <IconCash />,
      label: "Revenue",
      value: money(summary.revenue),
      accent: "#ff9d2e",
      accentSoft: "rgba(255,157,46,.14)"
    },

    {
      icon: <IconTrendUp />,
      label: "Total Profit",
      value: money(summary.totalProfit),
      accent: "#3ddc97",
      accentSoft: "rgba(61,220,151,.14)"
    },

    {
      icon: <IconWastage />,
      label: "Wastage Loss",
      value: money(summary.totalLoss),
      accent: "#ff5470",
      accentSoft: "rgba(255,84,112,.14)"
    },

    {
      icon: <IconClock />,
      label: "Pending Orders",
      value: summary.pendingOrders,
      accent: "#ffc169",
      accentSoft: "rgba(255,157,46,.14)"
    },

    {
      icon: <IconGauge />,
      label: "Inventory Value",
      value: money(summary.inventoryValue),
      accent: "#4da3ff",
      accentSoft: "rgba(77,163,255,.14)"
    }
  ];

  return (
    <div>

      {/* =========================
          WAREHOUSE OVERVIEW
      ========================= */}

      <div className="toolbar">

        <div
          className="section-title"
          style={{
            marginBottom: 0,
            width: "100%"
          }}
        >

          <div>

            <h2 style={{ fontSize: 18 }}>
              Warehouse Overview
            </h2>

            <div className="hint">
              Live figures computed from the Redux store
            </div>

          </div>

          {/* LOGOUT BUTTON */}

          <button
            type="button"
            onClick={handleLogout}
            className="btn btn-outline-danger"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}
          >

            <i className="bi bi-box-arrow-right"></i>

            Logout

          </button>

        </div>

      </div>


      {/* =========================
          STAT CARDS
      ========================= */}

      <div className="stat-grid">

        {stats.map((s) => (
          <StatCard
            key={s.label}
            {...s}
          />
        ))}

      </div>


      {/* =========================
          LOW STOCK + SNAPSHOT
      ========================= */}

      <div className="grid-2">


        {/* =========================
            LOW STOCK ALERTS
        ========================= */}

        <div className="panel panel-pad">

          <div className="section-title">

            <div>

              <h2>
                Low Stock Alerts
              </h2>

              <div className="hint">
                Products at or below the reorder threshold
              </div>

            </div>

            <span className="badge badge-bad">

              <IconAlert
                style={{
                  width: 12,
                  height: 12
                }}
              />

              {summary.lowStockProducts.length}

            </span>

          </div>


          <div className="table-wrap">

            <table className="data-table">

              <thead>

                <tr>

                  <th>
                    Product
                  </th>

                  <th>
                    Category
                  </th>

                  <th>
                    Qty Left
                  </th>

                </tr>

              </thead>


              <tbody>

                {/* NO LOW STOCK PRODUCTS */}

                {summary.lowStockProducts.length === 0 && (

                  <tr className="empty-row">

                    <td colSpan={3}>
                      All stock levels look healthy.
                    </td>

                  </tr>

                )}


                {/* LOW STOCK PRODUCTS */}

                {summary.lowStockProducts.map((p) => {

                  const cat = getCategoryById(
                    p.categoryId
                  );

                  return (

                    <tr key={p.id}>

                      <td className="strong">
                        {p.name}
                      </td>

                      <td>
                        {cat
                          ? cat.name
                          : "—"}
                      </td>

                      <td>

                        <span className="badge badge-bad">
                          {p.quantity} left
                        </span>

                      </td>

                    </tr>

                  );

                })}

              </tbody>

            </table>

          </div>

        </div>


        {/* =========================
            SNAPSHOT
        ========================= */}

        <div className="panel panel-pad">

          <div className="section-title">

            <div>

              <h2>
                Snapshot
              </h2>

              <div className="hint">
                Quick health check across the floor
              </div>

            </div>

          </div>


          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 18
            }}
          >

            <SnapshotRow
              label="Wastage Events"
              value={summary.totalWastage}
            />

            <SnapshotRow
              label="Pending Orders"
              value={summary.pendingOrders}
              total={
                summary.totalOrders || 1
              }
            />

            <SnapshotRow
              label="Low Stock Items"
              value={
                summary.lowStockProducts.length
              }
              total={
                summary.totalProducts || 1
              }
            />

          </div>

        </div>

      </div>

    </div>
  );
}


/* =========================
   SNAPSHOT ROW
========================= */

function SnapshotRow({
  label,
  value,
  total
}) {

  const pct = total
    ? Math.min(
        100,
        Math.round(
          (value / total) * 100
        )
      )
    : 0;

  return (

    <div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 8,
          fontSize: 13
        }}
      >

        <span className="muted">
          {label}
        </span>

        <span
          className="strong"
          style={{
            color: "var(--text)"
          }}
        >
          {value}
        </span>

      </div>


      {total ? (

        <div className="progress-track">

          <div
            className="progress-fill"
            style={{
              width: `${pct}%`
            }}
          />

        </div>

      ) : null}

    </div>
  );
}