import { Copy } from 'lucide-react';
import { useToast } from '../../context/ToastContext.jsx';

export default function CopyButton({ value, label = 'Copy' }) {
  const { notify } = useToast();

  const copy = async () => {
    await navigator.clipboard.writeText(value);
    notify(`${label} copied`, 'success');
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-slate-300 bg-white text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800"
      title={label}
      aria-label={label}
    >
      <Copy size={15} />
    </button>
  );
}
