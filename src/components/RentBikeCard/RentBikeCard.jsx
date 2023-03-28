import Image from 'next/image'
import { CheckBox } from '../UI/Checkbox'
import { Tooltip } from '../UI/Tooltip'
import styles from './RentBikeCard.module.css'
import { useState } from 'react'

export const RentBikeCard = ({ title, image, price }) => {
  const [typeInfo, setTypeInfo] = useState(false)
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
                    <h2 className={styles.textinfo}>{title}</h2>
                    <div className={styles['card-info']}>
                    <p className={styles.textprice}>{price} AED</p>
                       <div className={styles["card-controls"]}>
                          <Tooltip
                              icon="question"
                              type="default"
                              isVisible={typeInfo}
                              setIsVisible={setTypeInfo}
                          >
                              Легкие, надежные и легко управляются. Возможны
                              вибрации из-за неровностей дороги.
                          </Tooltip>

                          <CheckBox type="default" />
                       </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
