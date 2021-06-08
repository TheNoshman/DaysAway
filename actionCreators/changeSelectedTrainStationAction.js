// ACTION
export default function changeSelectedTrainStationAction(obj) {
  // console.log('in action, obj = ', obj);
  return { type: 'CHANGE_USER_SELECTED_TRAIN_STATION', payload: obj };
}
