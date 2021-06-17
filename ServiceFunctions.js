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
