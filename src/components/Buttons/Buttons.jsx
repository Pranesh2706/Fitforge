import "./Buttons.css";

function Button({
  children,
  variant = "primary",
  href,
  onClick,
  className = "",
  type = "button",
}) {
  const buttonClass = `ff-button ff-button-${variant} ${className}`;

  if (href) {
    return (
      <a href={href} className={buttonClass}>
        <span>{children}</span>
        <span className="ff-button-arrow">↗</span>
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={buttonClass}>
      <span>{children}</span>
      <span className="ff-button-arrow">↗</span>
    </button>
  );
}

export default Button;
