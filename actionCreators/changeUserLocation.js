// ACTION
export default function changeUserLocation(obj) {
  console.log('in action, obj = ', obj);
  return { type: 'CHANGE_USER_LOCATION', payload: obj };
}
