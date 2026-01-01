import { X } from "@phosphor-icons/react";
import "./Modal.css";

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  type = "info",
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className={`modal-content ${type}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>
        {title && <h3 className="modal-title">{title}</h3>}
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}
