import Button from "@/components/UI/Button";
import styles from "./RentPage.module.css";
import Image from "next/image";
import clsx from "clsx";
import { Select } from "@/components/UI/Select";
import { Tooltip } from "@/components/UI/Tooltip";

import { Switcher } from "@/components/UI/Switcher";
import { CustomDateRange } from "@/components/UI/CustomDateRange";
import { RentBikeCard } from "@/components/RentBikeCard/RentBikeCard";
import { useEffect, useState } from "react";
import { getProducts, getTypes } from "@/api/requests";
import { Loader } from "@/components/UI/Loader";
import { ProductCard } from "./ProductCard";
import { useRouter } from "next/router";
import { MakeOrderPage } from "../MakeOrderPage";

export const RentPage = () => {
  const [bikeTypes, setBikeTypes] = useState([]);

  useEffect(() => {
    getTypes().then((resp) => {
      setBikeTypes(resp.data);
      console.log(resp);
    });
  }, []);

  const [orderInfo, setOrderInfo] = useState({
    rentType: "",
    startDate: "",
    endDate: "",
    delivery: "",
  });

  const changeToOrderPage = () => {
    setOrderInfo({
      rentType: "По дням",
      products: [],
      startDate: "",
      endDate: "",
      delivery: "По адресу",
    });
    // setPageStatus("makeOrder");
  };

  const [productsStatus, setProductsStatus] = useState("pending");

  const [pageStatus, setPageStatus] = useState("home");

  const [products, setProducts] = useState([]);

  const [filtersParams, setFilterParams] = useState([]);

  const [basket, setBasket] = useState([]);

  const submit = (e) => {
    e.preventDefault();
    setProductsStatus("loading");
    // setBasket([]);
    getProducts(filtersParams.length >= 1 && filtersParams)
      .then((resp) => {
        console.log(resp);
        setProducts(resp.data);
        setProductsStatus("loaded");
        // setOrderInfo((orderInfo) => {
        //   // const pr
        //   return [...orderInfo];
        // });
      })
      .catch(setProductsStatus("error"));
  };

  const addToFilterParams = (params) => {
    setFilterParams((filterParams) => {
      if (!filterParams?.includes(params)) {
        console.log(params);
        if (filterParams) {
          return [...filterParams, params];
        }
      }
      if (filterParams?.includes(params)) {
        console.log("Убрал " + params);
        return filterParams.filter((item) => item !== params);
      }
    });
  };

  const addToBasket = (e, id) => {
    if (e.target.checked) {
      setBasket((basket) => {
        return [...basket, id];
      });
    } else {
      setBasket((basket) => {
        return basket.filter((item) => item !== id);
      });
    }
  };

  const bookFromBasket = (e) => {};

  if (pageStatus === "home") {
    return (
      <form onSubmit={submit}>
        <div className="container">
          {basket.length >= 1 && (
            <div className={clsx(styles["order-info"])}>
              <div className={clsx(styles["order-info-content"], "container")}>
                <p>
                  Количество велосипедов{" "}
                  <strong className={styles.count}>{basket.length}</strong>
                </p>
                <Button type="default" onClick={changeToOrderPage}>
                  Забронировать
                </Button>
              </div>
            </div>
          )}
          <div className={styles["card-main-wrap"]}>
            <div className="card-main">
              <div className={styles["header-banner-wrap"]}>
                <h1 className={clsx("title", styles["card-title"])}>
                  Аренда велосипедов <br /> c доставкой
                </h1>

                <div className={styles["header-banner"]}>
                  <div className={styles["header-banner-item"]}>
                    <Image
                      src="/img/helmet.png"
                      width={1280}
                      height={720}
                      alt="Шлем"
                    />
                    <div className={styles.info}>
                      <h4 className={styles["info-title"]}>Шлем</h4>
                      <span className={styles["info-price"]}>Бесплатно</span>
                    </div>
                  </div>
                  <div className={styles["header-banner-item"]}>
                    <Image
                      src="/img/flashlight.png"
                      width={1280}
                      height={720}
                      alt="Шланг"
                    />
                    <div className={styles.info}>
                      <h4 className={styles["info-title"]}>Фонарик</h4>
                      <span className={styles["info-price"]}>Бесплатно</span>
                    </div>
                  </div>
                  <div className={styles["header-banner-item"]}>
                    <Image
                      src="/img/lock.png"
                      width={1280}
                      height={720}
                      alt="Чота там"
                    />
                    <div className={styles.info}>
                      <h4 className={styles["info-title"]}>Замок</h4>
                      <span className={styles["info-price"]}>Бесплатно</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles["filter-wrap"]}>
                <div className={styles["filter-item"]}>
                  <span className="caption">Тип велосипеда</span>
                  <Switcher first="По дням" second="2 часа" />
                </div>
                <div className={styles["filter-item"]}>
                  <CustomDateRange />
                </div>
                <div className={styles["filter-item"]}>
                  <span className="caption">Доставка</span>
                  <Select name="name" options={["По адресу", "Самовызов"]} />
                </div>
              </div>
            </div>
            <div className={clsx("card-main", styles["filter-card"])}>
              <span className="caption">Тип велосипеда</span>

              <div className={styles["bike-types-wrap"]}>
                {bikeTypes.map((item, index) => {
                  console.log(item);
                  return (
                    <RentBikeCard
                      key={index}
                      title={item.attributes.name}
                      image={
                        item?.attributes?.preview_image?.data?.attributes?.url
                      }
                      price={item.attributes.price}
                      hint={item.attributes.hint}
                      onChange={() => addToFilterParams(item.attributes.name)}
                    />
                  );
                })}
              </div>

              <Button type="default" className={styles["find-btn"]}>
                Найти
              </Button>
            </div>

            {productsStatus === "loading" && (
              <div className="card-main">
                <Loader />
              </div>
            )}
            {productsStatus === "loaded" && (
              <div className="card-main">
                <div className={styles["products-filter"]}>
                  <div className={styles["filter-item"]}>
                    <span className="caption">Бренд</span>
                    <Select
                      name="name"
                      options={[
                        "Все",
                        "Schwinn",
                        "Parapera",
                        "Airwings",
                        "Bobike",
                      ]}
                    />
                  </div>
                  <div className={styles["filter-item"]}>
                    <span className="caption">Размер рамы</span>
                    <Select name="name" options={["Все", "Самовызов"]} />
                  </div>
                </div>

                <div className={styles["products-list"]}>
                  {products.map((item) => {
                    return (
                      <ProductCard
                        key={item?.id}
                        name={item?.attributes?.name}
                        size={item?.attributes?.size}
                        previewImg={
                          item?.attributes?.preview_image?.data?.attributes
                        }
                        brand={item?.attributes?.brand}
                        price={item?.attributes?.price}
                        id={item?.id}
                        addToBasket={(e) => addToBasket(e, item?.id)}
                        status={item?.attributes?.status}
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
    );
  }

  if (pageStatus === "makeOrder") {
    return <MakeOrderPage orderInfo={orderInfo} />;
  }
};
