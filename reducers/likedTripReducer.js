// REDUCER

export default function likedTripReducer(
  // Default state
  state = [],
  action,
) {
  switch (action.type) {
    case 'ADD_LIKED_TRIP_TO_REDUX':
      console.log(
        'in likedTripReducer, case triggered, payload = ',
        action.payload,
      );
      if (state === []) {
        return [action.payload];
      } else {
        return [...state, action.payload];
      }
    default:
      // If nothing changes, still return state
      return state;
  }
}
