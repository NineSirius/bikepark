import Link from 'next/link'
import styles from './contacts.module.css'
import { Input } from '@/components/UI/Input'
import { ContactForm } from '@/components/Navbar/ContactForm'
import Button from '@/components/UI/Button'
import { CheckBox } from '@/components/UI/Checkbox'

export const ContactPage = () => {
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
                    <ContactForm />
                </div>
            </div>

            <div className={styles.map}>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3612.0888719087366!2d55.22082865082615!3d25.132686083847318!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f6bc0f68ee523%3A0x5703623b368da6c9!2sBike%20Park!5e0!3m2!1sru!2skg!4v1678800422020!5m2!1sru!2skg"
                    width="100%"
                    height="595 "
                    style={{ border: 'none' }}
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
        </div>
    )
}
