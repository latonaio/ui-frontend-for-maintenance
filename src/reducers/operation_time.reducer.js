import {operationTimeConstants} from '../constants';

const ARRAY_NO_LIST = [
  1,   // 制御電源投入時間
  10,  // サーボ電源投入時間
  110, // プレイバック時間(TOTAL)
  210, // 移動時間(TOTAL)
  301, // 作業時間(用途1)
];

const data = {};
for (let i = 0; i < ARRAY_NO_LIST.length; i++) {
  data[ARRAY_NO_LIST[i]] = {
    StartTime: null,
    ElapsedTime: null,
  }
}

const initialState =
  {
    data: data,
    error: null,
  };

export function operation_time(state = initialState, action) {
  if (action.type === operationTimeConstants.GET_OPERATION_TIME_REQUEST) {
    return {
      ...state,
    };
  } else if (action.type === operationTimeConstants.GET_OPERATION_TIME_SUCCESS) {
    return {
      ...state,
      data: {
        ...state.data,
        ...action.payload,
      }
    };
  } else if (action.type === operationTimeConstants.GET_OPERATION_TIME_FAILURE) {
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
