import { useEffect } from "react";
import { X } from "lucide-react";

export default function Modal({ open, onClose, title, eyebrow, children, footer }) {
  useEffect(() => {
    if (!open) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4">
      <button type="button" className="absolute inset-0 bg-cms-ink/40" aria-label="Close modal" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="relative z-10 max-h-[92dvh] w-full max-w-[520px] overflow-hidden rounded-t-cmscard border border-cms-cardborder bg-cms-surface sm:max-h-none sm:rounded-cmscard">
        <div className="flex items-start justify-between border-b border-cms-divider px-4 py-4 sm:px-6">
          <div>
            {eyebrow && <p className="font-mono text-[10px] uppercase tracking-wide text-cms-labelfaint">{eyebrow}</p>}
            <h2 id="modal-title" className="font-display text-lg font-bold text-cms-ink">
              {title}
            </h2>
          </div>
          <button type="button" aria-label="Close" onClick={onClose} className="rounded-cmsbtn p-1 text-cms-muted transition-colors hover:bg-cms-rowhover hover:text-cms-ink">
            <X size={18} strokeWidth={1.75} />
          </button>
        </div>

        <div className="max-h-[calc(92dvh-8rem)] overflow-y-auto px-4 py-4 sm:max-h-[70vh] sm:px-6 sm:py-5">{children}</div>

        {footer && <div className="flex flex-col-reverse gap-2 border-t border-cms-divider px-4 py-4 sm:flex-row sm:justify-end sm:px-6">{footer}</div>}
      </div>
    </div>
  );
}

function FormField({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-[10px] uppercase tracking-wide text-cms-labelfaint">{label}</span>
      {children}
    </label>
  );
}

export { FormField };
