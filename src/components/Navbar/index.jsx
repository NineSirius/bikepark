import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import Button from "../UI/Button";
import { navData } from "./navData";
import styles from "./style.module.css";
import { useEffect, useState } from "react";
import { Tooltip } from "../UI/Tooltip";
import { Hamburger } from "../Hamburger";
import { ContactForm } from "./ContactForm";
import { Modal } from "../UI/Modal";
import { AuthForm } from "@/containers/AuthForm";
import { getFullUserInfo } from "@/api/requests";
import { ConfirmationModal } from "@/containers/ConfirmationModal";

export const Navbar = () => {
  const { asPath } = useRouter();
  const [feedbackActive, setFeedbackActive] = useState(false);
  const [userPopUp, setUserPopUp] = useState(false);

  const [timeDubai, setTimeDubai] = useState("0:00 AM");
  const [navActive, setNavActive] = useState(false);
  const [authActive, setAuthActive] = useState(false);
  const [logOutConfirmation, setLogOutConfirmation] = useState(false);

  const [userInfo, setUserInfo] = useState({});

  const [userJWT, setUserJWT] = useState();

  useEffect(() => {
    if (localStorage.getItem("user")) {
      setUserJWT(localStorage.getItem("user"));
      getFullUserInfo(localStorage.getItem("user")).then((resp) =>
        setUserInfo(resp)
      );
    }
  }, []);

  useEffect(() => {
    navActive && document.body.classList.add("fixed");
    !navActive && document.body.classList.remove("fixed");
  }, [navActive]);

  useEffect(() => {
    setNavActive(false);
  }, [asPath]);

  useEffect(() => {
    authActive && setNavActive(false);
  }, [authActive]);

  let time = new Date();

  setInterval(() => {
    time = new Date();

    const worldTime = time.getUTCHours() + 4;

    const timeFormat = worldTime <= 12 ? "AM" : "PM";
    const hours = worldTime > 12 ? worldTime - 12 : worldTime;

    const minutes =
      time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes();

    setTimeDubai(`${hours}:${minutes} ${timeFormat}`);
  }, 1000);

  return (
    <header className={styles.header}>
      <div className={clsx("container", styles.navContainer)}>
        <div className={styles.logo}>
          <Image src="/img/logo.svg" alt="logo" width="66" height="42" />
        </div>

        <div
          className={clsx(
            styles.mobileNavContainer,
            navActive && styles.active
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
                    asPath === item.path && styles.active
                  )}
                >
                  {item.title}
                </Link>
              );
            })}
          </nav>
          <div className={styles.controls}>
            <Link href="tel:+971 52 563 4064" className={styles.phone}>
              +971 52 563 4064
            </Link>

            <Tooltip
              type="account"
              icon="user"
              isVisible={userPopUp}
              setIsVisible={setUserPopUp}
            >
              {userJWT ? (
                <>
                  <Link href="/personal-cabinet">Личный кабинет</Link>
                  {userInfo?.role?.name === "Admin" && (
                    <Link href="/order-management">Управление заказми</Link>
                  )}
                  <Button
                    type="link"
                    onClick={() => setLogOutConfirmation(true)}
                  >
                    Выйти
                  </Button>
                </>
              ) : (
                <Button
                  type="link"
                  onClick={() => {
                    setAuthActive(true);
                    setUserPopUp(false);
                  }}
                >
                  Авторизация
                </Button>
              )}
            </Tooltip>
            <Button
              type="nav_default_small"
              onClick={() => {
                setFeedbackActive(true);
                setNavActive(false);
              }}
            >
              Feedback
            </Button>
          </div>
        </div>
        <div className={styles.navTime}>
          <h2>{timeDubai}</h2>
          <span>Time in Dubai</span>
        </div>

        <Modal isVisible={authActive} close={() => setAuthActive(false)}>
          <AuthForm closeAuth={() => setAuthActive(false)} />
        </Modal>

        <ConfirmationModal
          title="Вы действительно хотите выйти"
          isVisible={logOutConfirmation}
          setIsVisible={setLogOutConfirmation}
          isSuccess={() => {
            localStorage.removeItem("user");
            setUserJWT(null);
          }}
        />

        <Hamburger
          onClick={() => setNavActive((navActive) => !navActive)}
          isActive={navActive}
        />
      </div>
      <Modal isVisible={feedbackActive} close={() => setFeedbackActive(false)}>
        <ContactForm />
      </Modal>
    </header>
  );
};
