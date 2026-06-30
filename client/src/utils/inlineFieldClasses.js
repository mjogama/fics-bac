export function inlineFieldClassName({ bare = false, active = false, className = "" } = {}) {
  const base = "border outline-none transition-colors";

  if (active) {
    return `${base} border-cms-inputborder bg-cms-inputbg ${className}`.trim();
  }

  if (bare) {
    return `${base} border-transparent bg-transparent focus:border-cms-inputborder focus:bg-cms-inputbg ${className}`.trim();
  }

  return `${base} border-cms-inputborder/60 bg-cms-inputbg focus:border-cms-inputborder focus:bg-cms-surface ${className}`.trim();
}
