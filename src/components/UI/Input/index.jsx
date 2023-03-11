import styles from './style.module.css'

export const Input = ({ type, placeholder, onChange, name, required }) => {
    return (
        <>
            <div className={styles.inputWrap}>
                <input
                    type={type}
                    name={name && name}
                    onChange={onChange && onChange}
                    placeholder={placeholder}
                    required={required && required}
                />
            </div>
        </>
    )
}
