import clsx from 'clsx'
import styles from './Alert.module.css'

export const Alert = ({ children, type, isVisible, close }) => {
    return (
        isVisible && (
            <div className={clsx(styles.message, styles[type])}>
                <div className={styles['message-content']}>{children}</div>
                <span className={styles.close} onClick={close}>
                    X
                </span>
            </div>
        )
    )
}
