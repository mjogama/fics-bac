const variants = {
  primary: "border-[1.5px] border-cms-ink bg-cms-ink text-white hover:bg-cms-body",
  outline: "border-[1.5px] border-cms-inputborder bg-cms-surface text-cms-ink hover:bg-cms-rowhover",
  ghost: "border-[1.5px] border-transparent bg-transparent text-cms-secondary hover:bg-cms-rowhover",
};

const sizes = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-2.5 text-sm",
};

export default function Button({ children, variant = "primary", size = "md", className = "", href, type = "button", ...props }) {
  const classes = `inline-flex items-center justify-center rounded-cmsbtn font-medium transition-colors ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}
