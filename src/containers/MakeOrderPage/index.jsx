import {
  getFullBikeInfo,
  getFullUserInfo,
  sendOrder,
  updateUserOrders,
} from "@/api/requests";
import { Loader } from "@/components/UI/Loader";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import { CheckBox } from "@/components/UI/Checkbox";
import Button from "@/components/UI/Button";
import { Input } from "@/components/UI/Input";
import { RadioButton } from "@/components/UI/RadioButton";
import { TimeDeliverySelect } from "@/components/TimeDeliverySelect";
import { useRouter } from "next/router";

export const MakeOrderPage = ({ orderInfo, setPageStatus, setBasket }) => {
  const [fullOrderInfo, setFullOrderInfo] = useState({});

  const [customerInfo, setCustomerInfo] = useState({
    customer_name: "",
    delivery_address: "",
    customer_phone: "",
  });

  const [customerAccountInfo, setCustomerAccountInfo] = useState(false);

  const [orderPageStatus, setOrderPageStatus] = useState("loading");
  const [totalPrice, setTotalPrice] = useState(0);

  const router = useRouter();

  useEffect(() => {
    // orderInfo && setFullOrderInfo(orderInfo);
    const newOrderInfo = { ...orderInfo };
    const bikes = orderInfo.products.map(async (item) => {
      return await getFullBikeInfo(item).then((resp) => resp);
    });

    Promise.all(bikes).then((resp) => {
      const products = resp.map((product) => {
        return product.data;
      });
      setFullOrderInfo({ ...newOrderInfo, products: [...products] });
      setOrderPageStatus("loaded");
    });

    if (localStorage.getItem("user")) {
      getFullUserInfo(localStorage.getItem("user")).then((resp) => {
        console.log(resp);
        setCustomerAccountInfo(resp);
        setCustomerInfo((info) => {
          return {
            ...info,
            customer_name: resp?.username,
            delivery_address: resp?.delivery,
            customer_phone: resp?.phone,
          };
        });
      });
    }
  }, [orderInfo]);

  const chaneOrderAdditional = (e, index) => {
    setFullOrderInfo((orderInfo) => {
      const products = [...orderInfo.products];
      products[index].attributes = {
        ...products[index].attributes,
        [e.target.name]: e.target.checked,
      };
      return { ...orderInfo, products };
    });
  };

  const changeCustomerInfo = (e) => {
    setCustomerInfo((customerInfo) => {
      return { ...customerInfo, [e.target.name]: e.target.value };
    });
  };

  useEffect(() => {
    setTotalPrice(
      fullOrderInfo?.products?.reduce((acc, item) => {
        return (acc += item?.attributes?.price);
      }, 0)
    );
  }, [fullOrderInfo.products]);

  const submitOrder = (e) => {
    e.preventDefault();
    setOrderPageStatus("loading");
    const order = {
      ...fullOrderInfo,
      ...customerInfo,
      customer: customerAccountInfo && customerAccountInfo,
    };

    sendOrder(order)
      .then((resp) => {
        setOrderPageStatus("send");
        updateUserOrders(order, localStorage.getItem("user"));
      })
      .catch((err) => console.log(err));
  };

  if (orderPageStatus === "loading") {
    return <Loader />;
  }

  if (orderPageStatus === "loaded") {
    return (
      <>
        <form onSubmit={submitOrder}>
          <div className="container">
            <div className="card-main">
              <h1 className="main-title">Заявка на аренду велосипедов</h1>
              <div className={styles["order-info"]}>
                <div className={styles["order-info-item"]}>
                  <span className="caption">Тип аренды</span>
                  <h4 className={styles["order-info-title"]}>
                    {fullOrderInfo?.rent_type}
                  </h4>
                </div>
                <div className={styles["order-info-item"]}>
                  <span className="caption">Дата и время начала</span>
                  <h4 className={styles["order-info-title"]}>
                    {format(fullOrderInfo?.startDate, "dd/MM/yyyy") ||
                      fullOrderInfo?.rentData?.startDate}
                  </h4>
                </div>

                <div className={styles["order-info-item"]}>
                  <span className="caption">Дата и время конца</span>
                  <h4 className={styles["order-info-title"]}>
                    {format(fullOrderInfo?.endDate, "dd/MM/yyyy") ||
                      fullOrderInfo?.rentData?.startDate}
                  </h4>
                </div>
                <div className={styles["order-info-item"]}>
                  <span className="caption">Доставка</span>
                  <h4 className={styles["order-info-title"]}>
                    {fullOrderInfo?.delivery}
                  </h4>
                </div>
              </div>

              <div className={styles["bike-order-info"]}>
                <div className={styles["bike-order-row"]}>
                  <div className={styles["bike-order-col"]}>
                    <span className={styles.hidden}>Картин</span>
                  </div>
                  <div className={styles["bike-order-col"]}>
                    <span className="caption"> Название велосипедов</span>
                  </div>
                  <div className={styles["bike-order-col"]}>
                    <span className="caption">Шлем</span>
                  </div>
                  <div className={styles["bike-order-col"]}>
                    <span className="caption">Фонарик</span>
                  </div>
                  <div className={styles["bike-order-col"]}>
                    <span className="caption">Замок</span>
                  </div>
                  <div className={styles["bike-order-col"]}>
                    <span className="caption">Стоимость</span>
                  </div>
                </div>
                {fullOrderInfo?.products?.map((product, index) => {
                  return (
                    <div key={product.id} className={styles["bike-order-row"]}>
                      <div className={styles["bike-order-col"]}>
                        <Image
                          src={
                            product?.attributes?.preview_image?.data?.attributes
                              ?.url
                          }
                          width="60"
                          height="45"
                          alt={product?.attributes?.name}
                        />
                      </div>
                      <div className={styles["bike-order-col"]}>
                        {product?.attributes?.name}
                      </div>
                      <div className={styles["bike-order-col"]}>
                        <CheckBox
                          type="default"
                          name="helmet"
                          onChange={(e) => chaneOrderAdditional(e, index)}
                          checked={product?.attributes?.helmet}
                        />
                      </div>
                      <div className={styles["bike-order-col"]}>
                        <CheckBox
                          type="default"
                          name="flashlight"
                          onChange={(e) => chaneOrderAdditional(e, index)}
                          checked={product?.attributes?.flashlight}
                        />
                      </div>
                      <div className={styles["bike-order-col"]}>
                        <CheckBox
                          type="default"
                          name="lock"
                          onChange={(e) => chaneOrderAdditional(e, index)}
                          checked={product?.attributes?.lock}
                        />
                      </div>
                      <div className={styles["bike-order-col"]}>
                        <span className={styles.price}>
                          {product?.attributes?.price} AED
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className={styles["info-price-wrap"]}>
                <Button
                  type="back"
                  btnType="button"
                  onClick={() => {
                    setPageStatus("home");
                  }}
                >
                  Назад к выбору велосипедов
                </Button>
                <div className={styles["info-price"]}>
                  <div className={styles["info-price-item"]}>
                    <span className="caption">Доставка</span>
                    <strong>0 AED</strong>
                  </div>
                  <div className={styles["info-price-item"]}>
                    <span className="caption">Итого</span>
                    <strong className={styles.price}>{totalPrice} AED</strong>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-main">
              <div className={styles["contact-form"]}>
                <div className={styles["contact-form-item"]}>
                  <div className={styles["form-item"]}>
                    <span className="caption">Контактные данные</span>
                    <div className={styles["form-item-inputs"]}>
                      <Input
                        name="customer_name"
                        placeholder="Имя*"
                        onChange={changeCustomerInfo}
                        value={customerInfo.customer_name}
                      />
                      <Input
                        name="customer_phone"
                        placeholder="Номер телефона*"
                        onChange={changeCustomerInfo}
                        value={customerInfo.customer_phone}
                      />
                    </div>
                  </div>
                  <div className={styles["form-item"]}>
                    <span className="caption">Информация о доставке</span>
                    <Input
                      name="delivery_address"
                      placeholder="Адрес*"
                      onChange={changeCustomerInfo}
                      value={customerInfo.delivery_address}
                    />
                  </div>
                  <div className={styles["form-item"]}>
                    <span className="caption">Форма оплаты</span>
                    <div className={styles["form-item-inputs"]}>
                      <RadioButton
                        name="paynent_method"
                        setFullOrderInfo={setFullOrderInfo}
                        payment_method={fullOrderInfo?.payment_method}
                        value="Онлайн"
                        defaultChecked={true}
                        required
                      >
                        Онлайн
                      </RadioButton>
                      <RadioButton
                        name="paynent_method"
                        setFullOrderInfo={setFullOrderInfo}
                        payment_method={fullOrderInfo?.payment_method}
                        value="На месте"
                        required
                      >
                        На месте
                      </RadioButton>
                    </div>
                    {/* <Input type="radio" name="billing" />
                      <Input type="radio" name="billing" /> */}
                  </div>
                </div>
                <div className={styles["contact-form-item"]}>
                  <div className={styles["form-item"]}>
                    <span className="section">Желаемое время доставки</span>
                    <TimeDeliverySelect
                      className={styles["time-selection"]}
                      name="delivery_time"
                      setOrderInfo={setFullOrderInfo}
                      options={[
                        "6:00 AM",
                        "7:00 AM",
                        "8:00 AM",
                        "9:00 AM",
                        "10:00 AM",
                        "11:00 AM",
                        "12:00 AM",
                        "1:00 PM",
                        "2:00 PM",
                        "3:00 PM",
                        "4:00 PM",
                        "5:00 PM",
                        "6:00 PM",
                        "7:00 PM",
                        "8:00 PM",
                      ]}
                    ></TimeDeliverySelect>
                  </div>

                  <div className={styles["form-last-item-wrap"]}>
                    <div className={styles["form-last-item"]}>
                      <span className="caption">Возвращение велосипеда</span>
                      <p>
                        На возвращение велосипеда даётся 1 час. Задача
                        организации, в особенности же сложившаяся структура
                        организации позволяет выполнять Важные задания по
                        разработке позиций, занимаемых участниками в отношении
                        поставленных задач.
                      </p>
                    </div>
                    <div className={styles["form-last-item"]}>
                      <span className="caption">Выбор адреса для возврата</span>
                      <p>
                        Вы также можете ввести адрес другого места, где мы
                        заберем у вас велосипед.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Button type="default" className={styles["submit-btn"]}>
                Забронировать
              </Button>
            </div>
          </div>
        </form>
      </>
    );
  }

  if (orderPageStatus === "send") {
    return (
      <div className="container">
        <div className="card-main">
          <div className={styles["finished-order-wrap"]}>
            <h1 className="main-title text-center m-5">
              Ваш заказ успешно оформлен
            </h1>
            <div className={styles["order-info--finished"]}>
              <div className={styles["order-info-item"]}>
                <span className="caption">Тип аренды</span>
                <h4 className={styles["order-info-title"]}>
                  {fullOrderInfo?.rent_type}
                </h4>
              </div>
              <div className={styles["order-info-item"]}>
                <span className="caption">Дата и время начала</span>
                <h4 className={styles["order-info-title"]}>
                  {format(fullOrderInfo?.startDate, "dd/MM/yyyy") ||
                    fullOrderInfo?.rentData?.startDate}
                </h4>
              </div>

              <div className={styles["order-info-item"]}>
                <span className="caption">Дата и время конца</span>
                <h4 className={styles["order-info-title"]}>
                  {format(fullOrderInfo?.endDate, "dd/MM/yyyy") ||
                    fullOrderInfo?.rentData?.startDate}
                </h4>
              </div>
              <div className={styles["order-info-item"]}>
                <span className="caption">Доставка</span>
                <h4 className={styles["order-info-title"]}>
                  {fullOrderInfo?.delivery}
                </h4>
              </div>
              <div className={styles["order-info-item"]}>
                <span className="caption">Форма оплаты</span>
                <h4 className={styles["order-info-title"]}>
                  {fullOrderInfo?.payment_method}
                </h4>
              </div>
            </div>
            <div className={styles["bike-order-info"]}>
              <div className={styles["bike-order-row--finished"]}>
                <div className={styles["bike-order-col"]}>
                  <span className={styles.hidden}>Картин</span>
                </div>
                <div className={styles["bike-order-col"]}>
                  <span className="caption"> Название велосипедов</span>
                </div>

                <div className={styles["bike-order-col"]}>
                  <span className="caption">Стоимость</span>
                </div>
              </div>
              {fullOrderInfo?.products?.map((product, index) => {
                return (
                  <div
                    key={product.id}
                    className={styles["bike-order-row--finished"]}
                  >
                    <div className={styles["bike-order-col"]}>
                      <Image
                        src={
                          product?.attributes?.preview_image?.data?.attributes
                            ?.url
                        }
                        width="60"
                        height="45"
                        alt={product?.attributes?.name}
                      />
                    </div>
                    <div className={styles["bike-order-col"]}>
                      {product?.attributes?.name}
                    </div>

                    <div className={styles["bike-order-col"]}>
                      <span className={styles.price}>
                        {product?.attributes?.price} AED
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className={styles["total-price-wrap"]}>
              <div className={styles["total-price"]}>
                <div className={styles["total-price-item"]}>
                  <span className="caption">Доставка</span>
                  <strong>0 AED</strong>
                </div>
                <div className={styles["total-price-item"]}>
                  <span className="caption">Итого</span>
                  <strong className={styles.price}>{totalPrice} AED</strong>
                </div>
              </div>
            </div>

            <div className={styles["finished-buttons"]}>
              <Button
                type="default"
                onClick={() => router.push("personal-cabinet")}
              >
                В личный кабинет
              </Button>
              <Button
                type="default_outline"
                onClick={() => {
                  setFullOrderInfo({});
                  setCustomerInfo({});
                  setPageStatus("home");
                  setBasket([]);
                }}
              >
                Назад на главную
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
