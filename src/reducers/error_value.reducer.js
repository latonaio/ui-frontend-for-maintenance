import {errorValueConstants} from '../constants';

const initialState =
  {
    data: [],
    error: null,
  };

export function error_value(state = initialState, action) {
  if (action.type === errorValueConstants.GET_ERROR_VALUE_REQUEST) {
    return {
      ...state,
    };
  } else if (action.type === errorValueConstants.GET_ERROR_VALUE_SUCCESS) {
    return {
      ...state,
      data: action.payload,
    };
  } else if (action.type === errorValueConstants.GET_ERROR_VALUE_FAILURE) {
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
