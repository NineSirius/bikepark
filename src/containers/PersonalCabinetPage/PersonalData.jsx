import Button from '@/components/UI/Button'
import { Input } from '@/components/UI/Input'

import styles from './Personal.module.css'

export const PersonalData = ({ name, email, password, phone, delivery }) => {
    return (
        <div className={styles.form}>
            <div className={styles['input-wrap']}>
                <span className="caption">Имя</span>
                {console.log(name)}
                <h4>{name}</h4>
            </div>
            <div className={styles['input-wrap']}>
                <span className="caption">E-mail</span>

                <h4>{email}</h4>
            </div>
            <div className={styles['input-wrap']}>
                <span className="caption">Пароль</span>
                <h4>{password}</h4>
            </div>
            <div className={styles['input-wrap']}>
                <span className="caption">Номер телефона</span>
                <h4>{phone}</h4>
            </div>
            <div className={styles['input-wrap']}>
                <span className="caption">Адрес доставки</span>
                <h4>{delivery}</h4>
            </div>
            <div className={styles['input-wrap']}>
                <Button type="primary-link">Изменить пароль</Button>
            </div>
        </div>
    )
}
