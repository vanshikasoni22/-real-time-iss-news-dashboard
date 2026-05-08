import { CheckCircle2, Info, X, XCircle } from 'lucide-react';

const iconByType = {
  success: CheckCircle2,
  error: XCircle,
  info: Info
};

export default function ToastContainer({ toasts, onDismiss }) {
  return (
    <div className="fixed right-4 top-4 z-[1000] flex w-[min(360px,calc(100vw-2rem))] flex-col gap-3">
      {toasts.map((toast) => {
        const Icon = iconByType[toast.type] || Info;
        return (
          <div
            key={toast.id}
            className="flex items-start gap-3 rounded-md border border-slate-200 bg-white p-3 text-sm text-slate-800 shadow-panel dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          >
            <Icon className={toast.type === 'error' ? 'text-rose-500' : 'text-teal-500'} size={18} />
            <p className="min-w-0 flex-1">{toast.message}</p>
            <button
              type="button"
              onClick={() => onDismiss(toast.id)}
              className="rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-100"
              aria-label="Dismiss notification"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
