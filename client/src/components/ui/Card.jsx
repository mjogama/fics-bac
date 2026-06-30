export default function Card({ children, className = "", ...props }) {
  return (
    <div className={`rounded-cmscard border border-cms-cardborder bg-cms-surface ${className}`} {...props}>
      {children}
    </div>
  );
}
