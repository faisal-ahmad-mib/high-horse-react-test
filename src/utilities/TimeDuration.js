import * as moment from 'moment';

export class TimeDuration {

	static getTimeDuration(unixTime) {

		let currentMoment = moment.default();
		let itemMoment = moment.unix(unixTime);

		let years = currentMoment.diff(itemMoment, 'years');
		if(years > 1)
			return `${years} years`;
		else if(years === 1)
			return `${years} year`;

		let months = currentMoment.diff(itemMoment, 'months');
		if(months > 1)
			return `${months} months`;
		else if(months === 1)
			return `${months} month`;

		let weeks = currentMoment.diff(itemMoment, 'weeks');
		if(weeks > 1)
			return `${weeks} weeks`;
		else if(weeks === 1)
			return `${weeks} week`;

		let days = currentMoment.diff(itemMoment, 'days');
		if(days > 1)
			return `${days} days`;
		else if(days === 1)
			return `${days} day`;

		let hours = currentMoment.diff(itemMoment, 'hours');
		if(hours > 1)
			return `${hours} hours`;
		else if(hours === 1)
			return `${hours} hour`;

		let minutes = currentMoment.diff(itemMoment, 'minutes');
		if(minutes > 1)
			return `${minutes} minutes`;
		else if(minutes === 1)
			return `${minutes} minute`;

		return itemMoment.format("MM/DD/YYYY");
	}
}