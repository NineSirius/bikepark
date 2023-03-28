import { RentBikeCard } from '@/components/RentBikeCard/RentBikeCard'
import styles from './RentPage.module.css'

export const RentPage = () => {
    return (
        <div className="container">
            <div className={styles['card-main-wrap']}>
                <div className="card-main"> <RentBikeCard title="Аллюминий" price="90 AED" image="/img/bike.png"/> </div>
                <div className="card-main"></div>
                <div className="card-main"></div>
            </div>
        </div>
    )
}
