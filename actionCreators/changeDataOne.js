// ACTION
export default function changeDataOne(obj) {
  console.log('in action, obj = ', obj);
  return { type: 'CHANGE_DATA', payload: obj };
}
