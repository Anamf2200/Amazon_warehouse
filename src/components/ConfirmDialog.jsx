import Modal from "./Modal";
import { IconAlert } from "./icons";

export default function ConfirmDialog({ title, message, onCancel, onConfirm, confirmLabel = "Delete" }) {
  return (
    <Modal title={title} onClose={onCancel} width="420px">
      <div className="confirm-icon"><IconAlert /></div>
      <p style={{ color: "var(--text-dim)", fontSize: 14, lineHeight: 1.6 }}>{message}</p>
      <div className="form-actions">
        <button className="btn btn-ghost" onClick={onCancel}>Cancel</button>
        <button className="btn btn-danger" onClick={onConfirm}>{confirmLabel}</button>
      </div>
    </Modal>
  );
}
