// ACTION
export default function addSeenDestinationAction(obj) {
  // console.log('in action, obj = ', obj);
  return { type: 'ADD_SEEN_DESTINATION_TO_CACHE', payload: obj };
}
