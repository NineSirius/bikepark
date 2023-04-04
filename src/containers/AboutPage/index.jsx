import Image from "next/image";
import styles from "./styel.module.css";

export const AboutPage = () => {
  return (
    <div className="container">
      <div className="card">
        <div className={styles["const-1"]}>
          <div className={styles["taitel-wrap"]}>
            <h1 className={styles["taitel"]}>О нас</h1>
            <p className="text">
              Товарищи! постоянный количественный рост и сфера нашей активности
              позволяет выполнять важные задания по разработке направлений
              прогрессивного развития. Идейные соображения высшего порядка, а
              также постоянный количественный рост и сфера нашей активности
              играет важную роль в формировании позиций, занимаемых участниками
              в отношении поставленных задач. Таким образом дальнейшее развитие
              различных форм деятельности способствует подготовки и реализации
              позиций, занимаемых участниками в отношении.
            </p>
          </div>
          <div className={styles["img-wrap"]}>
            <Image src="/img/vector.png" width={1280} height={720} alt="name" />
          </div>
        </div>
      </div>

      <div className="card">
        <div className={styles["taitel-wrap-1"]}>
          <h3 className={styles["taite-1"]}>Отзывы</h3>
        </div>
        <div className={styles["cards-wrap"]}>
          <div className={styles["cards"]}>
            <p className={styles["text-cards"]}>
              Безусловно, семантический разбор внешних противодействий
              способствует повышению качества вывода текущих активов.
              противодействий способствует повышению качества вывода текущих
              активов противодействий способствует повышению качества
            </p>

            <div className={styles["avtor"]}>
              <h3 className={styles["taitel-avtor"]}>Александр Н.</h3>
            </div>
          </div>
          <div className={styles["cards"]}>
            <p className={styles["text-cards"]}>
              Безусловно, семантический разбор внешних противодействий
              способствует повышению качества вывода текущих активов.
              противодействий способствует повышению качества вывода текущих
              активов противодействий способствует повышению качества
            </p>
            <div className={styles["avtor"]}>
              <h3 className={styles["taitel-avtor"]}>Александр Н.</h3>
            </div>
          </div>

          <div className={styles["cards"]}>
            <p className={styles["text-cards"]}>
              Безусловно, семантический разбор внешних противодействий
              способствует повышению качества вывода текущих активов.
              противодействий способствует повышению качества вывода текущих
              активов противодействий способствует повышению качества
            </p>
            <div className={styles["avtor"]}>
              <h3 className={styles["taitel-avtor"]}>Александр Н.</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
