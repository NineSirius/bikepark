import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Button from '../UI/Button'
import { navData } from './navData'
import styles from './style.module.css'
import { useEffect, useState } from 'react'
import { Tooltip } from '../UI/Tooltip'

export const Navbar = () => {
    const { asPath } = useRouter()

    const [timeDubai, setTimeDubai] = useState('00:00')

    let time = new Date()

    setInterval(() => {
        time = new Date()

        const timeFormat = time.getHours <= 12 ? 'AM' : 'PM'

        const hours =
            time.getHours() - 2 > 12
                ? time.getHours() - 14
                : time.getHours() - 2

        const minutes =
            time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()

        setTimeDubai(`${hours}:${minutes} ${timeFormat}`)
    }, 1000)

    return (
        <header className={styles.header}>
            <div className={clsx('container', styles.navContainer)}>
                <div className="logo">
                    <Image
                        src="/img/logo.svg"
                        alt="logo"
                        width="66"
                        height="42"
                    />
                </div>

                <nav className={styles.nav}>
                    {navData.map((item) => {
                        return (
                            <Link
                                key={item.id}
                                href={item.path}
                                className={clsx(
                                    styles.navLink,
                                    asPath === item.path && styles.active,
                                )}
                            >
                                {item.title}
                            </Link>
                        )
                    })}
                </nav>

                <div className={styles.controls}>
                    <Link href="tel:+971 52 563 4064" className={styles.phone}>
                        +971 52 563 4064
                    </Link>

                    <Tooltip type="account" title="User">
                        <Link href="/orders">Личный кабинет</Link>
                        <Link href="/orders">Выйти</Link>
                    </Tooltip>
                    <Button type="default_small">Feedback</Button>

                    <div className={styles.navTime}>
                        <h2>{timeDubai}</h2>
                        <span>Time in Dubai</span>
                    </div>
                </div>
            </div>
        </header>
    )
}
