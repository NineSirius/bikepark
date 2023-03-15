import clsx from 'clsx'
import styles from './Modal.module.css'

export const Modal = ({ children, isVisible, close }) => {
    return (
        <>
            <div className={clsx(styles.modal, isVisible && styles.active)}>
                <span className={styles.close} onClick={close}>
                    x
                </span>
                {children}
            </div>

            <div
                className={clsx('overlay', isVisible && 'active')}
                onClick={close}
            ></div>
        </>
    )
}
