// ACTION
export default function changeTimetableAction(obj) {
  // console.log('in action, obj = ', obj);
  return { type: 'CHANGE_STATION_TIMETABLE', payload: obj };
}
