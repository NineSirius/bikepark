import styles from './Checkbox.module.css'

export const CheckBox = ({ type, onChange, name, required }) => {
    return (
        <label>
            <div className={styles.checkbox}>
                <input
                    type="checkbox"
                    onChange={onChange && onChange}
                    name={name && name}
                    required={required && required}
                />
                <span className={type && styles[type]}></span>
            </div>
        </label>
    )
}
