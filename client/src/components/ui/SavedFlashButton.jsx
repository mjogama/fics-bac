export default function SavedFlashButton({ className = "" }) {
  return (
    <button
      type="button"
      className={`w-full rounded-cmsbtn border-[1.5px] border-cms-inputborder bg-cms-surface px-3 py-1.5 font-mono text-xs font-bold text-cms-secondary hover:bg-cms-rowhover ${className}`}>
      Update
    </button>
  );
}
