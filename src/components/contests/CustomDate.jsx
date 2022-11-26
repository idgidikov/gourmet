import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import addDays from "date-fns/addDays";

import "react-datepicker/dist/react-datepicker.css";

//https://reactdatepicker.com/#example-date-range-for-one-datepicker-with-disabled-dates-highlighted
function CustomDate({ startDate, setStartDate, endDate, setEndDate }) {
	const onChange = (dates) => {
		const [start, end] = dates;
		setStartDate(start);
		setEndDate(end);
	};

	return (
		<DatePicker
			selected={startDate}
			onChange={onChange}
			startDate={startDate}
			endDate={endDate}
			selectsRange
			minDate={new Date()}
			maxDate={addDays(startDate, 29)}
			isClearable={true}
			dateFormat="yyyy:mm:dd hh:mm:ss.msmsms"
			placeholderText="Calendar"
			selectsDisabledDaysInRange
			withPortal
		/>
	);
}

export default CustomDate;
