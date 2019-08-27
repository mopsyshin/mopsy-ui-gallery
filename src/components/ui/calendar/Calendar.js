import React, { useState, useEffect, useCallback, useContext } from 'react';
import './Calendar.scss';
import IcArrow from 'assets/IcArrow';
import UiContext from 'stores/UiContext';

const Calendar = props => {
  const store = useContext(UiContext);
  const dayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const [dates, setDates] = useState([]);
  const [dayFirst, setDayFirst] = useState(0);
  const [selectedDay, setSelectedDay] = useState('');
  const [calendarData, setCalendarData] = useState({
    year: 2019,
    month: 1,
    date: 1,
    day: 1,
    dayFirst: 1,
  });

  const initToday = useCallback(data => {
    setSelectedDay(getFullDate(data, data.date));
  }, []);

  const drawCalendar = useCallback((data, dayFirst) => {
    const dayLength = getDayLength(data);
    const temp = [];

    for (let i = 0; i < dayFirst % 7; i += 1) {
      temp.push({});
    }

    for (let i = 1; i < dayLength; i += 1) {
      temp.push({
        fullDate: getFullDate(data, i),
        year: data.year,
        month: data.month,
        date: i,
      })
    }

    setDayFirst(dayFirst);
    setCalendarData(data);
    setDates(temp);
  }, []);

  useEffect(() => {
    const newDate = new Date();
    const { data, dayFirst } = makeStandardDate(newDate);
    drawCalendar(data, dayFirst);
    initToday(data);
  }, [drawCalendar, initToday])

  const makeStandardDate = newDate => {
    const data = {
      year: newDate.getFullYear(),
      month: newDate.getMonth() + 1,
      date: newDate.getDate(),
      day: newDate.getDay(),
    }

    let dayFirst = data.day - ((data.date - 1) % 7);
    if (dayFirst < 0) { dayFirst += 7}
    
    return { data, dayFirst };
  }

  const getDayLength = data => {

    const isMatching = (value, arr) => {
      let result = false;
      arr.forEach((num) => {
        if (value === num) {
          result = true;
          return;
        }
      })
      return result;
    }

    if (isMatching(data.month ,[4,6,9,11])) {
      return 31;
    } else if (isMatching(data.month, [2])) {
      switch(0) {
        case data.year % 400:
          return 30;
        case data.year % 100:
          return 29;
        case data.year % 4:
          return 30;
        default: 
          return 29;
      }
    }
    return 32;
  }

  const getFullDate = (data, dateNum) => {
    const numberToString = el => {
      const value = el.toString();
      if (value.length === 1) {
        return `0${value}`;
      }
      return value;
    }

    const month = numberToString(data.month);
    const date = numberToString(dateNum);
    const fullDate = `${data.year}-${month}-${date}`;

    return fullDate;
  }

  const prevMonth = () => {
    const data = calendarData;
    if (data.month !== 1) {
      data.month -= 1;
    } else {
      data.month = 12;
      data.year -= 1;
    }

    const prevMonthLength = getDayLength(data) - 1;
    const prevDayFirst = 7 - ((prevMonthLength - dayFirst) % 7);

    store.addLog(`[Calendar : To Prev Month] ${data.month}`);
    drawCalendar(data, prevDayFirst);
  }

  const nextMonth = () => {
    const data = calendarData;
    if (data.month !== 12) {
      data.month += 1;
    } else {
      data.month = 1;
      data.year += 1;
    }

    const dayFirst = dates.length % 7;
    
    store.addLog(`[Calendar : To Next Month] ${data.month}`);
    drawCalendar(data, dayFirst);
  }

  const selectDay = fullDate => {
    if (fullDate) {
      setSelectedDay(fullDate);
    }
    store.addLog(`[Calendar : Select Day] ${fullDate}`);
  }

  const holidayCheck = (index) => {
    switch (index % 7) {
      case 0:
        return 'sunday';
      case 6:
        return 'saturday';
      default:
        return '';
    }
  }

  const renderCalendarDays = () => {
    return dayNames.map((dayName, index) => {
      return (
        <div className={`day-header ${holidayCheck(index)}`} key={index}>
          {dayName}
        </div>
      )
    })
  }

  const renderCalendarDates = () => {
    return dates.map((date, index) => {
      return (
        <DateItem data={date}
                  key={index}
                  holiday={holidayCheck(index)}
                  isSelected={selectedDay === date.fullDate}
                  onClick={() => {selectDay(date.fullDate)}}/>
      )
    })
  }

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <button className="btn-prev-month" onClick={prevMonth}>
          <IcArrow/>
        </button>
        <div className="month-info">
          {`${calendarData.year} . ${calendarData.month}`}
        </div>
        <button className="btn-next-month" onClick={nextMonth}>
          <IcArrow/>
        </button>
      </div>
      <div className="calendar-day">
        {renderCalendarDays()}
      </div>
      <div className="calendar-body">
        {renderCalendarDates()}
      </div>
    </div>
  )
}

const DateItem = props => {
  return (
    <div className={`date-item ${props.isSelected ? 'selected ' : ''}${props.holiday}`}
         onClick={props.onClick}>
      {props.data.date}
    </div>
  )
}

export default Calendar;