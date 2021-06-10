// REDUCER

export default function trainStationListReducer(
  // Default state
  state = [{ label: 'Select a station...', value: 'station_code' }],
  action,
) {
  switch (action.type) {
    case 'CHANGE_LOCAL_TRAIN_STATIONS':
      console.log(
        'in trainStationListReducer, case triggered, payload = ',
        action.payload,
      );
      return action.payload;
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
