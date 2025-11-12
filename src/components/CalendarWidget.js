import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function CalendarWidget({ selectedDate, onChange }) {
  return (
    <div className="calendar-widget mb-3">
      <Calendar value={selectedDate} onChange={onChange} />
    </div>
  );
}

export default CalendarWidget;
