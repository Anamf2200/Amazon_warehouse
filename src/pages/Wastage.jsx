import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { wastage } from "../store/thunks";
import { IconWastage } from "../components/icons";

export default function Wastage({ notify }) {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const history = useSelector((state) => state.wastage);

  const [form, setForm] = useState({ productId: "", quantity: "" });
  const [error, setError] = useState("");

  const productName = (id) => products.find((p) => p.id === id)?.name || "Deleted product";

  const submit = (e) => {
    e.preventDefault();
    setError("");
    try {
      dispatch(wastage(Number(form.productId), Number(form.quantity)));
      notify("Wastage recorded");
      setForm({ productId: "", quantity: "" });
    } catch (err) { setError(err.message); }
  };

  const totalLoss = history.reduce((sum, r) => sum + Number(r.loss || 0), 0);

  return (
    <div>
      <div className="grid-2 mb-16">
        <div className="panel panel-pad">
          <div className="section-title">
            <div><h2>Record Wastage</h2><div className="hint">Damaged, expired or lost inventory</div></div>
          </div>
          <form className="form-grid" onSubmit={submit}>
            {error && <div className="form-error">{error}</div>}
            <div className="field span-2">
              <label>Product</label>
              <select required value={form.productId} onChange={(e) => setForm({ ...form, productId: e.target.value })}>
                <option value="">Select a product</option>
                {products.map((p) => <option key={p.id} value={p.id}>{p.name} — {p.quantity} in stock</option>)}
              </select>
            </div>
            <div className="field span-2">
              <label>Quantity</label>
              <input required type="number" min="1" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
            </div>
            <div className="form-actions" style={{ marginTop: 4 }}>
              <button type="submit" className="btn btn-danger">Record Wastage</button>
            </div>
          </form>
        </div>

        <div className="stat-card" style={{ "--accent": "#ff5470", "--accent-soft": "rgba(255,84,112,.14)", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div className="icon-wrap"><IconWastage /></div>
          <div className="label">Total Wastage Loss</div>
          <div className="value">Rs. {totalLoss.toLocaleString()}</div>
          <div className="muted" style={{ marginTop: 10, fontSize: 12.5 }}>{history.length} recorded event{history.length === 1 ? "" : "s"}</div>
        </div>
      </div>

      <div className="panel panel-pad">
        <div className="section-title">
          <div><h2>Wastage History</h2><div className="hint">All recorded losses, most recent first</div></div>
        </div>
        <div className="table-wrap">
          <table className="data-table">
            <thead><tr><th>Product</th><th>Quantity</th><th>Loss</th><th>Date</th></tr></thead>
            <tbody>
              {history.length === 0 && (
                <tr className="empty-row"><td colSpan={4}>
                  <div className="empty-state"><IconWastage /><div>No wastage recorded yet.</div></div>
                </td></tr>
              )}
              {history.slice().reverse().map((r) => (
                <tr key={r.id}>
                  <td className="strong">{productName(r.productId)}</td>
                  <td>{r.quantity}</td>
                  <td className="mono" style={{ color: "var(--bad)" }}>Rs. {Number(r.loss || 0).toLocaleString()}</td>
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
