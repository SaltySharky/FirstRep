import React, { useState } from "react";
import Calendar from "react-calendar";
//import 'react-calendar/dist/Calendar.css'; // Import default styles
import './CustomCalendar.css'; // Import custom styles for highlighting

const CustomCalendar = ({ workoutDates }) => {
  const [value, setValue] = useState(new Date());

  // Check if a date is in the highlightedDates array
  const isHighlighted = (date) => {
    const dateString = date.toISOString().split("T")[0];
    return workoutDates.includes(dateString);
  };

  const handleDateChange = (value) => {
    if (value instanceof Date) {
      setValue(value); // Update state with the selected date
    }
  };

  return (
    <Calendar
        onChange={handleDateChange}
        value={value}
        locale="en-US"
        tileClassName={({ date, view }) =>
          // Highlight dates only in month view
          view === "month" && isHighlighted(date) ? "highlighted-date" : null
        }
    />
  );
};

export default CustomCalendar;