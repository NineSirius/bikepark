import clsx from "clsx";
import { useEffect, useRef, useState } from "react";
import styles from "./Select.module.css";

export const TimeDeliverySelect = ({ name, options, setOrderInfo }) => {
  const [activeOption, setActiveOption] = useState("");

  const [optionList, setOptionList] = useState([]);

  const [customSelectStatus, setCustomSelectStatus] = useState(false);

  const ref = useRef();

  useEffect(() => {
    setOptionList(options);
    options && setActiveOption(options[0]);
  }, [options]);

  useEffect(() => {
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  useEffect(() => {
    if (name === "delivery_time") {
      setOrderInfo((data) => {
        return {
          ...data,
          delivery_time: activeOption,
        };
      });
    }
  }, [activeOption, name, setOrderInfo]);

  const changeSelect = (e) => {
    setActiveOption(e.target.value);
  };

  const hideOnClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      setCustomSelectStatus(false);
    }
  };
  return (
    <>
      <div ref={ref}>
        <div className={styles["custom-select-wrap"]}>
          <select name={name} onChange={changeSelect} checked={setActiveOption}>
            {optionList &&
              optionList.map((item, index) => {
                return (
                  <option
                    key={index}
                    value={item}
                    selected={item === activeOption}
                  >
                    {item}
                  </option>
                );
              })}
          </select>

          <div className={styles["custom-select"]}>
            <div
              className={clsx(
                styles.activeValue,
                customSelectStatus && styles.active
              )}
              onClick={() => setCustomSelectStatus((status) => !status)}
            >
              {activeOption} <i className="icon-arrow-down"></i>
            </div>

            <div
              className={clsx(
                styles["custom-select-list"],
                customSelectStatus && styles.active
              )}
            >
              {optionList &&
                optionList.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className={clsx(
                        styles["select-list-item"],
                        activeOption === item && styles.active
                      )}
                      onClick={() => {
                        setActiveOption(item);
                        setCustomSelectStatus(false);
                      }}
                    >
                      {item}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
