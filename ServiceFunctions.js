const dayjs = require('dayjs');

// DISTANCE CALC BETWEEN TWO COORDS
export const distanceCalculator = (lat1, lon1, lat2, lon2) => {
  if (lat1 === lat2 && lon1 === lon2) {
    return 0;
  } else {
    const radlat1 = (Math.PI * lat1) / 180;
    const radlat2 = (Math.PI * lat2) / 180;
    const theta = lon1 - lon2;
    const radtheta = (Math.PI * theta) / 180;
    let dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    return dist;
  }
};

// REMOVES DUPLICATE SERVICES FOR API CALL IN SERVICE API
export const removeDuplicateServices = (timetable) => {
  let uniqueServices = [];
  for (const trainService of timetable.departures.all) {
    if (
      !uniqueServices.some(
        (serv) =>
          serv.destination === trainService.destination_name &&
          serv.serviceCode === trainService.service,
      )
    ) {
      uniqueServices.push({
        serviceCode: trainService.service,
        destination: trainService.destination_name,
        timetableURL: trainService.service_timetable.id,
      });
    }
  }
  return uniqueServices;
};

// ASSIGNS API 'CALLING AT' RESULTS TO SERVICES IN TIMETABLE
export const assignStopsToTrain = (timetable, stopsArray) => {
  timetable.departures.all.forEach((train, index) => {
    const stopsIndex = stopsArray.findIndex(
      (obj) =>
        obj.service === train.service &&
        obj.destination === train.destination_name,
    );
    timetable.departures.all[index].callingAt =
      stopsArray[stopsIndex].callingAtResult;
  });
  return timetable;
};

// FILTERS OUT SAME SERVICES AT DIFFERENT TIMES FOR HOME DISPLAY
export const uniqueServicesOnly = (timetable) => {
  timetable.departures.unique = [];
  timetable.departures.all.forEach((train) => {
    if (
      timetable.departures.unique.findIndex(
        (serv) =>
          train.destination_name === serv.destination_name &&
          train.service === serv.service,
      ) === -1
    ) {
      timetable.departures.unique.push(train);
    }
  });
  return timetable;
};

// CALCULATE DIFFERENCE BETWEEN DEPARTURE TIME AND ARRIVAL TIME
// IF TRUE, JOURNEY OK. IF FALSE, JOURNEY TOO LONG
export const getJourneyTime = (departureTime, arrivalTime, userTime) => {
  const timeToMins = (time) => {
    const b = time.split(':');
    return b[0] * 60 + +b[1];
  };
  const timeFromMins = (mins) => {
    function z(n) {
      return (n < 10 ? '0' : '') + n;
    }
    // eslint-disable-next-line no-bitwise
    const h = ((mins / 60) | 0) % 24;
    const m = mins % 60;
    return z(h) + '.' + z(m);
  };
  const journeyTime =
    +timeFromMins(timeToMins(arrivalTime) - timeToMins(departureTime)) * 100;
  userTime = +userTime.replace(':', '.') * 100;
  return userTime > journeyTime;
};

// console.log(getJourneyTime('15:05', '15:35', '00:20')); // 13:55
// console.log(getJourneyTime('12:13', '13:42', '01.50')); // 01:55
// console.log(getJourneyTime('02:43', '03:42', '02.10')); // 06:25
