import {axesConstants} from '../constants';

const initialState =
  {
    data: {
      ArrayNo: "",
      Axes01: "Axes01",
      Axes02: "Axes02",
      Axes03: "Axes03",
      Axes04: "Axes04",
      Axes05: "Axes05",
      Axes06: "Axes06",
      Axes07: "Axes07",
      Axes08: "Axes08",
    },
    error: null,
  };

export function axes(state = initialState, action) {
  if (action.type === axesConstants.GET_AXES_NAME_REQUEST) {
    return {
      ...state,
    };
  } else if (action.type === axesConstants.GET_AXES_NAME_SUCCESS) {
    return {
      ...state,
      data: {
        ...state.data,
        ...action.payload,
      },
    };
  } else if (action.type === axesConstants.GET_AXES_NAME_FAILURE) {
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
