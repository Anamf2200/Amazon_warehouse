import { useContext, useEffect, useState } from "react";
import { WarehouseContext } from "../context/WarehouseContext";
import Modal from "../components/Modal";
import ConfirmDialog from "../components/ConfirmDialog";
import { IconPlus, IconEdit, IconTrash, IconOrders } from "../components/icons";

const STATUSES = ["Pending", "Completed", "Cancelled"];
const emptyAdd = { productId: "", quantity: "", customerName: "", status: "Pending" };

export default function Orders({ notify }) {
  const { getOrder, addOrder, updateOrders, deleteOrder, getProduct } = useContext(WarehouseContext);
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyAdd);
  const [error, setError] = useState("");
  const [toDelete, setToDelete] = useState(null);

  const load = () => { setOrders(getOrder()); setProducts(getProduct()); };
  useEffect(() => { load(); /* eslint-disable-next-line */ }, []);

  const productName = (id) => products.find((p) => p.id === id)?.name || "Deleted product";

  const openAdd = () => { setEditing(null); setForm(emptyAdd); setError(""); setModalOpen(true); };
  const openEdit = (o) => { setEditing(o); setForm({ ...emptyAdd, customerName: o.customerName || "", status: o.status || "Pending" }); setError(""); setModalOpen(true); };

  const submit = (e) => {
    e.preventDefault();
    setError("");
    try {
      if (editing) {
        updateOrders({ ...editing, customerName: form.customerName.trim(), status: form.status });
        notify("Order updated");
      } else {
        addOrder({
          productId: Number(form.productId),
          quantity: Number(form.quantity),
          customerName: form.customerName.trim(),
          status: form.status,
        });
        notify("Order placed");
      }
      setModalOpen(false);
      load();
    } catch (err) {
      setError(err.message);
    }
  };

  const confirmDelete = () => {
    deleteOrder(toDelete.id);
    notify("Order deleted");
    setToDelete(null);
    load();
  };

  const badgeClass = (status) =>
    status === "Completed" ? "badge-good" : status === "Cancelled" ? "badge-bad" : "badge-amber";

  return (
    <div>
      <div className="toolbar">
        <div className="section-title" style={{ marginBottom: 0 }}>
          <div><h2 style={{ fontSize: 18 }}>Orders</h2><div className="hint">Placing an order automatically deducts stock</div></div>
        </div>
        <button className="btn btn-primary" onClick={openAdd}><IconPlus /> New Order</button>
      </div>

      <div className="panel">
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr><th>Order #</th><th>Product</th><th>Customer</th><th>Qty</th><th>Total</th><th>Profit</th><th>Status</th><th>Date</th><th style={{ textAlign: "right" }}>Actions</th></tr>
            </thead>
            <tbody>
              {orders.length === 0 && (
                <tr className="empty-row"><td colSpan={9}>
                  <div className="empty-state"><IconOrders /><div>No orders placed yet.</div></div>
                </td></tr>
              )}
              {orders.slice().reverse().map((o) => (
                <tr key={o.id}>
                  <td className="mono">#{String(o.id).slice(-6)}</td>
                  <td className="strong">{productName(o.productId)}</td>
                  <td>{o.customerName || "Walk-in"}</td>
                  <td>{o.quantity}</td>
                  <td className="mono">Rs. {Number(o.total || 0).toLocaleString()}</td>
                  <td className="mono" style={{ color: "var(--good)" }}>Rs. {Number(o.profit || 0).toLocaleString()}</td>
                  <td><span className={`badge ${badgeClass(o.status)}`}>{o.status || "Pending"}</span></td>
                  <td className="muted">{o.date ? new Date(o.date).toLocaleDateString() : "—"}</td>
                  <td>
                    <div className="row-actions">
                      <button className="btn btn-ghost btn-icon" onClick={() => openEdit(o)}><IconEdit /></button>
                      <button className="btn btn-danger btn-icon" onClick={() => setToDelete(o)}><IconTrash /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <Modal title={editing ? "Update Order" : "New Order"} onClose={() => setModalOpen(false)} width="520px">
          <form className="form-grid" onSubmit={submit}>
            {error && <div className="form-error">{error}</div>}

            {!editing && (
              <>
                <div className="field span-2">
                  <label>Product</label>
                  <select required value={form.productId} onChange={(e) => setForm({ ...form, productId: e.target.value })}>
                    <option value="">Select a product</option>
                    {products.map((p) => (
                      <option key={p.id} value={p.id}>{p.name} — {p.quantity} in stock</option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label>Quantity</label>
                  <input required type="number" min="1" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
                </div>
              </>
            )}

            <div className="field">
              <label>Customer Name</label>
              <input value={form.customerName} onChange={(e) => setForm({ ...form, customerName: e.target.value })} placeholder="Walk-in" />
            </div>

            <div className="field span-2">
              <label>Status</label>
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div className="form-actions">
              <button type="button" className="btn btn-ghost" onClick={() => setModalOpen(false)}>Cancel</button>
              <button type="submit" className="btn btn-primary">{editing ? "Save Changes" : "Place Order"}</button>
            </div>
          </form>
        </Modal>
      )}

      {toDelete && (
        <ConfirmDialog
          title="Delete Order"
          message={`Delete order #${String(toDelete.id).slice(-6)}? Note: stock already deducted is not restored automatically.`}
          onCancel={() => setToDelete(null)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}
