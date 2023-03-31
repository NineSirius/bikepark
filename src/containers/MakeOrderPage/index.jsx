import { useEffect, useState } from "react";
import styles from "./styles.module.css";

export const MakeOrderPage = ({ orderInfo }) => {
  const [fullOrderInfo, setFullOrderInfo] = useState();
  useEffect(() => {
    orderInfo && setFullOrderInfo(orderInfo);
  }, []);

  return (
    <>
      <div className="container">
        <div className="card-main">
          <h1 className="main-title">Заявка на аренду велосипедов</h1>
        </div>
      </div>
    </>
  );
};
