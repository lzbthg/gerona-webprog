import { Link } from "react-router-dom";

const variantClasses = {
  primary: "bg-[#8B5E3C] text-[#FFF8F0] hover:bg-[#6F472D] border-[#8B5E3C]",
  secondary: "bg-[#7C9A6D] text-white hover:bg-[#6A8760] border-[#7C9A6D]",
};

const Button = ({
  children,
  to,
  type = "button",
  variant = "secondary",
  className = "",
}) => {
  const classes = [
    "inline-flex items-center justify-center rounded-full border-2 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.24em] transition",
    variantClasses[variant] ?? variantClasses.secondary,
    className,
  ]
    .join(" ")
    .trim();

  if (to) {
    return (
      <Link to={to} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes}>
      {children}
    </button>
  );
};

export default Button;
