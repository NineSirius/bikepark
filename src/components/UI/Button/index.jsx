import clsx from "clsx";
import styles from "./Button.module.css";

const Button = ({ children, type, onClick, disabled, btnType, className }) => {
  return (
    <button
      className={clsx(styles.btn, type && styles[type], className && className)}
      onClick={onClick && onClick}
      disabled={disabled && disabled}
      type={btnType && btnType}
    >
      {children}
    </button>
  );
};

export default Button;
