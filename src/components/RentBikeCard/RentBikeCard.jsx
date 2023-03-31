import Image from "next/image";
import { CheckBox } from "../UI/Checkbox";
import { Tooltip } from "../UI/Tooltip";
import styles from "./RentBikeCard.module.css";
import { useState } from "react";

export const RentBikeCard = ({ title, image, price, hint, onChange }) => {
  const [typeInfo, setTypeInfo] = useState(false);

  return (
    <div>
      <div className={styles.cardBlock}>
        <Image
          className={styles.bike}
          src={image}
          width={300}
          height={200}
          alt="Байк"
        />
        <div className={styles.textcard}>
          <h2 className={styles.title}>{title}</h2>
          <div className={styles["card-info"]}>
            <h4 className={styles.textprice}>{price} AED</h4>
            <div className={styles["card-controls"]}>
              <Tooltip
                icon="question"
                type="card-btn"
                isVisible={typeInfo}
                setIsVisible={setTypeInfo}
              >
                <p className="caption">{hint}</p>
              </Tooltip>

              <CheckBox type="card-btn" onChange={onChange && onChange} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
