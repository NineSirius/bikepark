import { Modal } from '@/components/UI/Modal'
import { Input } from '@/components/UI/Input'
import Button from '@/components/UI/Button'
import styles from './ContactForm.module.css'
import { CheckBox } from '@/components/UI/Checkbox'
import { useState } from 'react'
import { postQuestionRequest } from '@/api/requests'

export const ContactForm = ({ feedbackActive, setFeedbackActive }) => {
    const [contactData, setContactData] = useState({
        name: '',
        phone: '',
        agreement: false,
    })

    const change = (e) => {
        setContactData((contactData) => {
            if (e.target.name !== 'agreement') {
                console.log(e.target.value)
                return {
                    ...contactData,
                    [e.target.name]: e.target.value,
                }
            } else {
                console.log(e.target.checked)

                return {
                    ...contactData,
                    [e.target.name]: e.target.checked,
                }
            }
        })
    }

    const submit = (e) => {
        e.preventDefault()
        // postQuestionRequest(contactData)
    }

    return (
        <Modal
            isVisible={feedbackActive}
            close={() => setFeedbackActive(false)}
        >
            <h2 className={styles.title}>
                Есть вопросы? Оставьте номер, и мы все обсудим
            </h2>

            <form onSubmit={submit}>
                <div className={styles.contactForm}>
                    <Input
                        type="text"
                        placeholder="Имя*"
                        name="name"
                        onChange={change}
                        required
                    />
                    <Input
                        type="text"
                        placeholder="Номер телефона*"
                        name="phone"
                        onChange={change}
                        required
                    />

                    <div className={styles.formCheck}>
                        <CheckBox
                            type="default"
                            onChange={change}
                            name="agreement"
                            required
                        />
                        <h4 className={styles['check-title']}>
                            Согласие на обработку персональных данных
                        </h4>
                    </div>

                    <Button
                        type="default_fill"
                        disabled={!contactData.agreement}
                    >
                        Отправить
                    </Button>
                </div>
            </form>
        </Modal>
    )
}
