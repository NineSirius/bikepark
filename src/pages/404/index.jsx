import Button from "@/components/UI/Button";
import styles from "./error.module.css";

const notfound = () => {
  return (
    <div className="container">
      <div className={styles.error}>
        <div>
          <h3 className={styles.error_text}>404</h3>
          <p>The page does not exist or has not created yet</p>
        </div>
        <Button type="default">кнопка</Button>
      </div>
    </div>
  );
};

export default notfound;
