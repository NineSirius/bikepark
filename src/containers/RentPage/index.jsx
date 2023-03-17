import Button from '@/components/UI/Button'
import styles from './RentPage.module.css'
import Image from 'next/image'
import clsx from 'clsx'
import { Select } from '@/components/UI/Select'

export const RentPage = () => {
    return (
        <div className="container">
            <div className={styles['card-main-wrap']}>
                <div className="card-main">
                    {/* <div className={styles['header-banner-wrap']}>
                        <h1 className={clsx('title', styles['card-title'])}>
                            Аренда велосипедов <br /> c доставкой
                        </h1>

                        <div className={styles['header-banner']}>
                            <div className={styles['header-banner-item']}>
                                <Image
                                    src="/img/header-banner-item1.svg"
                                    width={1280}
                                    height={720}
                                    alt="Шлем"
                                />
                                <div className={styles.info}>
                                    <h4 className={styles['info-title']}>
                                        Шлем
                                    </h4>
                                    <span className={styles['info-price']}>
                                        Бесплатно
                                    </span>
                                </div>
                            </div>
                            <div className={styles['header-banner-item']}>
                                <Image
                                    src="/img/header-banner-item2.svg"
                                    width={1280}
                                    height={720}
                                    alt="Шланг"
                                />
                                <div className={styles.info}>
                                    <h4 className={styles['info-title']}>
                                        Шлем
                                    </h4>
                                    <span className={styles['info-price']}>
                                        Бесплатно
                                    </span>
                                </div>
                            </div>
                            <div className={styles['header-banner-item']}>
                                <Image
                                    src="/img/header-banner-item3.svg"
                                    width={1280}
                                    height={720}
                                    alt="Чота там"
                                />
                                <div className={styles.info}>
                                    <h4 className={styles['info-title']}>
                                        Шлем
                                    </h4>
                                    <span className={styles['info-price']}>
                                        Бесплатно
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
                <div className="card-main">
                    <Select elems={['По адресу', 'Самовызов ']} />
                </div>
            </div>
        </div>
    )
}
