import styles from "./RulesPage.module.css";

export const RulesPage = () => {
  return </>
  <div className="container">
    <div className="cards">
      <h1 className="title">Правила</h1>
      <h2 className="subtitile">условия аренды</h2>
      <div className={styles.cards}>
        <span className="caption">срок аренды</span>
        <p className="text">
          Минимальный срок аренды велосипеда составляет 1 день. При брони от 5
          дней действует скидка 10%
        </p>
        <span className="caption">срок аренды</span>
        <p className="text">
          Минимальный срок аренды велосипеда составляет 1 день. При брони от 5
          дней действует скидка 10%
        </p>
        <span className="caption">срок аренды</span>
        <p className="text">
          Минимальный срок аренды велосипеда составляет 1 день. При брони от 5
          дней действует скидка 10%
        </p>
      </div>
    </div>
  </div>;
};
