import clsx from "clsx";
import Link from "next/link";
import { ReactNode } from "react";

type ButtonProps = {
  variant?: "primary" | "secondary" | "danger" | "link";
  text: string;
  size?: "small" | "medium" | "large";
  href?: string;
  styles?: string;
  handler?: () => void;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  type?: string;
};

const Button = ({
  variant = "primary",
  text,
  size = "medium",
  type,
  href,
  styles,
  handler,
  leftIcon,
  rightIcon,
}: ButtonProps) => {
  const sizes = {
    small: "px-4 py-2 text-sm",
    medium: "px-6 py-3 text-sm",
    large: "px-8 py-4 text-base",
  };

  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg",

    secondary:
      "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-400",

    danger: "bg-red-600 text-white hover:bg-red-700",

    link: "bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg",
  };

  const className = clsx(
    "inline-flex items-center justify-center gap-2",
    "rounded-xl",
    "font-semibold",
    "transition-all duration-300",
    "hover:-translate-y-0.5",
    "focus:outline-none",
    "focus:ring-4",
    "focus:ring-blue-200",
    sizes[size],
    variants[variant],
    styles,
  );

  if (variant === "link" || type === "link") {
    return (
      <Link href={href ?? "#"} className={className}>
        {leftIcon}
        {text}
        {rightIcon}
      </Link>
    );
  }

  return (
    <button className={className} onClick={handler}>
      {leftIcon}
      {text}
      {rightIcon}
    </button>
  );
};

export default Button;
