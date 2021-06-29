// ACTION
export default function addLikedTripAction(obj) {
  // console.log('in action, obj = ', obj);
  return { type: 'ADD_LIKED_TRIP_TO_REDUX', payload: obj };
}
