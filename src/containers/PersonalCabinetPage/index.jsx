import styles from "./Personal.module.css";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";
import { Input } from "@/components/UI/Input";
import Link from "next/link";
import Button from "@/components/UI/Button";

export const PersonalCabinetPage = () => {
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
              <div className={styles.form}>
                <div className={styles["input-wrap"]}>
                  <span className="caption">Имя</span>
                  <Input type="text" placeholder="Имя" />
                </div>
                <div className={styles["input-wrap"]}>
                  <span className="caption">E-mail</span>
                  <Input type="text" placeholder=" E-mail" />
                </div>
                <div className={styles["input-wrap"]}>
                  <span className="caption">Пароль</span>
                  <Input type="text" placeholder="Пароль" />
                </div>
                <div className={styles["input-wrap"]}>
                  <span className="caption">Номер телефона</span>
                  <Input type="text" placeholder="Номер телефона" />
                </div>
                <div className={styles["input-wrap"]}>
                  <span className="caption">Адрес доставки</span>
                  <Input type="text" placeholder="Адрес доставки " />
                </div>
                <div className={styles["input-wrap"]}>
                  <Link className={styles.linkPassword} href="/">
                    изменить пароль
                  </Link>
                </div>
              </div>
              <div className={styles.btn}>
                <Button type="default">Редактировать</Button>
              </div>
            </form>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};
