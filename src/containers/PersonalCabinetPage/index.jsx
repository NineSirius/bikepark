import styles from './Personal.module.css'
import { Tabs, TabList, Tab, TabPanel } from 'react-tabs'
import { Input } from '@/components/UI/Input'
import Link from 'next/link'
import Button from '@/components/UI/Button'
import { useRouter } from 'next/router'
import { PersonalData } from './PersonalData'
import { PersonalDataEdit } from './PersonalDataEdit'

export const PersonalCabinetPage = () => {
    const { asPath } = useRouter()
    return (
        <div className="container">
            <div className="card">
                <h1 className="mainTitle">Личный кабинет</h1>
                <Tabs>
                    <TabList className={styles.titles}>
                        <Tab className={styles.title}>Текущие заказы</Tab>
                        <Tab className={styles.title}>Выполненные заказы</Tab>
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
                                    name="Alex"
                                    email="alexdsds@gmail.com"
                                    phone="+996 556 256 756"
                                    delivery="Бостон"
                                    password="40320ds3"
                                />
                            ) : (
                                <PersonalData
                                    name="Alex"
                                    email="alexdsds@gmail.com"
                                    phone="+996 556 256 756"
                                    delivery="Бостон"
                                    password="40320ds3"
                                />
                            )}
                            <div className={styles.btn}>
                                <Button type="default">Редактировать</Button>
                            </div>
                        </form>
                    </TabPanel>
                </Tabs>
            </div>
        </div>
    )
}
