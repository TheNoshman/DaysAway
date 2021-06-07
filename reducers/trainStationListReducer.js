// REDUCER

export default function trainStationListReducer(
  // Default state
  state = {
    request_time: 0,
    source: null,
    acknowledgements: null,
    member: [
      {
        type: null,
        name: null,
        latitude: 0,
        longitude: 0,
        accuracy: 0,
        station_code: null,
        tiploc_code: null,
      },
    ],
  },
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
