import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, updateProduct, deleteProduct } from "../store/thunks";
import Modal from "../components/Modal";
import ConfirmDialog from "../components/ConfirmDialog";
import { IconPlus, IconEdit, IconTrash, IconSearch, IconBox } from "../components/icons";

const empty = { name: "", sku: "", barcode: "", categoryId: "", supplierId: "", costPrice: "", sellingPrice: "", quantity: "" };

export default function Products({ notify }) {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const categories = useSelector((state) => state.categories);
  const suppliers = useSelector((state) => state.suppliers);

  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);
  const [error, setError] = useState("");
  const [toDelete, setToDelete] = useState(null);

  const openAdd = () => { setEditing(null); setForm(empty); setError(""); setModalOpen(true); };
  const openEdit = (p) => {
    setEditing(p);
    setForm({
      name: p.name, sku: p.sku, barcode: p.barcode,
      categoryId: p.categoryId ?? "", supplierId: p.supplierId ?? "",
      costPrice: p.costPrice, sellingPrice: p.sellingPrice, quantity: p.quantity,
    });
    setError("");
    setModalOpen(true);
  };

  const submit = (e) => {
    e.preventDefault();
    setError("");
    const payload = {
      name: form.name.trim(),
      sku: form.sku.trim(),
      barcode: form.barcode.trim(),
      categoryId: form.categoryId ? Number(form.categoryId) : null,
      supplierId: form.supplierId ? Number(form.supplierId) : null,
      costPrice: Number(form.costPrice),
      sellingPrice: Number(form.sellingPrice),
      quantity: Number(form.quantity),
    };
    try {
      if (editing) {
        dispatch(updateProduct({ ...editing, ...payload }));
        notify("Product updated");
      } else {
        dispatch(addProduct(payload));
        notify("Product added");
      }
      setModalOpen(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const confirmDelete = () => {
    dispatch(deleteProduct(toDelete.id));
    notify("Product deleted");
    setToDelete(null);
  };

  const catName = (id) => categories.find((c) => c.id === id)?.name || "—";
  const supName = (id) => suppliers.find((s) => s.id === id)?.name || "—";

  const filtered = products.filter((p) => {
    const q = query.toLowerCase();
    return !q || p.name?.toLowerCase().includes(q) || p.sku?.toLowerCase().includes(q) || p.barcode?.toLowerCase().includes(q);
  });

  return (
    <div>
      <div className="toolbar">
        <div className="search-box">
          <IconSearch />
          <input placeholder="Search by name, SKU or barcode…" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <button className="btn btn-primary" onClick={openAdd}><IconPlus /> Add Product</button>
      </div>

      <div className="panel">
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                <th>Product</th><th>SKU</th><th>Barcode</th><th>Category</th><th>Supplier</th>
                <th>Cost</th><th>Price</th><th>Qty</th><th style={{ textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr className="empty-row"><td colSpan={9}>
                  <div className="empty-state"><IconBox /><div>No products yet. Add your first item to the floor.</div></div>
                </td></tr>
              )}
              {filtered.map((p) => (
                <tr key={p.id}>
                  <td className="strong">{p.name}</td>
                  <td className="mono">{p.sku}</td>
                  <td className="mono">{p.barcode}</td>
                  <td>{catName(p.categoryId)}</td>
                  <td>{supName(p.supplierId)}</td>
                  <td className="mono">Rs. {Number(p.costPrice).toLocaleString()}</td>
                  <td className="mono">Rs. {Number(p.sellingPrice).toLocaleString()}</td>
                  <td>
                    <span className={`badge ${Number(p.quantity) <= 5 ? "badge-bad" : "badge-good"}`}>{p.quantity}</span>
                  </td>
                  <td>
                    <div className="row-actions">
                      <button className="btn btn-ghost btn-icon" onClick={() => openEdit(p)}><IconEdit /></button>
                      <button className="btn btn-danger btn-icon" onClick={() => setToDelete(p)}><IconTrash /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <Modal title={editing ? "Edit Product" : "Add Product"} onClose={() => setModalOpen(false)} width="640px">
          <form className="form-grid" onSubmit={submit}>
            {error && <div className="form-error">{error}</div>}

            <div className="field span-2">
              <label>Product Name</label>
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>

            <div className="field">
              <label>SKU</label>
              <input required value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} />
            </div>
            <div className="field">
              <label>Barcode</label>
              <input required value={form.barcode} onChange={(e) => setForm({ ...form, barcode: e.target.value })} />
            </div>

            <div className="field">
              <label>Category</label>
              <select value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })}>
                <option value="">Uncategorized</option>
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div className="field">
              <label>Supplier</label>
              <select value={form.supplierId} onChange={(e) => setForm({ ...form, supplierId: e.target.value })}>
                <option value="">No supplier</option>
                {suppliers.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>

            <div className="field">
              <label>Cost Price</label>
              <input required type="number" step="0.01" min="0" value={form.costPrice} onChange={(e) => setForm({ ...form, costPrice: e.target.value })} />
            </div>
            <div className="field">
              <label>Selling Price</label>
              <input required type="number" step="0.01" min="0" value={form.sellingPrice} onChange={(e) => setForm({ ...form, sellingPrice: e.target.value })} />
            </div>
            <div className="field">
              <label>Quantity</label>
              <input required type="number" min="0" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
            </div>

            <div className="form-actions">
              <button type="button" className="btn btn-ghost" onClick={() => setModalOpen(false)}>Cancel</button>
              <button type="submit" className="btn btn-primary">{editing ? "Save Changes" : "Add Product"}</button>
            </div>
          </form>
        </Modal>
      )}

      {toDelete && (
        <ConfirmDialog
          title="Delete Product"
          message={`This will permanently remove "${toDelete.name}" from inventory. This action can't be undone.`}
          onCancel={() => setToDelete(null)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}
