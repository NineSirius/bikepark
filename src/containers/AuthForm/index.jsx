import { addNewUser, getFullUserInfo, loginUser } from "@/api/requests";
import { Alert } from "@/components/UI/Alert";
import Button from "@/components/UI/Button";
import { CheckBox } from "@/components/UI/Checkbox";
import { Input } from "@/components/UI/Input";
import { Tooltip } from "@/components/UI/Tooltip";
import { URLSearchParams } from "next/dist/compiled/@edge-runtime/primitives/url";
import Link from "next/link";
import { useState } from "react";
import { TabList, Tabs, Tab, TabPanel } from "react-tabs";
import styles from "./Auth.module.css";

export const AuthForm = ({ closeAuth }) => {
  const [registerUserData, setRegisterUserData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    agreement: false,
  });

  const [loginUserData, setLoginUserData] = useState({
    identifier: "",
    password: "",
  });

  const [registerResult, setRegisterResult] = useState(null);

  const [errorStatus, setErrorStatus] = useState({
    errorMessage: {},
    status: false,
  });

  const [registerStatus, setRegisterStatus] = useState({
    regRequestMessage: {},
    status: false,
  });

  const registerChange = (e) => {
    setRegisterUserData((user) => {
      if (e.target.name !== "agreement") {
        return {
          ...registerUserData,
          [e.target.name]: e.target.value,
        };
      } else {
        return {
          ...registerUserData,
          [e.target.name]: e.target.checked,
        };
      }
    });
  };

  const registerSubmit = (e) => {
    setRegisterResult("loading");
    e.preventDefault();
    addNewUser(registerUserData)
      .then((resp) => resp.json())
      .then((data) => {
        localStorage.setItem("user", data.jwt);
        setRegisterResult("Регистрация выполнена успешно");
        setTimeout(() => {
          location.reload();
        }, 3000);
      });
  };

  const loginChange = (e) => {
    setLoginUserData((loginUserData) => {
      return {
        ...loginUserData,
        [e.target.name]: e.target.value,
      };
    });
  };

  const loginSubmit = (e) => {
    e.preventDefault();
    loginUser(loginUserData)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        // getFullUserInfo(data.jwt)
        //     .then((resp) => resp.json())
        //     .then((fullData) => console.log(fullData))
        localStorage.setItem("user", data.jwt);
        location.reload();
      })
      .catch((error) => {
        console.log(error);
        setErrorStatus((errorStatus) => {
          return {
            ...errorStatus,
            errorMessage: error,
            status: true,
          };
        });
      });
  };

  return (
    <div className={styles.auth}>
      <Tabs>
        <TabList className={styles["tab-list"]}>
          <Tab className={styles.tab}>Авторизация</Tab>
          <Tab className={styles.tab}>Регистрация</Tab>
        </TabList>

        <TabPanel>
          <form onSubmit={loginSubmit}>
            <div className={styles["login-form"]}>
              {/* {errorStatus.status && (
                                <Alert
                                    type="error"
                                    isVisible={errorStatus.status}
                                    close={() =>
                                        setErrorStatus((errorStatus) => {
                                            return {
                                                ...errorStatus,
                                                status: false,
                                            }
                                        })
                                    }
                                >
                                    {errorStatus.errorMessage.response
                                        .status === 400
                                        ? 'Неверный логин или пароль'
                                        : 'Возникла ошибка, попробуйте позже'}
                                </Alert>
                            )} */}
              <div className={styles["input-wrap"]}>
                <span className="caption">Введите номер телефона*</span>
                <Input
                  type="text"
                  placeholder="Введите номер телефона"
                  name="identifier"
                  onChange={loginChange}
                />
              </div>
              <div className={styles["input-wrap"]}>
                <span className="caption">Пароль*</span>
                <Input
                  type="password"
                  placeholder="Введите пароль"
                  name="password"
                  onChange={loginChange}
                />
              </div>

              <Button type="default_fill">Войти</Button>
            </div>
          </form>
        </TabPanel>
        <TabPanel>
          <form onSubmit={registerSubmit}>
            <div className={styles["login-form"]}>
              {registerResult !== null ? (
                <Alert type="success">
                  Регистрация выполнена успешно <br />
                </Alert>
              ) : null}
              <div className={styles["input-wrap"]}>
                <span className="caption">Имя*</span>
                <Input
                  type="text"
                  placeholder="Введите имя"
                  name="username"
                  onChange={registerChange}
                />
              </div>
              <div className={styles["input-wrap"]}>
                <span className="caption">Номер телефона*</span>
                <Input
                  type="text"
                  placeholder="Введите номер телефона"
                  name="phone"
                  onChange={registerChange}
                />
              </div>
              <div className={styles["input-wrap"]}>
                <span className="caption">E-mail</span>
                <Input
                  type="email"
                  placeholder="E-mail"
                  name="email"
                  onChange={registerChange}
                />
              </div>
              <div className={styles["input-wrap"]}>
                <span className="caption">Пароль*</span>
                <Input
                  type="password"
                  placeholder="Введите пароль"
                  name="password"
                  onChange={registerChange}
                />
              </div>

              <div className={styles["input-wrap--row"]}>
                <CheckBox
                  type="default"
                  name="agreement"
                  onChange={registerChange}
                />
                <span>Согласие на обработку персональных данных</span>
              </div>

              <Button
                type="default_fill"
                disabled={!registerUserData.agreement}
              >
                Войти
              </Button>
            </div>
          </form>
        </TabPanel>
      </Tabs>
    </div>
  );
};
