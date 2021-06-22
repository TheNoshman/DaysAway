// REDUCER

export default function seenDestinationReducer(
  // Default state
  state = [],
  action,
) {
  switch (action.type) {
    case 'ADD_SEEN_DESTINATION_TO_CACHE':
      console.log(
        'in seenDestinationReducer, case triggered, payload = ',
        action.payload,
      );
      return [...state, action.payload];
    default:
      // If nothing changes, still return state
      return state;
  }
}
