import clsx from "clsx";
import { useState } from "react";
import styles from "./Checkbox.module.css";

export const CheckBox = ({ type, onChange, name, required }) => {
  const [isChecked, setisChecked] = useState(false);

  const change = (e) => {
    setisChecked(e.target.checked);
    const foo = onChange && onChange;
    onChange && foo(e, name);
  };

  const test = (e) => {
    console.log(e);
  };
  return (
    <label>
      <div className={styles.checkbox}>
        <input
          type="checkbox"
          onChange={change}
          name={name && name}
          required={required && required}
        />
        <span className={clsx(styles.default, type && styles[type])}>
          {isChecked ? (
            type !== "outline-btn" ? (
              <i className="icon-check"></i>
            ) : (
              "Выбрано"
            )
          ) : type !== "outline-btn" ? (
            <i className="icon-plus"></i>
          ) : (
            "Выбрать"
          )}
        </span>
      </div>
    </label>
  );
};
