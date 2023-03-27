import styles from './Personal.module.css'
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs'
import { Input } from '@/components/UI/Input'
import Link from 'next/link'
import Button from '@/components/UI/Button'
import { useRouter } from 'next/router'
import { PersonalData } from './PersonalData'
import { PersonalDataEdit } from './PersonalDataEdit'
import { useEffect, useState } from 'react'
import { getFullUserInfo } from '@/api/requests'

export const PersonalCabinetPage = () => {
    const { asPath } = useRouter()

    const [userData, setUserData] = useState('')

    const [pageStatus, setPageStatus] = useState('loading')

    useEffect(() => {
        if (localStorage.getItem('user')) {
            getFullUserInfo(localStorage.getItem('user'))
                .then((resp) => {
                    setUserData(resp)
                    setPageStatus('loaded')
                })
                .catch(setPageStatus('unauthorited'))
        } else {
            setUserData(false)
        }
    }, [])

    if (pageStatus === 'loading') {
    }
    if (pageStatus === 'unauthorited') {
        return (
            <div className="container">
                <center>
                    <h1>Эта страница для авторизованных пользователей</h1>
                </center>
            </div>
        )
    }
    if (pageStatus === 'loaded') {
        return (
            <div className="container">
                <div className="card">
                    <h1 className="mainTitle">Личный кабинет</h1>
                    <Tabs>
                        <TabList className={styles.titles}>
                            <Tab className={styles.title}>Текущие заказы</Tab>
                            <Tab className={styles.title}>
                                Выполненные заказы
                            </Tab>
                            <Tab className={styles.title}>Личные данные</Tab>
                        </TabList>

                        <TabPanel>
                            <h2>Content 1</h2>
                        </TabPanel>
                        <TabPanel>
                            <h2>Content 2</h2>
                        </TabPanel>
                        <TabPanel>
                            <form>
                                {asPath === '/personal-cabinet?edit' ? (
                                    <PersonalDataEdit
                                        name={userData.username}
                                        email={userData.email}
                                        phone={userData.phone}
                                        delivery={userData.address}
                                        password="********"
                                    />
                                ) : (
                                    <PersonalData
                                        name={userData.username}
                                        email={userData.email}
                                        phone={userData.phone}
                                        delivery={userData.address}
                                        password="********"
                                    />
                                )}
                                <div className={styles.btn}>
                                    {asPath === '/personal-cabintet?edit' ? (
                                        <Button btnType="button" type="default">
                                            Сохранить
                                        </Button>
                                    ) : (
                                        <Button btnType="button" type="default">
                                            Редактировать
                                        </Button>
                                    )}
                                </div>
                            </form>
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        )
    }
}
