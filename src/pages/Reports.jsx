import { useContext, useEffect, useState } from "react";
import { WarehouseContext } from "../context/WarehouseContext";
import { IconReport } from "../components/icons";

const TABS = [
  { key: "orders", label: "Orders" },
  { key: "products", label: "Products" },
  { key: "categories", label: "Categories" },
  { key: "suppliers", label: "Suppliers" },
  { key: "stockIn", label: "Stock In" },
  { key: "stockOut", label: "Stock Out" },
  { key: "wastage", label: "Wastage" },
];

export default function Reports() {
  const {
    getOrdersReport, getProductReport, getCategoryReport, getSupplierReport,
    getStockInReport, getStockOutReport, getWestageReport, getProduct,
  } = useContext(WarehouseContext);

  const [tab, setTab] = useState("orders");
  const [products, setProducts] = useState([]);

  useEffect(() => { setProducts(getProduct()); /* eslint-disable-next-line */ }, []);

  const productName = (id) => products.find((p) => p.id === id)?.name || "Deleted product";

  const data = {
    orders: getOrdersReport(),
    products: getProductReport(),
    categories: getCategoryReport(),
    suppliers: getSupplierReport(),
    stockIn: getStockInReport(),
    stockOut: getStockOutReport(),
    wastage: getWestageReport(),
  }[tab];

  return (
    <div>
      <div className="section-title">
        <div><h2 style={{ fontSize: 18 }}>Reports</h2><div className="hint">Raw records straight from local storage, by module</div></div>
      </div>

      <div className="pill-tabs">
        {TABS.map((t) => (
          <button key={t.key} className={`pill-tab${tab === t.key ? " active" : ""}`} onClick={() => setTab(t.key)}>{t.label}</button>
        ))}
      </div>

      <div className="panel">
        <div className="table-wrap">
          {tab === "orders" && (
            <table className="data-table">
              <thead><tr><th>Order</th><th>Product</th><th>Customer</th><th>Qty</th><th>Total</th><th>Profit</th><th>Status</th><th>Date</th></tr></thead>
              <tbody>
                {renderEmpty(data)}
                {data.map((o) => (
                  <tr key={o.id}>
                    <td className="mono">#{String(o.id).slice(-6)}</td>
                    <td className="strong">{productName(o.productId)}</td>
                    <td>{o.customerName || "Walk-in"}</td>
                    <td>{o.quantity}</td>
                    <td className="mono">Rs. {Number(o.total || 0).toLocaleString()}</td>
                    <td className="mono">Rs. {Number(o.profit || 0).toLocaleString()}</td>
                    <td><span className="badge badge-amber">{o.status || "Pending"}</span></td>
                    <td className="muted">{o.date ? new Date(o.date).toLocaleDateString() : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {tab === "products" && (
            <table className="data-table">
              <thead><tr><th>Name</th><th>SKU</th><th>Barcode</th><th>Cost</th><th>Price</th><th>Qty</th></tr></thead>
              <tbody>
                {renderEmpty(data)}
                {data.map((p) => (
                  <tr key={p.id}>
                    <td className="strong">{p.name}</td>
                    <td className="mono">{p.sku}</td>
                    <td className="mono">{p.barcode}</td>
                    <td className="mono">Rs. {Number(p.costPrice).toLocaleString()}</td>
                    <td className="mono">Rs. {Number(p.sellingPrice).toLocaleString()}</td>
                    <td>{p.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {tab === "categories" && (
            <table className="data-table">
              <thead><tr><th>Name</th><th>Description</th></tr></thead>
              <tbody>
                {renderEmpty(data)}
                {data.map((c) => (
                  <tr key={c.id}><td className="strong">{c.name}</td><td className="muted">{c.description || "—"}</td></tr>
                ))}
              </tbody>
            </table>
          )}

          {tab === "suppliers" && (
            <table className="data-table">
              <thead><tr><th>Name</th><th>Contact</th><th>Phone</th><th>Email</th></tr></thead>
              <tbody>
                {renderEmpty(data)}
                {data.map((s) => (
                  <tr key={s.id}>
                    <td className="strong">{s.name}</td><td>{s.contactPerson || "—"}</td>
                    <td className="mono">{s.phone || "—"}</td><td className="muted">{s.email || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {(tab === "stockIn" || tab === "stockOut") && (
            <table className="data-table">
              <thead><tr><th>Product</th><th>Quantity</th><th>Date</th></tr></thead>
              <tbody>
                {renderEmpty(data)}
                {data.map((r) => (
                  <tr key={r.id}>
                    <td className="strong">{productName(r.productId)}</td>
                    <td>{r.quantity}</td>
                    <td className="muted">{r.date ? new Date(r.date).toLocaleString() : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {tab === "wastage" && (
            <table className="data-table">
              <thead><tr><th>Product</th><th>Quantity</th><th>Loss</th><th>Date</th></tr></thead>
              <tbody>
                {renderEmpty(data)}
                {data.map((r) => (
                  <tr key={r.id}>
                    <td className="strong">{productName(r.productId)}</td>
                    <td>{r.quantity}</td>
                    <td className="mono" style={{ color: "var(--bad)" }}>Rs. {Number(r.loss || 0).toLocaleString()}</td>
                    <td className="muted">{r.date ? new Date(r.date).toLocaleString() : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

function renderEmpty(data) {
  if (data && data.length) return null;
  return (
    <tr className="empty-row"><td colSpan={8}>
      <div className="empty-state"><IconReport /><div>No records in this report yet.</div></div>
    </td></tr>
  );
}
