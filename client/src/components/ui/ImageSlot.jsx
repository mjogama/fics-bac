export default function ImageSlot({ readOnly = false, fallback, className = "" }) {
  const displaySrc = fallback;

  if (readOnly) {
    return (
      <div className={`overflow-hidden bg-cms-inputbg ${className}`}>
        {displaySrc ? (
          <img src={displaySrc} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-cms-inputbg">
            <p className="px-6 text-center font-mono text-xs text-cms-muted">No image uploaded</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`flex h-[200px] items-center justify-center overflow-hidden rounded-cmsinput border border-dashed border-cms-inputborder bg-cms-inputbg ${className}`}>
      <p className="px-6 text-center font-mono text-xs text-cms-muted">Drag an image here, or click to upload</p>
    </div>
  );
}
