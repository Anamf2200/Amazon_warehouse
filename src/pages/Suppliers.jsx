import { useContext, useEffect, useState } from "react";
import { WarehouseContext } from "../context/WarehouseContext";
import Modal from "../components/Modal";
import ConfirmDialog from "../components/ConfirmDialog";
import { IconPlus, IconEdit, IconTrash, IconTruck } from "../components/icons";

const empty = { name: "", contactPerson: "", phone: "", email: "", address: "" };

export default function Suppliers({ notify }) {
  const { getSupplier, addSupplier, updateSupplier, deleteSupplier, getProduct } = useContext(WarehouseContext);
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);
  const [toDelete, setToDelete] = useState(null);

  const load = () => { setSuppliers(getSupplier()); setProducts(getProduct()); };
  useEffect(() => { load(); /* eslint-disable-next-line */ }, []);

  const openAdd = () => { setEditing(null); setForm(empty); setModalOpen(true); };
  const openEdit = (s) => {
    setEditing(s);
    setForm({ name: s.name, contactPerson: s.contactPerson || "", phone: s.phone || "", email: s.email || "", address: s.address || "" });
    setModalOpen(true);
  };

  const submit = (e) => {
    e.preventDefault();
    const payload = { ...form, name: form.name.trim() };
    if (editing) { updateSupplier({ ...editing, ...payload }); notify("Supplier updated"); }
    else { addSupplier(payload); notify("Supplier added"); }
    setModalOpen(false);
    load();
  };

  const countFor = (id) => products.filter((p) => p.supplierId === id).length;

  const confirmDelete = () => {
    deleteSupplier(toDelete.id);
    notify("Supplier removed");
    setToDelete(null);
    load();
  };

  return (
    <div>
      <div className="toolbar">
        <div className="section-title" style={{ marginBottom: 0 }}>
          <div><h2 style={{ fontSize: 18 }}>Suppliers</h2><div className="hint">Vendors that stock your warehouse</div></div>
        </div>
        <button className="btn btn-primary" onClick={openAdd}><IconPlus /> Add Supplier</button>
      </div>

      <div className="panel">
        <div className="table-wrap">
          <table className="data-table">
            <thead><tr><th>Supplier</th><th>Contact</th><th>Phone</th><th>Email</th><th>Products</th><th style={{ textAlign: "right" }}>Actions</th></tr></thead>
            <tbody>
              {suppliers.length === 0 && (
                <tr className="empty-row"><td colSpan={6}>
                  <div className="empty-state"><IconTruck /><div>No suppliers yet.</div></div>
                </td></tr>
              )}
              {suppliers.map((s) => (
                <tr key={s.id}>
                  <td className="strong">{s.name}</td>
                  <td>{s.contactPerson || "—"}</td>
                  <td className="mono">{s.phone || "—"}</td>
                  <td className="muted">{s.email || "—"}</td>
                  <td><span className="badge badge-amber">{countFor(s.id)} items</span></td>
                  <td>
                    <div className="row-actions">
                      <button className="btn btn-ghost btn-icon" onClick={() => openEdit(s)}><IconEdit /></button>
                      <button className="btn btn-danger btn-icon" onClick={() => setToDelete(s)}><IconTrash /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <Modal title={editing ? "Edit Supplier" : "Add Supplier"} onClose={() => setModalOpen(false)} width="560px">
          <form className="form-grid" onSubmit={submit}>
            <div className="field span-2">
              <label>Supplier Name</label>
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="field">
              <label>Contact Person</label>
              <input value={form.contactPerson} onChange={(e) => setForm({ ...form, contactPerson: e.target.value })} />
            </div>
            <div className="field">
              <label>Phone</label>
              <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div className="field span-2">
              <label>Email</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div className="field span-2">
              <label>Address</label>
              <textarea value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
            </div>
            <div className="form-actions">
              <button type="button" className="btn btn-ghost" onClick={() => setModalOpen(false)}>Cancel</button>
              <button type="submit" className="btn btn-primary">{editing ? "Save Changes" : "Add Supplier"}</button>
            </div>
          </form>
        </Modal>
      )}

      {toDelete && (
        <ConfirmDialog
          title="Remove Supplier"
          message={`Remove "${toDelete.name}" from your supplier list?`}
          onCancel={() => setToDelete(null)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}
