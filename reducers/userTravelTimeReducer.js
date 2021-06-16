// REDUCER

export default function userTravelTimeReducer(
  // Default state
  state = {},
  action,
) {
  switch (action.type) {
    case 'CHANGE_USER_TRAVEL_TIME':
      console.log(
        'in userTravelTimeReducer, case triggered, payload = ',
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
