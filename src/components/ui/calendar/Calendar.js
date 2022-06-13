import React, { useContext } from "react";
import "./Calendar.scss";
import IcArrow from "assets/IcArrow";
import UiContext from "stores/UiContext";
import useCalendar from "./useCalendar";

const Calendar = () => {
  const store = useContext(UiContext);

  const {
    prevMonth,
    nextMonth,
    calendarData,
    dayNames,
    holidayCheck,
    dates,
    selectedDay,
    selectDay,
  } = useCalendar({ store });

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button className="btn-prev-month" onClick={prevMonth}>
          <IcArrow color="#999999" />
        </button>
        <div className="month-info">
          {`${calendarData.year} . ${calendarData.month}`}
        </div>
        <button className="btn-next-month" onClick={nextMonth}>
          <IcArrow color="#999999" />
        </button>
      </div>
      <div className="calendar-day">
        {dayNames.map((dayName, index) => (
          <div className={`day-header ${holidayCheck(index)}`} key={dayName}>
            {dayName}
          </div>
        ))}
      </div>
      <div className="calendar-body">
        {dates.map((data, index) => (
          <DateItem
            data={data}
            key={data.fullDate}
            holiday={holidayCheck(index)}
            selected={selectedDay === data.fullDate}
            onClick={() => {
              selectDay(data.fullDate);
            }}
          />
        ))}
      </div>
    </div>
  );
};

const DateItem = (props) => {
  const holiday = props.holiday ? ` ${props.holiday}` : "";
  const selected = props.selected ? " selected" : "";
  const blank = props.data.fullDate ? "" : " blank";

  return (
    <div
      className={`date-item${selected}${holiday}${blank}`}
      onClick={props.onClick}
    >
      {props.data.date}
    </div>
  );
};

export default Calendar;
