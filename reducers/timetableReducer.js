// REDUCER

export default function timetableReducer(
  // Default state
  state = [],
  action,
) {
  switch (action.type) {
    case 'CHANGE_STATION_TIMETABLE':
      console.log(
        'in timetableReducer, case triggered, payload = ',
        action.payload,
      );
      console.log('payload', [action.payload]);
      console.log('state ', state);

      return [...state, action.payload];
    // [state, action.payload];
    default:
      // If nothing changes, still return state
      return state;
  }
}

// Mock action variable
// {
//   type: "CHANGE_DATA,
//   payload: {location json}
// }
