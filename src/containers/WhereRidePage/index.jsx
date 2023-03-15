import styles from "./style.module.css";
import Image from "next/image";
import clsx from "clsx";
const WhereRidePage = () => {
  return (
    <div className="container">
      <div className="card">
        <h1 className={styles.title}>Где кататься</h1>
        <h4>Подзаголовок</h4>
        <p className={styles.text}>
          Товарищи! постоянный количественный рост и сфера нашей активности
          позволяет выполнять важные задания по разработке направлений
          прогрессивного развития. Идейные соображения высшего порядка, а также
          постоянный количественный рост и сфера нашей активности играет важную
          роль в формировании позиций, занимаемых участниками в отношении
          поставленных задач.{" "}
        </p>
        <p className={styles.textBottom}>
          Таким образом дальнейшее развитие различных форм деятельности
          способствует подготовки и реализации позиций, занимаемых участниками в
          отношении поставленных задач.
        </p>
        <div className={styles.cardImg}>
          <Image
            className={styles.img}
            src="/img/dubai.png"
            width={1280}
            height="720"
          />
          <Image
            className={styles.img}
            src="/img/dubai.png"
            width={1280}
            height="720"
          />
          <Image
            className={styles.img}
            src="/img/dubai.png"
            width={1280}
            height="720"
          />
        </div>
      </div>
      <div className={clsx("card", styles.card)}>
        <h4>Подзаголовок</h4>
        <div className={styles.textImg}>
          <p className={styles.text2}>
            Товарищи! постоянный количественный рост и сфера нашей активности
            позволяет выполнять важные задания по разработке направлений
            прогрессивного развития. Идейные соображения высшего порядка, а
            также постоянный количественный рост и сфера нашей активности играет
            важную роль в формировании позиций, занимаемых участниками в
            отношении поставленных задач. <br />
            <br />
            Таким образом дальнейшее развитие различных форм деятельности
            способствует подготовки и реализации позиций, занимаемых участниками
            в отношении поставленных задач.
          </p>

          <Image src="/img/dubai2.png" width={559} height="262" />
        </div>
        <h4 className={styles.titleh4}>Заголовок </h4>
        <div className={styles.fourCard}>
          <div>
            <Image src="/img/dubai.png" width={220} height="200" />
            <p className={styles.textImgMini}>
              Товарищи! постоянный количественный рост и сфера нашей активности
              позволяет{" "}
            </p>
          </div>
          <div>
            <Image
              className={styles.imgMini}
              src="/img/dubai.png"
              width={220}
              height="200"
            />
            <p className={styles.textImgMini}>
              Товарищи! постоянный количественный рост и сфера нашей активности
              позволяет{" "}
            </p>
          </div>
          <div>
            <Image
              className={styles.imgMini}
              src="/img/dubai.png"
              width={220}
              height="200"
            />
            <p className={styles.textImgMini}>
              Товарищи! постоянный количественный рост и сфера нашей активности
              позволяет{" "}
            </p>
          </div>
          <div>
            <Image
              className={styles.imgMini}
              src="/img/dubai.png"
              width={220}
              height="200"
            />
            <p className={styles.textImgMini}>
              Товарищи! постоянный количественный рост и сфера нашей активности
              позволяет{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhereRidePage;
