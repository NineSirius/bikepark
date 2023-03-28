import { editUserInfo } from '@/api/requests'
import Button from '@/components/UI/Button'
import { Input } from '@/components/UI/Input'
import { Modal } from '@/components/UI/Modal'
import { useEffect, useState } from 'react'
import { ChangePass } from './ChangePass'

import styles from './Personal.module.css'

export const PersonalData = ({
    name,
    email,
    userID,
    password,
    phone,
    delivery,
    status,
    changeStatus,
    setUserData,
    userData,
}) => {
    const [showChangePassword, setShowChangePassword] = useState(false)

    const [changePasswordStatus, setChangePasswordStatus] = useState('pending')

    const [userInfo, setUserInfo] = useState({
        username: name,
        email,
        phone,
        delivery,
    })

    const [isChange, setIsChange] = useState(false)

    const change = (e) => {
        setUserInfo((userInfo) => {
            return {
                ...userInfo,
                [e.target.name]: e.target.value,
            }
        })
        if (!isChange) {
            setIsChange(true)
        }
    }

    const submit = (e) => {
        e.preventDefault()

        if (isChange) {
            editUserInfo(localStorage.getItem('user'), userID, userInfo)
            const data = {
                ...userData,
                ...userInfo,
            }
            setUserData(data)
            setIsChange(false)
        }
        changeStatus('read')
    }

    if (status === 'read') {
        return (
            <>
                <div className={styles.form}>
                    <div className={styles['form-info']}>
                        <div className={styles['input-wrap']}>
                            <span className="caption">Имя</span>
                            <h4>{name}</h4>
                        </div>
                        <div className={styles['input-wrap']}>
                            <span className="caption">E-mail</span>

                            <h4>{email}</h4>
                        </div>

                        <div className={styles['input-wrap']}>
                            <span className="caption">Номер телефона</span>
                            <h4>{phone}</h4>
                        </div>
                        <div className={styles['input-wrap']}>
                            <span className="caption">Адрес доставки</span>
                            <h4>{delivery}</h4>
                        </div>
                    </div>
                    <div className={styles['form-password']}>
                        <div className={styles['input-wrap']}>
                            <span className="caption">Пароль</span>
                            <h4>{password}</h4>
                        </div>
                        <div className={styles['input-wrap']}>
                            <Button
                                type="primary-link"
                                btnType="button"
                                onClick={() => setShowChangePassword(true)}
                            >
                                Изменить пароль
                            </Button>
                        </div>
                    </div>

                    <Modal
                        isVisible={showChangePassword}
                        close={() => setShowChangePassword(false)}
                    >
                        <ChangePass
                            status={changePasswordStatus}
                            changeStatus={setChangePasswordStatus}
                        />
                    </Modal>
                </div>
                <div className={styles.btn}>
                    <Button
                        btnType="button"
                        type="default"
                        onClick={() => changeStatus('edit')}
                    >
                        Редактировать
                    </Button>
                </div>
            </>
        )
    }

    if (status === 'edit') {
        return (
            <form onSubmit={submit}>
                <div className={styles.form}>
                    <div className={styles['form-info']}>
                        <div className={styles['input-wrap']}>
                            <span className="caption">Имя</span>
                            <Input
                                value={userInfo.username}
                                name="username"
                                onChange={change}
                            />
                        </div>
                        <div className={styles['input-wrap']}>
                            <span className="caption">E-mail</span>

                            <Input
                                value={userInfo.email}
                                name="email"
                                onChange={change}
                            />
                        </div>

                        <div className={styles['input-wrap']}>
                            <span className="caption">Номер телефона</span>
                            <Input
                                value={userInfo.phone}
                                name="phone"
                                onChange={change}
                            />
                        </div>
                        <div className={styles['input-wrap']}>
                            <span className="caption">Адрес доставки</span>
                            <Input
                                value={userInfo.delivery}
                                name="delivery"
                                onChange={change}
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.btn}>
                    <Button btnType="button" type="default" onClick={submit}>
                        Сохранить
                    </Button>
                </div>
            </form>
        )
    }
}
