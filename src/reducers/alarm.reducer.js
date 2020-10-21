import {alarmConstants} from '../constants';

const MAX_LENGTH = 100;


function getEmptyData() {
  const data = Array(MAX_LENGTH);
  data.fill({});
  return data;
}

const initialState =
  {
    data: [
      getEmptyData(),
      getEmptyData(),
      getEmptyData(),
      getEmptyData(),
      getEmptyData(),
    ],
    error: null,
  };

export function alarm(state = initialState, action) {
  if (action.type === alarmConstants.GET_ALARM_DATA_REQUEST) {
    return {
      ...state,
    };
  } else if (action.type === alarmConstants.GET_ALARM_DATA_SUCCESS) {
    const data = {...state.data};

    for (let i = 0; i < action.payload.length; i++) {
      data[i] = {
        ...state.data[i],
        ...action.payload[i]
      }
    }

    return {
      ...state,
      data,
    };
  } else if (action.type === alarmConstants.GET_ALARM_DATA_FAILURE) {
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
