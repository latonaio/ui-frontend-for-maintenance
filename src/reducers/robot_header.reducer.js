import {robotHeaderConstants} from '../constants';

const initialState =
  {
    data: {
      robotID: null,
      robotName: "",
      processID: null,
      processName: "",
    },
    error: null,
  };

export function robot_header(state = initialState, action) {
  if (action.type === robotHeaderConstants.GET_ROBOT_NAME_REQUEST) {
    return {
      ...state,
    };
  } else if (action.type === robotHeaderConstants.GET_ROBOT_NAME_SUCCESS) {
    return {
      ...state,
      data: {
        ...state.data,
        ...action.payload
      },
    };
  } else if (action.type === robotHeaderConstants.GET_ROBOT_NAME_FAILURE) {
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
