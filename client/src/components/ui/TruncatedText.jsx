import { useCallback, useEffect, useRef, useState } from "react";

export default function TruncatedText({ text, className = "" }) {
  const [expanded, setExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const observerRef = useRef(null);

  useEffect(() => {
    return () => observerRef.current?.disconnect();
  }, []);

  const textRef = useCallback(
    (node) => {
      observerRef.current?.disconnect();
      observerRef.current = null;

      if (!node || expanded || !text) {
        setIsTruncated((current) => (current ? false : current));
        return;
      }

      const measure = () => {
        const truncated = node.scrollWidth > node.clientWidth;
        setIsTruncated((current) => (current !== truncated ? truncated : current));
      };

      measure();

      const observer = new ResizeObserver(measure);
      observer.observe(node);
      observerRef.current = observer;
    },
    [text, expanded],
  );

  if (!text) {
    return <span className={`block truncate px-2 py-1.5 text-sm text-cms-body ${className}`}>—</span>;
  }

  const showToggle = isTruncated || expanded;

  return (
    <div className={`flex min-w-0 items-start gap-1.5 px-2 py-1.5 ${className}`}>
      <p ref={textRef} className={`min-w-0 flex-1 text-sm text-cms-body ${expanded ? "whitespace-normal break-words" : "truncate"}`}>
        {text}
      </p>
      {showToggle && (
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className="-mr-1 shrink-0 self-start rounded-cmsbtn px-3 pb-2.5 font-mono text-xs font-bold text-cms-accent transition-colors hover:bg-cms-rowhover hover:text-cms-ink active:bg-cms-pillbg">
          {expanded ? "See less" : "See more"}
        </button>
      )}
    </div>
  );
}
