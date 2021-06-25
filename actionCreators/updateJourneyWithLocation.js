// ACTION
export default function updateJourneyWithLocation(obj) {
  // console.log('in action, obj = ', obj);
  return { type: 'UPDATE_JOURNEY_WITH_LOCATION', payload: obj };
}
