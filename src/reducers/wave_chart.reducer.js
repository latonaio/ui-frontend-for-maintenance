import {waveChartConstants} from '../constants';

const MAX_X_LENGTH = 30;

const GET_ROBOT_POSITION_COMMAND = "0x0075";
const GET_ROBOT_TORQUE_COMMAND = "0x0077";

const data = {
  [GET_ROBOT_POSITION_COMMAND]: emptyData(),
  [GET_ROBOT_TORQUE_COMMAND]: emptyData(),
};

const initialState =
  {
    data: data,
    error: null,
  };

function emptyData() {
  const data = Array(MAX_X_LENGTH);
  data.fill({});
  return data;
}

export function wave_chart(state = initialState, action) {
  if (action.type === waveChartConstants.GET_WAVE_DATA_REQUEST) {
    return {
      ...state,
    };
  } else if (action.type === waveChartConstants.GET_WAVE_DATA_SUCCESS) {
    const data = {
      [GET_ROBOT_POSITION_COMMAND]: [],
      [GET_ROBOT_TORQUE_COMMAND]: [],
    };
    const payload = {...action.payload};

    for (let command in payload) {
      if (payload.hasOwnProperty(command)) {
        for (let i = 0; i < Math.min(payload[command].length, MAX_X_LENGTH); i++) {
          if (data.hasOwnProperty(command)) {
            data[command].push(payload[command][i]);
          }
        }

        if (data.hasOwnProperty(command)) {
          data[command] = data[command].slice(0, MAX_X_LENGTH).reverse();
        }
      }
    }

    return {
      ...state,
      data,
    };
  } else if (action.type === waveChartConstants.GET_WAVE_DATA_FAILURE) {
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
