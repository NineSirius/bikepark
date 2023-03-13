import clsx from 'clsx'
import styles from './Button.module.css'

const Button = ({ children, type, onClick, disabled }) => {
    return (
        <button
            className={clsx(styles.btn, type && styles[type])}
            onClick={onClick && onClick}
            disabled={disabled && disabled}
        >
            {children}
        </button>
    )
}

export default Button
