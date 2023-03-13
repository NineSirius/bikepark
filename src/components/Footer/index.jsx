import styles from "./footer.module.css";
import Link from "next/link";
import clsx from "clsx";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={clsx(styles.footerContent, "container")}>
        <div className={styles.links}>
          <h4 className={styles.white}>Аренда велосипедов</h4>
          <div className={styles.gap}>
            <Link className={styles.a} href="">
              Правила
            </Link>
            <Link className={styles.a} href="">
              Отзывы
            </Link>
            <Link className={styles.a} href="">
              Контакты
            </Link>
            <Link className={styles.a} href="">
              Обратная связь
            </Link>
          </div>
        </div>

        <ul className={styles.ul}>
          <div className={styles.heightLink}>
            <li>
              <Link className={styles.a} href="">
                Алюминий
              </Link>
            </li>
            <li>
              <Link className={styles.a} href="">
                Карбон
              </Link>
            </li>
            <li>
              <Link className={styles.a} href="">
                Горные/городские
              </Link>
            </li>
            <li>
              <Link className={styles.a} href="">
                Городские эконом
              </Link>
            </li>
          </div>
        </ul>
        <div className={styles.last}>
          <p className={styles.white}>© BikePark, 2021</p>
          <Link className={styles.a} href="">
            Политика конфиденциальности
          </Link>
          <div className={styles.social}>
            <Link className={styles.a} href="">
              facebook
            </Link>
            <Link className={styles.a} href="">
              insta
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
