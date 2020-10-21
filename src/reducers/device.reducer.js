import {deviceConstants} from '../constants';

const initialState =
  {
    data: [],
    error: null,
  };

export function device(state = initialState, action) {
  if (action.type === deviceConstants.FETCH_DEVICES_REQUEST) {
    return {
      ...state,
    };
  } else if (action.type === deviceConstants.FETCH_DEVICES_SUCCESS) {
    return {
      ...state,
      data: action.payload,
    };
  } else if (action.type === deviceConstants.FETCH_DEVICES_FAILURE) {
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
