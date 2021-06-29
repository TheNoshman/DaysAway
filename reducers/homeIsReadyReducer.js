// REDUCER

export default function homeIsReadyState(
  // Default state
  state = false,
  action,
) {
  switch (action.type) {
    case 'CHANGE_HOME_IS_READY':
      console.log(
        'in homeIsReadyState, case triggered, payload = ',
        action.payload,
      );
      return state;

    default:
      // If nothing changes, still return state
      return state;
  }
}
