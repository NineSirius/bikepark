import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Button from '../UI/Button'
import { navData } from './navData'
import styles from './style.module.css'
import { useEffect, useState } from 'react'
import { Tooltip } from '../UI/Tooltip'
import { Hamburger } from '../Hamburger'
import { ContactForm } from './ContactForm'

export const Navbar = () => {
    const { asPath } = useRouter()
    const [feedbackActive, setFeedbackActive] = useState(false)

    const [timeDubai, setTimeDubai] = useState('0:00 AM')
    const [navActive, setNavActive] = useState(false)

    let time = new Date()

    setInterval(() => {
        time = new Date()

        const worldTime = time.getUTCHours() + 4

        const timeFormat = worldTime <= 12 ? 'AM' : 'PM'
        const hours = worldTime > 12 ? worldTime - 12 : worldTime

        const minutes =
            time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()

        setTimeDubai(`${hours}:${minutes} ${timeFormat}`)
    }, 1000)

    const hamburgerActive = () => {}

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

                <div
                    className={clsx(
                        styles.mobileNavContainer,
                        navActive && styles.active,
                    )}
                >
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
                        <Link
                            href="tel:+971 52 563 4064"
                            className={styles.phone}
                        >
                            +971 52 563 4064
                        </Link>

                        <Tooltip type="account" title="User">
                            <Link href="/orders">???????????? ??????????????</Link>
                            <Link href="/orders">??????????</Link> 
                        </Tooltip>
                        <Button
                            type="nav_default_small"
                            onClick={() => setFeedbackActive(true)}
                        >
                            Feedback
                        </Button>
                    </div>

                    <ContactForm
                        feedbackActive={feedbackActive}
                        setFeedbackActive={setFeedbackActive}
                    />
                </div>
                <div className={styles.navTime}>
                    <h2>{timeDubai}</h2>
                    <span>Time in Dubai</span>
                </div>

                <Hamburger
                    onClick={() => setNavActive((navActive) => !navActive)}
                    isActive={navActive}
                />
            </div>
        </header>
    )
}
