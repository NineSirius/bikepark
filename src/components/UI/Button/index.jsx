import clsx from 'clsx'
import styles from './Button.module.css'

const Button = ({ children, type }) => {
    return (
        <button className={clsx(styles.btn, type && styles[type])}>
            {children}
        </button>
    )
}

export default Button
