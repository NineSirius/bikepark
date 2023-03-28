import { useState } from 'react'
import Button from '../Button'
import styles from './style.module.css'

export const Input = ({
    type,
    placeholder,
    onChange,
    name,
    required,
    value,
    defaultValue,
}) => {
    const [showPassword, setShowPassword] = useState(false)
    return (
        <>
            <label>
                <div className={styles.inputWrap}>
                    <input
                        type={showPassword ? 'text' : type}
                        name={name && name}
                        onChange={onChange && onChange}
                        placeholder={placeholder}
                        required={required && required}
                        value={value && value}
                        defaultValue={defaultValue && defaultValue}
                    />
                    {type === 'password' && (
                        <>
                            {showPassword ? (
                                <Button
                                    type="icon"
                                    btnType="button"
                                    onClick={() => setShowPassword(false)}
                                >
                                    <i className="icon-hide-eye"></i>
                                </Button>
                            ) : (
                                <Button
                                    type="icon"
                                    btnType="button"
                                    onClick={() => setShowPassword(true)}
                                >
                                    <i className="icon-eye"></i>
                                </Button>
                            )}
                        </>
                    )}
                </div>
            </label>
        </>
    )
}
