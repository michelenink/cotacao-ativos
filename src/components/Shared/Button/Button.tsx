import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.scss";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
};

const Button = ({ variant = "primary", className, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={clsx(styles.base, styles[variant], className)}
    />
  );
};

export default Button;
