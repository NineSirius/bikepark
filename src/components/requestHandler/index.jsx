export const requestHandler = ({ children, success, error }) => {
    if (error) {
        return (
            <div className={styles.error}>
                <h2 className={styles['error-title']}>
                    При запросе, произошла ошибка
                    {error}
                </h2>
            </div>
        )
    } else if (success) {
        {
            children
        }
    } else {
        location.reload()
    }
}
