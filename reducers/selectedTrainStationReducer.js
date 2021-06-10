// REDUCER

export default function selectedTrainStationReducer(
  // Default state
  state = { code: null, name: 'name' },
  action,
) {
  switch (action.type) {
    case 'CHANGE_USER_SELECTED_TRAIN_STATION':
      console.log(
        'in selectedTrainStationReducer, case triggered, payload = ',
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
