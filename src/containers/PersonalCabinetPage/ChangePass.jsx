import { useState } from 'react'
import { changePassword } from '@/api/requests'
import { Loader } from '@/components/UI/Loader'
import { Input } from '@/components/UI/Input'
import Button from '@/components/UI/Button'

export const ChangePass = ({ status, changeStatus }) => {
    const [passwordRequest, setPasswordRequest] = useState({
        password: '',
        newPassword: '',
        passwordConfirmation: '',
    })
    const changePasswordFoo = (e) => {
        setPasswordRequest((passwordRequest) => {
            return {
                ...passwordRequest,
                [e.target.name]: e.target.value,
            }
        })
    }

    const submitChangePassword = (e) => {
        e.preventDefault()
        changeStatus('loading')
        console.log(passwordRequest)
        changePassword(localStorage.getItem('user'), passwordRequest)
            .then((resp) => {
                localStorage.setItem('user', resp.jwt)
                changeStatus('success')
                setTimeout(() => {
                    changeStatus('pending')
                }, 3000)
            })
            .catch((err) => {
                console.log(err)
                changeStatus('error')
            })
    }

    if (status === 'pending') {
        return (
            <form onSubmit={submitChangePassword}>
                <div className="form-wrap">
                    <h2>Смена пароля</h2>

                    <div className="form-input-wrap">
                        <span className="caption">Старый пароль</span>
                        <Input
                            type="password"
                            placeholder="Введите текущий пароль"
                            name="password"
                            onChange={changePasswordFoo}
                            required
                        />
                    </div>
                    <div className="form-input-wrap">
                        <span className="caption">Новый пароль</span>
                        <Input
                            type="password"
                            placeholder="Введите новый пароль"
                            name="newPassword"
                            onChange={changePasswordFoo}
                            required
                        />
                    </div>
                    <div className="form-input-wrap">
                        <span className="caption">
                            Подтвердите новый пароль
                        </span>
                        {passwordRequest.newPassword !==
                            passwordRequest.passwordConfirmation && (
                            <span className="error">Пароли не совпадают</span>
                        )}
                        <Input
                            type="password"
                            placeholder="Введите новый пароль еще раз"
                            name="passwordConfirmation"
                            onChange={changePasswordFoo}
                            required
                        />
                    </div>

                    <Button type="default">Подтвердить</Button>
                </div>
            </form>
        )
    }

    if (status === 'loading') {
        return <Loader />
    }

    if (status === 'success') {
        return <h4>Ваш пароль успешно изменен</h4>
    }
}
