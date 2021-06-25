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
    case ' UPDATE_JOURNEY_WITH_LOCATION':
      const oldJourneyIndex = state.findIndex((journey) => {
        return journey.destination === action.payload.destination;
      });
      state[oldJourneyIndex] = action.payload;
      return state;

    default:
      // If nothing changes, still return state
      return state;
  }
}
