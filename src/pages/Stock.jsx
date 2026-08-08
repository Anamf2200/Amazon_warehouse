import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { stockIn, stockOut } from "../store/thunks";
import { IconArrowDown, IconArrowUp, IconInbox } from "../components/icons";

export default function Stock({ notify }) {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const stockInHistory = useSelector((state) => state.stockIn);
  const stockOutHistory = useSelector((state) => state.stockOut);

  const [tab, setTab] = useState("in");

  const [inForm, setInForm] = useState({ productId: "", quantity: "" });
  const [outForm, setOutForm] = useState({ productId: "", quantity: "" });
  const [inError, setInError] = useState("");
  const [outError, setOutError] = useState("");

  const productName = (id) => products.find((p) => p.id === id)?.name || "Deleted product";

  const submitIn = (e) => {
    e.preventDefault();
    setInError("");
    try {
      dispatch(stockIn(Number(inForm.productId), Number(inForm.quantity)));
      notify("Stock added");
      setInForm({ productId: "", quantity: "" });
    } catch (err) { setInError(err.message); }
  };

  const submitOut = (e) => {
    e.preventDefault();
    setOutError("");
    try {
      dispatch(stockOut(Number(outForm.productId), Number(outForm.quantity)));
      notify("Stock removed");
      setOutForm({ productId: "", quantity: "" });
    } catch (err) { setOutError(err.message); }
  };

  return (
    <div>
      <div className="grid-2 mb-16">
        <div className="panel panel-pad">
          <div className="section-title">
            <div><h2><IconArrowDown style={{ verticalAlign: "-3px", marginRight: 6, color: "var(--good)" }} />Stock In</h2><div className="hint">Receive inventory from a supplier delivery</div></div>
          </div>
          <form className="form-grid" onSubmit={submitIn}>
            {inError && <div className="form-error">{inError}</div>}
            <div className="field span-2">
              <label>Product</label>
              <select required value={inForm.productId} onChange={(e) => setInForm({ ...inForm, productId: e.target.value })}>
                <option value="">Select a product</option>
                {products.map((p) => <option key={p.id} value={p.id}>{p.name} — {p.quantity} in stock</option>)}
              </select>
            </div>
            <div className="field span-2">
              <label>Quantity Received</label>
              <input required type="number" min="1" value={inForm.quantity} onChange={(e) => setInForm({ ...inForm, quantity: e.target.value })} />
            </div>
            <div className="form-actions" style={{ marginTop: 4 }}>
              <button type="submit" className="btn btn-primary">Add Stock</button>
            </div>
          </form>
        </div>

        <div className="panel panel-pad">
          <div className="section-title">
            <div><h2><IconArrowUp style={{ verticalAlign: "-3px", marginRight: 6, color: "var(--bad)" }} />Stock Out</h2><div className="hint">Remove inventory for damage, transfer or manual pick</div></div>
          </div>
          <form className="form-grid" onSubmit={submitOut}>
            {outError && <div className="form-error">{outError}</div>}
            <div className="field span-2">
              <label>Product</label>
              <select required value={outForm.productId} onChange={(e) => setOutForm({ ...outForm, productId: e.target.value })}>
                <option value="">Select a product</option>
                {products.map((p) => <option key={p.id} value={p.id}>{p.name} — {p.quantity} in stock</option>)}
              </select>
            </div>
            <div className="field span-2">
              <label>Quantity Removed</label>
              <input required type="number" min="1" value={outForm.quantity} onChange={(e) => setOutForm({ ...outForm, quantity: e.target.value })} />
            </div>
            <div className="form-actions" style={{ marginTop: 4 }}>
              <button type="submit" className="btn btn-danger">Remove Stock</button>
            </div>
          </form>
        </div>
      </div>

      <div className="panel panel-pad">
        <div className="pill-tabs">
          <button className={`pill-tab${tab === "in" ? " active" : ""}`} onClick={() => setTab("in")}>Stock In History</button>
          <button className={`pill-tab${tab === "out" ? " active" : ""}`} onClick={() => setTab("out")}>Stock Out History</button>
        </div>

        <div className="table-wrap">
          <table className="data-table">
            <thead><tr><th>Product</th><th>Quantity</th><th>Date</th></tr></thead>
            <tbody>
              {(tab === "in" ? stockInHistory : stockOutHistory).length === 0 && (
                <tr className="empty-row"><td colSpan={3}>
                  <div className="empty-state"><IconInbox /><div>No {tab === "in" ? "stock-in" : "stock-out"} records yet.</div></div>
                </td></tr>
              )}
              {(tab === "in" ? stockInHistory : stockOutHistory).slice().reverse().map((r) => (
                <tr key={r.id}>
                  <td className="strong">{productName(r.productId)}</td>
                  <td><span className={`badge ${tab === "in" ? "badge-good" : "badge-bad"}`}>{tab === "in" ? "+" : "-"}{r.quantity}</span></td>
                  <td className="muted">{r.date ? new Date(r.date).toLocaleString() : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
