import { createContext, useContext, useState, useCallback } from "react";
import { FaCheckCircle, FaExclamationCircle, FaInfoCircle, FaTimes } from "react-icons/fa";

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = "info") => {
    const id = Date.now() + Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    
    // Auto remove after 4 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      {/* Toast Container */}
      <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-lg border bg-white transition-all duration-300 transform translate-y-0 animate-fade-in-up ${
              toast.type === "success"
                ? "border-l-4 border-l-emerald-500 border-gray-100"
                : toast.type === "error"
                ? "border-l-4 border-l-red-500 border-gray-100"
                : toast.type === "warning"
                ? "border-l-4 border-l-amber-500 border-gray-100"
                : "border-l-4 border-l-blue-500 border-gray-100"
            }`}
          >
            {/* Icon */}
            <div className="shrink-0 mt-0.5">
              {toast.type === "success" && <FaCheckCircle className="text-emerald-500 text-lg" />}
              {toast.type === "error" && <FaExclamationCircle className="text-red-500 text-lg" />}
              {toast.type === "warning" && <FaExclamationCircle className="text-amber-500 text-lg" />}
              {toast.type === "info" && <FaInfoCircle className="text-blue-500 text-lg" />}
            </div>

            {/* Message */}
            <div className="flex-1 text-sm font-medium text-gray-800 break-words">
              {toast.message}
            </div>

            {/* Close Button */}
            <button
              onClick={() => removeToast(toast.id)}
              className="shrink-0 text-gray-400 hover:text-gray-600 transition cursor-pointer"
            >
              <FaTimes />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
