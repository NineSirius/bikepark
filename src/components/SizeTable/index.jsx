import styles from "./size.module.css";

export const SizeTable = () => {
  return (
    <div className={styles.sizesWrap}>
      <div className={styles.sizes}>
        <div className={styles.text1}>Size</div>
        <div>XS</div>
        <div>S</div>
        <div>M</div>
        <div>L</div>
        <div>XL</div>
        <div>XXL</div>
      </div>
      <div className={styles.height}>
        <div className={styles.text1}>{"height(cm)"}</div>
        <div>166-135</div>
        <div>390-165</div>
        <div>100-165</div>
        <div>130-156</div>
        <div>130-156</div>
        <div>130-156</div>
      </div>
      {/* <table className={styles.table}>
        <thead>
          <tr>
            <th>Size</th>
          </tr>
          <tr>
            <th>{'height(cm)'}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>XS</td>
            <td>S</td>
            <td>M</td>
            <td>L</td>
            <td>XL</td>
            <td>XXL</td>
          </tr>
          <tr>
            <td>166-135</td>
            <td>390-165</td>
            <td>100-165</td>
            <td>130-156</td>
            <td>130-156</td>
            <td>130-156</td>
          </tr>
        </tbody>
      </table> */}
    </div>
  );
};
