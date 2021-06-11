// ACTION
export default function updateTimetableCacheAction(obj) {
  // console.log('in action, obj = ', obj);
  return { type: 'UPDATE_STATION_TIMETABLE', payload: obj };
}
