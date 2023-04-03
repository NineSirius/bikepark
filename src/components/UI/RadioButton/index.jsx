import { useEffect, useState } from "react";
import styles from "./RadioButton.module.css";
import clsx from "clsx";

export const RadioButton = ({
  children,
  name,
  value,
  required,
  setFullOrderInfo,
  payment_method,
  defaultChecked,
}) => {
  const isActive = value === payment_method;

  const change = (e) => {
    console.log(value, payment_method);
    setFullOrderInfo((fullOrderInfo) => {
      return {
        ...fullOrderInfo,
        payment_method: e.target.value,
      };
    });
  };

  return (
    <label>
      <div className={styles["radio-button"]}>
        <div className={styles["radio-button-content"]}>
          <input
            type="radio"
            name={name && name}
            onChange={change}
            checked={isActive}
            value={value && value}
            required={required && required}
            defaultChecked={defaultChecked}
          />
          <span
            className={clsx(styles.radio, isActive && styles.active)}
          ></span>
          <div className={styles["radio-inner-content"]}>{children}</div>
        </div>
      </div>
    </label>
  );
};
