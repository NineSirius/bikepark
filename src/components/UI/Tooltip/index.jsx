import clsx from 'clsx'
import { useState } from 'react'
import Button from '../Button'
import styles from './Tooltip.module.css'

export const Tooltip = ({ children, type, title, isVisible, setIsVisible }) => {
    const change = () => {
        setIsVisible((state) => !state)
    }
    return (
        <>
            <div className={styles.tooltip}>
                <div className={styles.btn}>
                    <label>
                        <input type="checkbox" onChange={change} />
                        <span className={isVisible && styles.active}>
                            {title}
                        </span>
                    </label>
                </div>
                <div
                    className={clsx(
                        styles.tooltipContent,
                        type && styles[type],
                        isVisible && styles.active,
                    )}
                >
                    {children}
                </div>
            </div>

            <div
                className={clsx(styles.overlay, isVisible && styles.active)}
                onClick={change}
            ></div>
        </>
    )
}
