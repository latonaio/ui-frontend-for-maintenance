import {jtektAlarmConstants} from '../constants';

const MAX_LENGTH = 50;


function getEmptyData() {
  const data = Array(MAX_LENGTH);
  data.fill({});
  return data;
}

const initialState =
  {
    data: getEmptyData(),
    error: null,
  };

export function jtekt_alarm(state = initialState, action) {
  if (action.type === jtektAlarmConstants.GET_JTEKT_ALARM_DATA_REQUEST) {
    return {
      ...state,
    };
  } else if (action.type === jtektAlarmConstants.GET_JTEKT_ALARM_DATA_SUCCESS) {
    // TODO ソート処理をバックエンドに移動する/
    let data = action.payload.sort(
      (a, b) => a.ErrorOccurrenceTime + a.CircuitAddres > b.ErrorOccurrenceTime + b.CircuitAddres ? 1 : -1).reverse();

    return {
      ...state,
      data
    };
  } else if (action.type === jtektAlarmConstants.GET_JTEKT_ALARM_DATA_FAILURE) {
    return {
      ...state,
      error: action.payload.error,
    }
  } else {
    return {
      ...state
    }
  }
}
