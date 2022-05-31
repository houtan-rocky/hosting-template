class Event {
	constructor(subject, description, year, month, day, hour, minute, second) {
		this.subject = subject;
		this.description = description;
		this.timeStamp = new TimeStamp(year, month, day, hour, minute, second);
	}
	// Accessors
	// subject
	get subject() {
		return this._subject;
	}
	set subject(subject) {
		this._subject = subject;
	}

	// description
	get description() {
		return this._description;
	}
	set description(description) {
		this._description = description;
	}

	// timeStamp
	get timeStamp() {
		return this._timeStamp;
	}
	set timeStamp(timeStamp) {
		this._timeStamp = timeStamp;
	}

	static compareEvent(event1, event2) {
		return TimeStamp.compareTimeStamp(event1.timeStamp, event2.timeStamp);
	}
}

class TimeStamp {
	constructor(year, month, day, hour, minute, second) {
		this.date = new Dates(year, month, day);
		this.time = new Time(hour, minute, second);
	}

	toString(format) {
		let splitted = format.split("T");
		return (
			this.date.toString(splitted[0]) + " " + this.time.toString(splitted[1])
		);
	}

	static compareTimeStamp(timeStamp1, timeStamp2) {
		let dateCompare = Dates.compareDate(timeStamp1.date, timeStamp2.date);
		if (dateCompare !== 0) {
			return dateCompare;
		} else if (dateCompare === 0) {
			return Time.compareTime(timeStamp1.time, timeStamp2.time);
		}
	}
}

class Time {
	constructor(hour, minute, second) {
		this.hour = hour;
		this.minute = minute;
		this.second = second;
	}

	// hour
	get hour() {
		return this._hour;
	}
	set hour(hour) {
		if (hour <= 23 && hour >= 0) {
			this._hour = hour;
		} else {
			throw Error("Invalid Hour");
		}
	}

	// minute
	get minute() {
		return this._minute;
	}
	set minute(minute) {
		if (minute <= 59 && minute >= 0) {
			this._minute = minute;
		} else {
			throw Error("Invalid Minute");
		}
	}

	//second
	get second() {
		return this._second;
	}
	set second(second) {
		if (second >= 0 && second <= 59) {
			this._second = second;
		}
	}

	// toString
	toString(format) {
		let append = "";
		if (format.includes("h")) {
			append = " " + am_or_pm(this._hour);
		}
		let result = format
			.replace("h", (this.hour.toString() % 12).toString().padStart(2, "0"))
			.replace("H", this.hour.toString().padStart(2, "0"))
			.replace("i", this._minute.toString().padStart(2, "0"))
			.replace("s", this._second.toString().padStart(2, "0"));

		return result + append;
	}

	// compare time
	static compareTime(time1, time2) {
		if (
			new Date().setHours(time1._hour, time1._minute, time1._second) >
			new Date().setHours(time2._hour, time2._minute, time2._second)
		) {
			return 1;
		} else if (
			new Date().setHours(time1._hour, time1._minute, time1._second) <
			new Date().setHours(time2._hour, time2._minute, time2._second)
		) {
			return -1;
		} else {
			return 0;
		}
	}
}

class Dates {
	constructor(year, month, day) {
		this.year = year;
		this.month = month;
		this.day = day;
	}

	// setters & getters
	// day
	get day() {
		return this._day;
	}

	set day(day) {
		if (this._month >= 0 && this._month <= 6) {
			if (day >= 1 && day <= 31) {
				this._day = day;
			}
		} else if (this._month >= 7 && this._month <= 12) {
			if (day >= 1 && day <= 30) {
				this._day = day;
			}
		} else {
			throw Error("Input day is wrong");
		}
	}

	// month
	get month() {
		return this._month;
	}

	set month(month) {
		if (month >= 1 && month <= 12) {
			this._month = month;
		} else {
			throw Error("Input month is wrong");
		}
	}

	// year
	get year() {
		return this._year;
	}

	set year(year) {
		if (year >= 1300 && year < new Date().getFullYear()) {
			this._year = year;
		} else {
			throw Error("Input year is wrong");
		}
	}

	// methods
	// to string
	toString(format) {
		return format
			.replace("y", this.year.toString().substring(2).padStart(2, "0"))
			.replace("Y", this.year.toString().padStart(2, "0"))
			.replace("m", this.month.toString().padStart(2, "0"))
			.replace("d", this.day.toString().padStart(2, "0"));
	}

	//compare date
	static compareDate(date1, date2) {
		if (
			new Date(date1.year, date1.month, date1.day) >
			new Date(date2.year, date2.month, date2.day)
		) {
			return 1;
		} else if (
			new Date(date1.year, date1.month, date1.day) <
			new Date(date2.year, date2.month, date2.day)
		) {
			return -1;
		} else {
			return 0;
		}
	}
}

function am_or_pm(hour) {
	return +hour < 12 ? `AM` : `PM`; // Set AM/PM
}

// make a list of Events
let e = new Event("subject", "description", 1999, 8, 10, 14, 24, 8);
// e.timeStamp.toString('Y/m/dTh:i:s')
let e1 = new Event("subject1", "description1", 1997, 2, 3, 8, 3, 2);
let e2 = new Event("subject2", "description2", 1800, 2, 3, 8, 3, 2);
let e3 = new Event("subject3", "description3", 1700, 2, 3, 8, 3, 2);

let eventList = [e, e1, e2, e3];
console.log(eventList.sort(Event.compareEvent));
