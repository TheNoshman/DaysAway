// REDUCER

export default function userLocationReducer(
  // Default state
  state = {
    timestamp: 0,
    mocked: false,
    coords: {
      altitude: 0,
      heading: 0,
      altitudeAccuracy: 0,
      latitude: 0,
      speed: 0,
      longitude: 0,
      accuracy: 0,
    },
  },
  action,
) {
  switch (action.type) {
    case 'CHANGE_USER_LOCATION':
      console.log('in reducer, case triggered, payload = ', action.payload);
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
