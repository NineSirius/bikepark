import { getFullBikeInfo } from "@/api/requests";
import { Loader } from "@/components/UI/Loader";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";

export const MakeOrderPage = ({ orderInfo }) => {
  const [fullOrderInfo, setFullOrderInfo] = useState({});

  const [orderPageStatus, setOrderPageStatus] = useState("loading");
  useEffect(() => {
    // orderInfo && setFullOrderInfo(orderInfo);
    const newOrderInfo = { ...orderInfo };
    const bikes = orderInfo.products.map(async (item) => {
      return await getFullBikeInfo(item).then((resp) => resp);
    });

    Promise.all(bikes).then((resp) => {
      setFullOrderInfo({ ...newOrderInfo, products: [...resp] });
      setOrderPageStatus("loaded");
    });
  }, [orderInfo]);

  if (orderPageStatus === "loading") {
    return <Loader />;
  }

  if (orderPageStatus === "loaded") {
    return (
      <>
        <div className="container">
          <div className="card-main">
            <h1 className="main-title">Заявка на аренду велосипедов</h1>
            <div className={styles["order-info"]}>
              <div className={styles["order-info-item"]}>
                <span className="caption">Тип аренды</span>
                <h4 className={styles["order-info-title"]}>
                  {fullOrderInfo?.rentType}
                </h4>
              </div>
              <div className={styles["order-info-item"]}>
                <span className="caption">Дата и время начала</span>
                <h4 className={styles["order-info-title"]}>
                  {format(fullOrderInfo?.rentData?.startDate, "dd/MM/yyyy") ||
                    fullOrderInfo?.rentData?.startDate}
                </h4>
              </div>

              <div className={styles["order-info-item"]}>
                <span className="caption">Дата и время конца</span>
                <h4 className={styles["order-info-title"]}>
                  {format(fullOrderInfo?.rentData?.endDate, "dd/MM/yyyy") ||
                    fullOrderInfo?.rentData?.startDate}
                </h4>
              </div>
              <div className={styles["order-info-item"]}>
                <span className="caption">Доставка</span>
                <h4 className={styles["order-info-title"]}>
                  {fullOrderInfo?.delivery}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};
