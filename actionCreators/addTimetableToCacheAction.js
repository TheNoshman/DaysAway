// ACTION
export default function addTimetableToCacheAction(obj) {
  // console.log('in action, obj = ', obj);
  return { type: 'ADD_STATION_TIMETABLE', payload: obj };
}
