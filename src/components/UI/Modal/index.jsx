import clsx from "clsx";
import { useEffect } from "react";
import styles from "./Modal.module.css";

export const Modal = ({ children, isVisible, close }) => {
  useEffect(() => {
    if (isVisible) {
      document.body.classList.add("fixed");
    }
    if (!isVisible) {
      document.body.classList.remove("fixed");
    }
  }, [isVisible]);
  return (
    <>
      <div className={clsx(styles.modal, isVisible && styles.active)}>
        <span className={styles.close} onClick={close}>
          <i className="icon-cross"></i>
        </span>
        {children}
      </div>

      <div
        className={clsx("overlay", isVisible && "active")}
        onClick={close}
      ></div>
    </>
  );
};
