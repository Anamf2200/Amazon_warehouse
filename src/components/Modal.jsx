import { IconClose } from "./icons";

export default function Modal({ title, onClose, children, width }) {
  return (
    <div className="modal-overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="modal" style={width ? { maxWidth: width } : undefined}>
        <div className="modal-head">
          <h3>{title}</h3>
          <button className="icon-btn" onClick={onClose} aria-label="Close">
            <IconClose />
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}
