import React, { useState, useEffect } from "react";
import clsx from "clsx";
import moment from "moment";


function RBCToolbar(props) {
  const { label, date, view, views, onView, onNavigate, localizer } = props;
  const [month, setMonth] = useState("January");
  const mMonth = moment(date).format("MMMM");
  const months = moment.months();

  useEffect(() => {
    setMonth(mMonth);
  }, [mMonth]);

  const start = new Date(2022,8,20)
  const end = new Date(2025, 8,20)


  const goToView = (view) => {
    onView(view);
    if (date <= start) {
        onNavigate("TODAY")
    }
  };

  const goToBack = () => {
    onNavigate("PREV");
  };
  const goToNext = () => {
    onNavigate("NEXT");
  };

  const goToToday = () => {
    onNavigate("TODAY");
  };

  const disablePrev = () => {
    if (moment(date).diff(start, "days") <= 0) {
        return true
    } else {
        return false
    }
  }

  const disableNext = () => {
    if (label==="9月 2025" || label=== "9月 14 – 20" || label === "金曜日 9月 19") {
        return true
    } else if (view === "agenda" && new Date(label.slice(12,24)) >= end) {
        return true
    } else {
        return false
    }
  }

  return (
    <div className="rbc-toolbar">
      <div className="rbc-btn-group">
        <button onClick={goToToday}>今日</button>
        <button disabled={disablePrev() ? true : false } onClick={goToBack}>前へ</button>
        <button disabled={disableNext() ? true : false } onClick={goToNext}>次へ</button>
      </div>
      <span className="rbc-toolbar-label">{label}</span>
      <div className="rbc-btn-group">
          <button onClick={() => goToView("month")} key="month" className={clsx({ "rbc-active": view === "month" })}>月</button>
          <button onClick={() => goToView("week")} key="week" className={clsx({ "rbc-active": view === "week" })}>週</button>
          <button onClick={() => goToView("day")} key="day" className={clsx({ "rbc-active": view === "day" })}>日</button>
          <button onClick={() => goToView("agenda")} key="agenda" className={clsx({ "rbc-active": view === "agenda" })}>イベント一覧</button>
      </div>
    </div>
  );
}

export default RBCToolbar;