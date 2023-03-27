import clsx from 'clsx'
import { useEffect, useState } from 'react'
import styles from './Switcher.module.css'

export const Switcher = ({ first, second }) => {
    const [firstIsChecked, setFirstIsChecked] = useState(true)
    const [secondIsChecked, setSecondIsChecked] = useState(false)

    return (
        <>
            <div className={styles.switcher}>
                <label>
                    <div
                        className={clsx(
                            styles['switch-btn'],
                            firstIsChecked && styles.active,
                        )}
                    >
                        <input
                            type="radio"
                            name="switcher"
                            value={first}
                            onChange={() => {
                                setFirstIsChecked(true)
                                setSecondIsChecked(false)
                            }}
                            defaultChecked
                        />
                        <span>{first}</span>
                    </div>
                </label>
                <label>
                    <div
                        className={clsx(
                            styles['switch-btn'],
                            secondIsChecked && styles.active,
                        )}
                    >
                        <input
                            type="radio"
                            name="switcher"
                            value={second}
                            onChange={() => {
                                setSecondIsChecked(true)
                                setFirstIsChecked(false)
                            }}
                        />

                        <span>{second}</span>
                    </div>
                </label>
            </div>
        </>
    )
}
