import {orderLogConstants} from '../constants';

const initialState =
  {
    data: [],
    error: null,
  };

export function order_log(state = initialState, action) {
  if (action.type === orderLogConstants.GET_ORDER_LOG_REQUEST) {
    return {
      ...state,
    };
  } else if (action.type === orderLogConstants.GET_ORDER_LOG_SUCCESS) {
    return {
      ...state,
      data: action.payload,
    };
  } else if (action.type === orderLogConstants.GET_ORDER_LOG_FAILURE) {
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
