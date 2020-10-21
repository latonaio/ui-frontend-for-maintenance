import {softwareVersionConstants} from '../constants';

const initialState =
  {
    data: [],
    error: null,
  };

export function software_version(state = initialState, action) {
  if (action.type === softwareVersionConstants.GET_SOFT_VERSION_REQUEST) {
    return {
      ...state,
    };
  } else if (action.type === softwareVersionConstants.GET_SOFT_VERSION_SUCCESS) {
    return {
      ...state,
      data: action.payload,
    };
  } else if (action.type === softwareVersionConstants.GET_SOFT_VERSION_FAILURE) {
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
