type ButtonProps = {
  children: React.ReactNode;
  title?: string;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
};

export function Button({
  children,
  title,
  type = "button",
  variant = "primary",
  onClick,
  className,
  disabled,
}: ButtonProps) {
  return (
    <button
      type={type}
      title={title}
      className={`py-1 px-2 rounded-lg transition-colors duration-100 ${
        variant === "primary"
          ? "bg-[#6590A4] text-white font-medium hover:bg-[#7FB0BB]"
          : "border border-gray-600 hover:bg-[#6590A4] hover:text-white"
      } ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
