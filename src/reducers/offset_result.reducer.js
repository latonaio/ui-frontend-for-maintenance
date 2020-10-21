import {offsetResultConstants} from '../constants';

const initialState =
  {
    data: {
      ArrayNo: null,
      ParameterSet: null,
      RobotForm: [null, null, null, null, null, null, null, null],
      ToolNo: null,
      UserCordinates: null,
      RobotFormExtension: null,
      Axes01: 0.000,
      Axes02: 0.000,
      Axes03: 0.000,
      Axes04: 0.000,
      Axes05: 0.000,
      Axes06: 0.000,
      Axes07: 0.000,
      Axes08: 0.000,
    },
    error: null,
  };

export function offset_result(state = initialState, action) {
  if (action.type === offsetResultConstants.GET_OFFSET_REQUEST) {
    return {
      ...state,
    };
  } else if (action.type === offsetResultConstants.GET_OFFSET_SUCCESS) {
    let data = {...state.data};
    if (action.payload.length > 0) {
      data = action.payload.slice(-1)[0];
      data['RobotForm'] = JSON.parse(data['RobotForm'])
    }

    return {
      ...state,
      data
    };
  } else if (action.type === offsetResultConstants.GET_OFFSET_FAILURE) {
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
