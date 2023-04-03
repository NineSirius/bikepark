import { useState } from "react";
import styles from "./RadioButton.module.css";
import clsx from "clsx";

export const RadioButton = ({
  children,
  name,
  value,
  defaultChecked,
  required,
}) => {
  const [isChecked, setIsChecked] = useState(false);

  const change = (e) => {
    setIsChecked(e.target.checked);
  };

  return (
    <label>
      <div className={styles["radio-button"]}>
        <div className={styles["radio-button-content"]}>
          <input
            type="radio"
            name={name && name}
            onChange={change}
            checked={isChecked}
            value={value && value}
            defaultChecked={defaultChecked && defaultChecked}
            required={required && required}
          />
          <span className={clsx(styles.radio)}></span>
          <div className={styles["radio-inner-content"]}>{children}</div>
        </div>
      </div>
    </label>
  );
};
