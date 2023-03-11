import Link from 'next/link'
import styles from './contacts.module.css'
import { Input } from '@/components/UI/Input'

const ContactPage = () => {
    const change = (e) => {
        console.log(e.target.value)
    }
    return (
        <div className="container card">
            <h1>Контакты</h1>

            <div className={styles.contactForm}>
                <div className={styles.contactInfo}>
                    <div>
                        <span>Номер телефона</span>
                        <Link href="tel:999 999 999">999 999 999</Link>
                    </div>

                    <div>
                        <span>E-mail</span>
                        <Link href="mailto:info@bikerental.ae">
                            info@bikerental.ae
                        </Link>
                    </div>

                    <div>
                        <span>Номер телефона</span>
                        <Link href="geo:42,2?z=8">
                            Страна А, город Б, ул. АААА
                        </Link>
                    </div>
                </div>
                <div className={styles.form}>
                    <form className={styles.formContent}>
                        <div className={styles.formTitle}>
                            <span>Оставить заявку</span>
                            <h4>Остались вопросы? Свяжитесь с нами</h4>
                        </div>

                        <div className={styles.formInputs}>
                            <Input
                                type="text"
                                name="name"
                                placeholder="Имя*"
                                onChange={change}
                                required
                            />

                            <Input
                                type="text"
                                name="phone"
                                placeholder="Номер телефона*"
                                onChange={change}
                                required
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ContactPage
