import "./Button.css";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  type = "button",
  disabled = false,
  icon,
  onClick,
  className = "",
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`btn btn-${variant} btn-${size} ${className}`}
    >
      {icon && <span className="btn-icon">{icon}</span>}
      <span>{children}</span>
    </button>
  );
}