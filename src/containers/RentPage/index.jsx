import Button from '@/components/UI/Button'
import styles from './RentPage.module.css'

export const RentPage = () => {
    return (
        <div className="container">
            <div className={styles['card-main-wrap']}>
                <div className="card-main">
                    <h1 className="title">Аренда велосипедов c доставкой</h1>

                    <div className={styles['header-banner']}>
                        <div>
                            <div className={styles['header-bunner-item']}>
                                <span className={styles.price}>Бесплатно</span>
                            </div>
                        </div>
                        <div>
                            <div className={styles['header-bunner-item']}>
                                <span className={styles.price}>Бесплатно</span>
                            </div>
                        </div>
                        <div>
                            <div className={styles['header-bunner-item']}>
                                <span className={styles.price}>Бесплатно</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-main"></div>
            </div>
        </div>
    )
}
