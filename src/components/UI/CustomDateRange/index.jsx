import { useEffect, useRef, useState } from "react";
import { DateRange } from "react-date-range";
import format from "date-fns/format";

import styles from "./date.module.css";

import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { addDays } from "date-fns";
import clsx from "clsx";

export const CustomDateRange = ({ changeOrderInfo }) => {
  const [calendarOpen, setCalendarOpen] = useState(false);

  const refOne = useRef(null);

  useEffect(() => {
    document.addEventListener("keydown", hideOnEscape, true);
    document.addEventListener("click", hideOnClickOutside, true);
  }, []);

  const hideOnEscape = (e) => {
    if (e.key === "Escape") {
      setCalendarOpen(false);
    }
  };
  const hideOnClickOutside = (e) => {
    if (refOne.current && !refOne.current.contains(e.target)) {
      setCalendarOpen(false);
    }
  };

  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  useEffect(() => {
    changeOrderInfo((data) => {
      console.log(data);
      return {
        ...data,
        startDate: range[0].startDate,
        endDate: range[0].endDate,
      };
    });
  }, [changeOrderInfo, range]);

  return (
    <div className={styles["calendar-wrap"]}>
      <div className={styles["select-date-item"]}>
        <span className="caption">Дата и время начала</span>
        <input
          value={`${format(range[0].startDate, "MM.dd.yyyy")}`}
          readOnly
          className={styles["input-box"]}
          onClick={() => setCalendarOpen((open = !open))}
        />
      </div>
      <div className={styles["select-date-item"]}>
        <span className="caption">Дата и время конца</span>
        <input
          value={`${format(range[0].endDate, "MM.dd.yyyy")} `}
          readOnly
          className={styles["input-box"]}
          onClick={() => setCalendarOpen((open = !open))}
        />
      </div>
      <div ref={refOne}>
        {
          <DateRange
            onChange={(item) => setRange([item.selection])}
            editableDateInputs={false}
            moveRangeOnFirstSelection={false}
            ranges={range}
            months={2}
            direction={"horizontal"}
            className={clsx(
              styles["calendar-item"],
              calendarOpen && styles.active
            )}
          />
        }
      </div>
    </div>
  );
};
