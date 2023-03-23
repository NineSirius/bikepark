import styles from './style.module.css'

export const Input = ({
    type,
    placeholder,
    onChange,
    name,
    required,
    value,
}) => {
    return (
        <>
            <label>
                <div className={styles.inputWrap}>
                    <input
                        type={type}
                        name={name && name}
                        onChange={onChange && onChange}
                        placeholder={placeholder}
                        required={required && required}
                        value={value && value}
                    />
                    <div></div>
                </div>
            </label>
        </>
    )
}
