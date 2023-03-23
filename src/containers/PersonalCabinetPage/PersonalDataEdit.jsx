import Button from '@/components/UI/Button'
import { Input } from '@/components/UI/Input'

import styles from './Personal.module.css'

export const PersonalDataEdit = ({ name, email, password, phone, delivery }) => {
    return (
        <div className={styles.form}>
            <div className={styles['input-wrap']}>
                <span className="caption">Имя</span>
                {console.log(name)}
                <Input type="text" placeholder="Имя" value={name} />
            </div>
            <div className={styles['input-wrap']}>
                <span className="caption">E-mail</span>
                <Input type="text" placeholder=" E-mail" value={email} />
            </div>
            <div className={styles['input-wrap']}>
                <span className="caption">Пароль</span>
                <Input type="text" placeholder="Пароль" value={password} />
            </div>
            <div className={styles['input-wrap']}>
                <span className="caption">Номер телефона</span>
                <Input type="text" placeholder="Номер телефона" value={phone} />
            </div>
            <div className={styles['input-wrap']}>
                <span className="caption">Адрес доставки</span>
                <Input
                    type="text"
                    placeholder="Адрес доставки "
                    value={delivery}
                />
            </div>
            <div className={styles['input-wrap']}>
                <Button type="link">Изменить пароль</Button>
            </div>
        </div>
    )
}
