import { getFullBikeInfo } from "@/api/requests";
import Button from "@/components/UI/Button";
import { CheckBox } from "@/components/UI/Checkbox";
import { Loader } from "@/components/UI/Loader";
import { Modal } from "@/components/UI/Modal";
import { PhotoGallery } from "@/components/UI/PhotoGalley";
import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./ProductCard.module.css";

export const ProductCard = ({
  name,
  size,
  brand,
  price,
  previewImg,
  id,
  addToBasket,
  status,
  basket,
}) => {
  const [fullBikeInfoStatus, setFullBikeInfoStatus] = useState(false);

  console.log(status);

  const [requestStatus, setRequestStatus] = useState("loading");

  const [fullBikeInfo, setFullBikeInfo] = useState("Full Bike info");

  useEffect(() => {
    if (fullBikeInfoStatus) {
      getFullBikeInfo(id).then((resp) => {
        setFullBikeInfo(resp.data);
        setRequestStatus("loaded");
      });
    }
  }, [fullBikeInfoStatus, id]);

  return (
    <>
      <div className={styles.card}>
        <div className={styles["card-header"]}>
          <strong className={styles.size}>{size}</strong>

          <span className={styles.brand}>{brand}</span>
        </div>

        <Image
          src={previewImg?.url}
          width={previewImg?.width}
          height={previewImg?.height}
          alt={name}
        />

        <div className={styles["card-info"]}>
          <h4
            className={styles.title}
            onClick={() => setFullBikeInfoStatus(true)}
          >
            {name}
          </h4>
          <span className={styles.price}>{price} AED/день</span>

          {status ? (
            <CheckBox
              type="outline-btn"
              onChange={addToBasket}
              checked={basket.includes(id)}
            />
          ) : (
            <Button type="default_small" disabled={true}>
              Занят
            </Button>
          )}
        </div>
      </div>

      <Modal
        isVisible={fullBikeInfoStatus}
        close={() => setFullBikeInfoStatus(false)}
      >
        {requestStatus === "loading" && <Loader />}
        {requestStatus === "loaded" && (
          <div className={styles["bike-content"]}>
            <div className={styles["bike-images"]}>
              <PhotoGallery thumbs={fullBikeInfo?.attributes?.images?.data} />
            </div>

            <div className={styles["bike-info"]}>
              <ul className={styles["bike-info-list"]}>
                <li className={styles["list-item"]}>
                  <span className="caption">Название</span>
                  <p className={styles.answer}>
                    {fullBikeInfo?.attributes.name}
                  </p>
                </li>
                <li className={styles["list-item"]}>
                  <span className="caption">Размер</span>
                  <p className={styles.answer}>
                    {fullBikeInfo?.attributes.size}
                  </p>
                </li>
                <li className={styles["list-item"]}>
                  <span className="caption">Тип</span>
                  <p className={styles.answer}>
                    {fullBikeInfo?.attributes?.type}
                  </p>
                </li>
                <li className={styles["list-item"]}>
                  <span className="caption">Материал рамы</span>
                  <p className={styles.answer}>
                    {fullBikeInfo?.attributes?.material}
                  </p>
                </li>
                <li className={styles["list-item"]}>
                  <span className="caption">Вес велосипеда</span>
                  <p className={styles.answer}>
                    {fullBikeInfo?.attributes?.weight}
                  </p>
                </li>
                <li className={styles["list-item"]}>
                  <span className="caption">Диаметр колес</span>
                  <p className={styles.answer}>
                    {fullBikeInfo?.attributes?.diameter}
                  </p>
                </li>
                <li className={styles["list-item"]}>
                  <span className="caption">Кол-во скоростей</span>
                  <p className={styles.answer}>
                    {fullBikeInfo?.attributes?.speed_count}
                  </p>
                </li>
                <li className={styles["list-item"]}>
                  <span className="caption">Армотизация</span>
                  <p className={styles.answer}>
                    {fullBikeInfo?.attributes?.depreciation
                      ? "Есть"
                      : "Отсутсвует"}
                  </p>
                </li>
              </ul>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};
