import Button from "@/components/UI/Button";
import { Modal } from "@/components/UI/Modal";
import styles from "./confirmation.module.css";

export const ConfirmationModal = ({
  title,
  isVisible,
  setIsVisible,
  isSuccess,
}) => {
  return (
    <Modal isVisible={isVisible} close={() => setIsVisible(false)}>
      <h2 className={styles["confirm-title"]}>{title}</h2>
      <div className={styles["confirm-controls"]}>
        <Button
          type="default_outline"
          onClick={() => {
            setIsVisible(false);
          }}
        >
          Отмена
        </Button>
        <Button type="default" onClick={isSuccess}>
          Подтвердить
        </Button>
      </div>
    </Modal>
  );
};
