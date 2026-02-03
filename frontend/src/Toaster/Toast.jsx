import { useState, useEffect, useCallback } from "react";


const CSS = `
  @keyframes toast-slide-in {
    0%  { transform: translateX(110%); opacity: 0; }
    100%{ transform: translateX(0);    opacity: 1; }
  }
  @keyframes toast-slide-out {
    0%  { transform: translateX(0);    opacity: 1; }
    100%{ transform: translateX(110%); opacity: 0; }
  }
  @keyframes toast-progress {
    0%  { width: 100%; }
    100%{ width: 0%;   }
  }

  .toast-card {
    display: flex;
    flex-direction: column;
    width: 380px;
    max-width: 90vw;
    background: #ffffff;
    border-radius: 10px;
    box-shadow: 0 4px 18px rgba(0,0,0,0.13);
    overflow: hidden;
    margin-bottom: 10px;
    animation: toast-slide-in 0.38s cubic-bezier(.34,1.56,.64,1) forwards;
  }
  .toast-card.leaving {
    animation: toast-slide-out 0.3s ease forwards;
  }
  .toast-body {
    display: flex;
    align-items: center;
    padding: 14px 14px 14px 16px;
    gap: 14px;
  }
  .toast-icon {
    flex-shrink: 0;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .toast-icon.success { background-color: #22c55e; }
  .toast-icon.error   { background-color: #ef4444; }

  .toast-message {
    flex: 1;
    font-size: 14.5px;
    font-weight: 500;
    color: #1e293b;
    line-height: 1.45;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }
  .toast-close {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 20px;
    color: #94a3b8;
    line-height: 1;
    padding: 0 2px;
    border-radius: 4px;
    transition: color 0.18s;
  }
  .toast-close:hover { color: #64748b; }

  .toast-bar { height: 4px; width: 100%; }
  .toast-bar.success { background-color: #e8f5e9; }
  .toast-bar.error   { background-color: #ffebee; }

  .toast-bar-fill {
    height: 100%;
    animation: toast-progress var(--toast-dur, 3500ms) linear forwards;
  }
  .toast-bar-fill.success { background-color: #22c55e; }
  .toast-bar-fill.error   { background-color: #ef4444; }

  .toast-container {
    position: fixed;
    top: 24px;
    right: 24px;
    z-index: 99999;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    pointer-events: none;
  }
  .toast-container > * { pointer-events: auto; }
`;

function injectStyles() {
  if (document.getElementById("__toast-styles__")) return;
  const tag = document.createElement("style");
  tag.id = "__toast-styles__";
  tag.textContent = CSS;
  document.head.appendChild(tag);
}


function ToastCard({ toast, onRemove, duration = 3500 }) {
  const [leaving, setLeaving] = useState(false);
  const type = toast.type === "success" ? "success" : "error";

  const handleClose = useCallback(() => {
    setLeaving(true);
    setTimeout(() => onRemove(toast.id), 300);
  }, [toast.id, onRemove]);

  useEffect(() => {
    const timer = setTimeout(handleClose, duration);
    return () => clearTimeout(timer);
  }, [duration, handleClose]);

  return (
    <div className={`toast-card ${leaving ? "leaving" : ""}`}>
      <div className="toast-body">
        <div className={`toast-icon ${type}`}>
          {type === "success" ? (
            <svg width="19" height="19" viewBox="0 0 19 19" fill="none">
              <path d="M3.5 10L7.5 14L15.5 5.5" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ) : (
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none">
              <path d="M3.5 3.5L13.5 13.5M13.5 3.5L3.5 13.5" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" />
            </svg>
          )}
        </div>

        <span className="toast-message">{toast.message}</span>

        <button className="toast-close" onClick={handleClose}>×</button>
      </div>

      <div className={`toast-bar ${type}`}>
        <div className={`toast-bar-fill ${type}`} style={{ "--toast-dur": `${duration}ms` }} />
      </div>
    </div>
  );
}


export default function ToastContainer({ toasts, onRemove }) {
  injectStyles();
  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <ToastCard key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
}