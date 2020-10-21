import {responseHandler} from "../helpers";

const apiHost = process.env.REACT_APP_APIURL;

export const alarmDataService = {
  getAlarmData,
};

function getAlarmData() {
  const requestOptions = {
    method: 'GET',
  };

  return fetch(`${apiHost}data/get/alarm`, requestOptions).then(responseHandler);
}
