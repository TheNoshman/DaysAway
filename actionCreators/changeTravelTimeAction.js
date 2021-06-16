// ACTION
export default function changeTravelTimeAction(obj) {
  // console.log('in action, obj = ', obj);
  return { type: 'CHANGE_USER_TRAVEL_TIME', payload: obj };
}
