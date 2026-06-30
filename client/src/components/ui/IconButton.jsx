const VARIANTS = {
  delete: "border-cms-deleteborder text-cms-accent",
  edit: "border-cms-inputborder text-cms-secondary",
};

const SAVED_EDIT = "border-cms-incomeborder text-cms-incometext";

export default function IconButton({ onClick, children, className = "", label = "Delete", variant = "delete", saved = false }) {
  const variantClass = saved && variant === "edit" ? SAVED_EDIT : (VARIANTS[variant] ?? VARIANTS.delete);

  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-cmsbtn border-[1.5px] transition-colors hover:bg-cms-rowhover ${variantClass} ${className}`}>
      {children}
    </button>
  );
}
