import { getFullBikeInfo, getFullUserInfo } from "@/api/requests";
import { Loader } from "@/components/UI/Loader";
import { format } from "date-fns";
import { use, useEffect, useState } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import { CheckBox } from "@/components/UI/Checkbox";
import Button from "@/components/UI/Button";
import { Input } from "@/components/UI/Input";
import { RadioButton } from "@/components/UI/RadioButton";
import { Tooltip } from "@/components/UI/Tooltip";
import { Select } from "@/components/UI/Select";
import { TimeDeliverySelect } from "@/components/TimeDeliverySelect";

export const MakeOrderPage = ({ orderInfo }) => {
  const [fullOrderInfo, setFullOrderInfo] = useState({});

  const [customerInfo, setCustomerInfo] = useState({
    customer_name: "",
    customer_delivery: "",
    customer_phone: "",
  });

  const [orderPageStatus, setOrderPageStatus] = useState("loading");
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    // orderInfo && setFullOrderInfo(orderInfo);
    const newOrderInfo = { ...orderInfo };
    const bikes = orderInfo.products.map(async (item) => {
      return await getFullBikeInfo(item).then((resp) => resp);
    });

    Promise.all(bikes).then((resp) => {
      setFullOrderInfo({ ...newOrderInfo, products: [...resp] });
      setOrderPageStatus("loaded");
    });

    if (localStorage.getItem("user")) {
      getFullUserInfo(localStorage.getItem("user")).then((resp) => {
        console.log(resp);
        setCustomerInfo((info) => {
          return {
            ...info,
            customer_name: resp?.username,
            customer_delivery: resp?.delivery,
            customer_phone: resp?.phone,
          };
        });
      });
    }
  }, [orderInfo]);

  const chaneOrderAdditional = (e, index) => {
    setFullOrderInfo((orderInfo) => {
      const products = [...orderInfo.products];
      products[index].data.attributes = {
        ...products[index].data.attributes,
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
        return (acc += item?.data?.attributes?.price);
      }, 0)
    );
  }, [fullOrderInfo.products]);

  if (orderPageStatus === "loading") {
    return <Loader />;
  }

  if (orderPageStatus === "loaded") {
    return (
      <>
        <form>
          <div className="container">
            <div className="card-main">
              <h1 className="main-title">Заявка на аренду велосипедов</h1>
              <div className={styles["order-info"]}>
                <div className={styles["order-info-item"]}>
                  <span className="caption">Тип аренды</span>
                  <h4 className={styles["order-info-title"]}>
                    {fullOrderInfo?.rentType}
                  </h4>
                </div>
                <div className={styles["order-info-item"]}>
                  <span className="caption">Дата и время начала</span>
                  <h4 className={styles["order-info-title"]}>
                    {format(fullOrderInfo?.rentData?.startDate, "dd/MM/yyyy") ||
                      fullOrderInfo?.rentData?.startDate}
                  </h4>
                </div>

                <div className={styles["order-info-item"]}>
                  <span className="caption">Дата и время конца</span>
                  <h4 className={styles["order-info-title"]}>
                    {format(fullOrderInfo?.rentData?.endDate, "dd/MM/yyyy") ||
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
                    <div
                      key={product.data.id}
                      className={styles["bike-order-row"]}
                    >
                      <div className={styles["bike-order-col"]}>
                        <Image
                          src={
                            product?.data?.attributes?.preview_image?.data
                              ?.attributes?.url
                          }
                          width="60"
                          height="45"
                          alt={product?.data?.attributes?.name}
                        />
                      </div>
                      <div className={styles["bike-order-col"]}>
                        {product?.data?.attributes?.name}
                      </div>
                      <div className={styles["bike-order-col"]}>
                        <CheckBox
                          type="default"
                          name="helmet"
                          onChange={(e) => chaneOrderAdditional(e, index)}
                          checked={product?.data?.attributes?.helmet}
                        />
                      </div>
                      <div className={styles["bike-order-col"]}>
                        <CheckBox
                          type="default"
                          name="flashlight"
                          onChange={(e) => chaneOrderAdditional(e, index)}
                          checked={product?.data?.attributes?.flashlight}
                        />
                      </div>
                      <div className={styles["bike-order-col"]}>
                        <CheckBox
                          type="default"
                          name="lock"
                          onChange={(e) => chaneOrderAdditional(e, index)}
                          checked={product?.data?.attributes?.lock}
                        />
                      </div>
                      <div className={styles["bike-order-col"]}>
                        <span className={styles.price}>
                          {product?.data?.attributes?.price} AED
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className={styles["info-price-wrap"]}>
                <Button type="back">Назад к выбору велосипедов</Button>
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
                      name="customer_delivery"
                      placeholder="Адрес*"
                      onChange={changeCustomerInfo}
                      value={customerInfo.customer_delivery}
                    />
                  </div>
                  <div className={styles["form-item"]}>
                    <span className="caption">Форма оплаты</span>
                    <div className={styles["form-item-inputs"]}>
                      <RadioButton name="billing" required>
                        Онлайн
                      </RadioButton>
                      <RadioButton name="billing" required>
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

              <Button type="default">Забронировать</Button>
            </div>
          </div>
        </form>
      </>
    );
  }
};
