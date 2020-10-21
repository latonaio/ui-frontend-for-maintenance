import {timeChartConstants} from '../constants';

const MAX_X_LENGTH = 20;

const GET_ROBOT_POSITION_COMMAND = "0x0075";
const GET_ROBOT_TORQUE_COMMAND = "0x0077";

const data = {
  [GET_ROBOT_POSITION_COMMAND]: emptyData(),
  [GET_ROBOT_TORQUE_COMMAND]: emptyData(),
};

const rawData = {
  [GET_ROBOT_POSITION_COMMAND]: emptyData(),
  [GET_ROBOT_TORQUE_COMMAND]: emptyData(),
};

function emptyData() {
  const data = Array(MAX_X_LENGTH);
  data.fill({});
  return data;
}

const initialState =
  {
    data: data,
    rawData: rawData,
    thresholds: {
      [GET_ROBOT_POSITION_COMMAND]: { // ロボット位置データ読み出し
        Axes01: 0,
        Axes02: 0,
        Axes03: 0,
        Axes04: 0,
        Axes05: 0,
        Axes06: 0,
      },
      [GET_ROBOT_TORQUE_COMMAND]: { // トルクデータ読み出し
        Axes01: 0,
        Axes02: 0,
        Axes03: 0,
        Axes04: 0,
        Axes05: 0,
        Axes06: 0,
      }
    },
    error: null,
  };

function applyThreshold(data, key, threshold) {
  if (data.hasOwnProperty(key)) { // warningへの対処(payload[i]にkeyが存在することを保証する)
    if (threshold !== undefined && threshold !== null) {
      data[key] = data[key] > threshold ? 1 : 0;
    }
  }
  return data;
}

export function time_chart(state = initialState, action) {
  if (action.type === timeChartConstants.GET_STEP_DATA_REQUEST) {
    return {
      ...state,
    };
  } else if (action.type === timeChartConstants.GET_STEP_DATA_SUCCESS) {
    const data = {
      [GET_ROBOT_POSITION_COMMAND]: [],
      [GET_ROBOT_TORQUE_COMMAND]: [],
    };
    const rawData = {
      [GET_ROBOT_POSITION_COMMAND]: [],
      [GET_ROBOT_TORQUE_COMMAND]: [],
    };
    const thresholds = {...state.thresholds};
    const payload = {...action.payload}; // 01データ

    for (let command in payload) {
      if (payload.hasOwnProperty(command)) {
        for (let i = 0; i < Math.min(payload[command].length, MAX_X_LENGTH); i++) {
          rawData[command].push({...payload[command][i]}); // deep copyするためにここで追加

          for (let key in payload[command][i]) {
            if (payload[command][i].hasOwnProperty(key)) {
              payload[command][i] = applyThreshold(payload[command][i], key, thresholds[command][key]);
            }
          }
          if (data.hasOwnProperty(command)) {
            data[command].push(payload[command][i]);
          }
        }

        if (data.hasOwnProperty(command)) {
          data[command] = data[command].slice(0, MAX_X_LENGTH).reverse();
          rawData[command] = rawData[command].slice(0, MAX_X_LENGTH).reverse();
        }
      }
    }


    return {
      ...state,
      data,
      rawData
    };
  } else if (action.type === timeChartConstants.GET_STEP_DATA_FAILURE) {
    return {
      ...state,
      error: action.payload.error,
    }
  } else if (action.type === timeChartConstants.SET_THRESHOLD) {
    const data = {...state.data};
    const rawData = {...state.rawData};
    const thresholds = {...state.thresholds};

    const threshold = action.payload.threshold;
    const command = action.payload.command;
    const key = action.payload.key;

    thresholds[command][key] = parseFloat(threshold);
    for (let i = 0; i < data[command].length; i++) {
      if (data[command][i].hasOwnProperty(key)) {
        // 対象のキーのみ新閾値適用後の値に差し替える
        data[command][i][key] = applyThreshold(
          {...rawData[command][i]}, key, parseFloat(threshold))[key];
      }
    }

    return {
      ...state,
      data,
      thresholds,
    }
  } else {
    return {
      ...state
    }
  }
}
