// ACTION
export default function homeIsReadyAction(obj) {
  // console.log('in action, obj = ', obj);
  return { type: 'CHANGE_HOME_IS_READY', payload: obj };
}
