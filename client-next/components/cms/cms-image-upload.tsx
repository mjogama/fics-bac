"use client";

import { useRef, useState } from "react";

import { cn } from "@/lib/utils/utils";

type CmsImageUploadProps = {
  label?: string;
  imageUrl?: string;
  onFileChange: (file: File | null) => void;
  resetKey?: boolean | string | number;
  emptyLabel?: string;
  replaceLabel?: string;
  alt?: string;
  className?: string;
};

export function CmsImageUpload({
  label,
  imageUrl = "",
  onFileChange,
  resetKey,
  emptyLabel = "Click or drop to add image",
  replaceLabel = "Click or drop to replace",
  alt = "Upload preview",
  className,
}: CmsImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewSrc, setPreviewSrc] = useState(imageUrl);
  const [isDragging, setIsDragging] = useState(false);
  const [prevResetKey, setPrevResetKey] = useState(resetKey);

  if (resetKey !== prevResetKey) {
    setPrevResetKey(resetKey);
    setPreviewSrc(imageUrl);
    setIsDragging(false);
  }

  const selectImage = (file: File) => {
    if (!file.type.startsWith("image/")) return;

    onFileChange(file);
    setPreviewSrc(URL.createObjectURL(file));
  };

  const handleImageChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];
    if (file) selectImage(file);
  };

  const handleDrop: React.DragEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) selectImage(file);
  };

  return (
    <div className={cn("space-y-1.5", className)}>
      {label ? <p className="font-bold text-[10px] uppercase tracking-wide text-cms-labelfaint">{label}</p> : null}
      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={cn(
          "group relative block w-full cursor-pointer overflow-hidden rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cms-accent",
          isDragging && "ring-2 ring-cms-accent",
        )}>
        {previewSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={previewSrc} alt={alt} className="aspect-video w-full object-cover" />
        ) : (
          <div className="flex aspect-video w-full items-center justify-center border border-dashed border-cms-inputborder bg-cms-inputbg">
            <p className="px-4 text-center text-sm font-medium text-cms-body">{emptyLabel}</p>
          </div>
        )}
        <span
          className={cn(
            "absolute inset-0 flex items-center justify-center bg-cms-ink/65 px-4 text-center text-sm font-semibold text-white shadow-sm transition-opacity",
            isDragging ? "opacity-100" : "opacity-0 group-hover:opacity-100",
          )}>
          {replaceLabel}
        </span>
      </button>
    </div>
  );
}
