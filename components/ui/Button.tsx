import clsx from "clsx";
import Link from "next/link";

const Button = ({
  type,
  text,
  styles,
  size,
  href,
  handler,
}: {
  type: string;
  text: string;
  size?: "small" | "medium" | "large";
  cat?: string;
  styles: string;
  href?: string;
  handler?: () => void;
}) => {
  const ds = {
    small: "px-2 py-1 text-sm",
    medium: "px-4 py-2",
    large: "px-6 py-3 text-lg",
  };

  const sizeStyles = ds[size ?? "medium"];

  const cs = {
    primary: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-500 text-white hover:bg-gray-600",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };
  const colorStyles = cs[type as keyof typeof cs] || cs.primary;

  if (type === "link") {
    return (
      <Link
        href={href || "#"}
        className={clsx(
          "rounded transition-colors duration-300",
          sizeStyles,
          colorStyles,
          styles,
        )}
      >
        {text}
      </Link>
    );
  }

  return (
    <button
      className={clsx(
        "rounded transition-colors duration-300",
        sizeStyles,
        colorStyles,
        styles,
      )}
      onClick={handler}
    >
      {text}
    </button>
  );
};

export default Button;
