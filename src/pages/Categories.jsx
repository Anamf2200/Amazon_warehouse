import { useContext, useEffect, useState } from "react";
import { WarehouseContext } from "../context/WarehouseContext";
import Modal from "../components/Modal";
import ConfirmDialog from "../components/ConfirmDialog";
import { IconPlus, IconEdit, IconTrash, IconTag } from "../components/icons";

const empty = { name: "", description: "" };

export default function Categories({ notify }) {
  const { getCategory, addCategory, updateCategory, deleteCategory, getProduct } = useContext(WarehouseContext);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(empty);
  const [toDelete, setToDelete] = useState(null);

  const load = () => { setCategories(getCategory()); setProducts(getProduct()); };
  useEffect(() => { load(); /* eslint-disable-next-line */ }, []);

  const openAdd = () => { setEditing(null); setForm(empty); setModalOpen(true); };
  const openEdit = (c) => { setEditing(c); setForm({ name: c.name, description: c.description || "" }); setModalOpen(true); };

  const submit = (e) => {
    e.preventDefault();
    const payload = { name: form.name.trim(), description: form.description.trim() };
    if (editing) { updateCategory({ ...editing, ...payload }); notify("Category updated"); }
    else { addCategory(payload); notify("Category added"); }
    setModalOpen(false);
    load();
  };

  const countFor = (id) => products.filter((p) => p.categoryId === id).length;

  const confirmDelete = () => {
    deleteCategory(toDelete.id);
    notify("Category deleted");
    setToDelete(null);
    load();
  };

  return (
    <div>
      <div className="toolbar">
        <div className="section-title" style={{ marginBottom: 0 }}>
          <div><h2 style={{ fontSize: 18 }}>Categories</h2><div className="hint">Group products for faster lookup</div></div>
        </div>
        <button className="btn btn-primary" onClick={openAdd}><IconPlus /> Add Category</button>
      </div>

      <div className="panel">
        <div className="table-wrap">
          <table className="data-table">
            <thead><tr><th>Name</th><th>Description</th><th>Products</th><th style={{ textAlign: "right" }}>Actions</th></tr></thead>
            <tbody>
              {categories.length === 0 && (
                <tr className="empty-row"><td colSpan={4}>
                  <div className="empty-state"><IconTag /><div>No categories yet.</div></div>
                </td></tr>
              )}
              {categories.map((c) => (
                <tr key={c.id}>
                  <td className="strong">{c.name}</td>
                  <td className="muted">{c.description || "—"}</td>
                  <td><span className="badge badge-steel">{countFor(c.id)} items</span></td>
                  <td>
                    <div className="row-actions">
                      <button className="btn btn-ghost btn-icon" onClick={() => openEdit(c)}><IconEdit /></button>
                      <button className="btn btn-danger btn-icon" onClick={() => setToDelete(c)}><IconTrash /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <Modal title={editing ? "Edit Category" : "Add Category"} onClose={() => setModalOpen(false)} width="480px">
          <form className="form-grid" onSubmit={submit}>
            <div className="field span-2">
              <label>Name</label>
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div className="field span-2">
              <label>Description</label>
              <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
            <div className="form-actions">
              <button type="button" className="btn btn-ghost" onClick={() => setModalOpen(false)}>Cancel</button>
              <button type="submit" className="btn btn-primary">{editing ? "Save Changes" : "Add Category"}</button>
            </div>
          </form>
        </Modal>
      )}

      {toDelete && (
        <ConfirmDialog
          title="Delete Category"
          message={`Remove "${toDelete.name}"? Products already assigned to it will keep showing as uncategorized.`}
          onCancel={() => setToDelete(null)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
}
