import styles from './Loader.module.css'

export const Loader = () => {
    return (
        <div className={styles['loader-wrap']}>
            <div className={styles['lds-ellipsis']}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}
