import styles from './Personal.module.css'
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs'
import { Input } from '@/components/UI/Input'
import Link from 'next/link'
import Button from '@/components/UI/Button'
import { useRouter } from 'next/router'
import { PersonalData } from './PersonalData'
import { useEffect, useState } from 'react'
import { getFullUserInfo } from '@/api/requests'
import { Loader } from '@/components/UI/Loader'

export const PersonalCabinetPage = () => {
    const { asPath } = useRouter()

    const [userData, setUserData] = useState('')

    const [pageStatus, setPageStatus] = useState('loading')

    const [personalDataStatus, setPersonalDataStatus] = useState('read')

    useEffect(() => {
        if (localStorage.getItem('user')) {
            getFullUserInfo(localStorage.getItem('user'))
                .then((resp) => {
                    setUserData(resp)
                    setPageStatus('loaded')
                })
                .catch((err) => setPageStatus('unauthorited'))
        } else {
            setUserData(false)
        }
    }, [])

    if (pageStatus === 'loading') {
        return <Loader />
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
                        <TabList className={styles['tab-list']}>
                            <Tab className={styles.tab}>Текущие заказы</Tab>
                            <Tab className={styles.tab}>Выполненные заказы</Tab>
                            <Tab className={styles.tab}>Личные данные</Tab>
                        </TabList>

                        <TabPanel>
                            <h2>Content 1</h2>
                        </TabPanel>
                        <TabPanel>
                            <h2>Content 2</h2>
                        </TabPanel>
                        <TabPanel>
                            <PersonalData
                                name={userData.username}
                                email={userData.email}
                                phone={userData.phone}
                                delivery={
                                    userData.delivery === null
                                        ? 'Не указан'
                                        : userData.delivery
                                }
                                password="********"
                                status={personalDataStatus}
                                changeStatus={setPersonalDataStatus}
                                userID={userData.id}
                                setUserData={setUserData}
                                userData={userData}
                            />
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        )
    }
}
