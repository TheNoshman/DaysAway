// REDUCER

export default function timetableReducer(
  // Default state
  state = [],
  action,
) {
  switch (action.type) {
    case 'ADD_STATION_TIMETABLE':
      if (state === []) {
        return [action.payload];
      } else {
        return [...state, action.payload];
      }
    case 'UPDATE_STATION_TIMETABLE':
      const oldTimetableIndex = state.findIndex((timetable) => {
        return timetable.station_code === action.payload.station_code;
      });
      state[oldTimetableIndex] = action.payload;
      return state;
    default:
      // If nothing changes, still return state
      return state;
  }
}
