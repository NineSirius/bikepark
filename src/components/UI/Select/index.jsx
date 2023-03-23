import clsx from 'clsx'
import { useEffect, useState } from 'react'
import styles from './Select.module.css'

export const Select = ({ name, options }) => {
    const [activeOption, setActiveOption] = useState('')

    const [optionList, setOptionList] = useState([])

    const [customSelectStatus, setCustomSelectStatus] = useState(false)

    useEffect(() => {
        setOptionList(options)
        options && setActiveOption(options[0])
    }, [options])

    const changeSelect = (e) => {
        setActiveOption(e.target.value)
    }
    return (
        <>
            <div className={styles['custom-select-wrap']}>
                <select
                    name={name}
                    onChange={changeSelect}
                    checked={setActiveOption}
                >
                    {optionList &&
                        optionList.map((item, index) => {
                            return (
                                <option
                                    key={index}
                                    value={item}
                                    selected={item === activeOption}
                                >
                                    {item}
                                </option>
                            )
                        })}
                </select>

                <div className={styles['custom-select']}>
                    <div
                        className={clsx(
                            styles.activeValue,
                            customSelectStatus && styles.active,
                        )}
                        onClick={() =>
                            setCustomSelectStatus((status) => !status)
                        }
                    >
                        {activeOption} <i className="icon-arrow-down"></i>
                    </div>

                    <div
                        className={clsx(
                            styles['custom-select-list'],
                            customSelectStatus && styles.active,
                        )}
                    >
                        {optionList &&
                            optionList.map((item, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={styles['select-list-item']}
                                        onClick={() => {
                                            setActiveOption(item)
                                            setCustomSelectStatus(false)
                                        }}
                                    >
                                        {item}
                                    </div>
                                )
                            })}
                    </div>
                </div>
            </div>
        </>
    )
}
