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

// TIME
// Convert a time in hh:mm format to minutes
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
  return z(h) + ':' + z(m);
};

// Add two times in hh:mm format
function getJourneyTime(departureTime, arrivalTime) {
  return timeFromMins(timeToMins(arrivalTime) - timeToMins(departureTime));
}

console.log(getJourneyTime('15:05', '15:35')); // 13:55
// console.log(addTimes('12:13', '13:42')); // 01:55
// console.log(addTimes('02:43', '03:42')); // 06:25
