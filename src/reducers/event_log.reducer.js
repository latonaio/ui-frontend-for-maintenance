import {eventLogConstants} from '../constants';

const MAX_LENGTH = 10;


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

export function event_log(state = initialState, action) {
  if (action.type === eventLogConstants.GET_EVENT_REQUEST) {
    return {
      ...state,
    };
  } else if (action.type === eventLogConstants.GET_EVENT_SUCCESS) {
    const data = [...state.data];

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
  } else if (action.type === eventLogConstants.GET_EVENT_FAILURE) {
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
