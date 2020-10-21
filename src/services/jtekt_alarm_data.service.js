import {responseHandler} from "../helpers";

const apiHost = process.env.REACT_APP_APIURL;

export const jtektAlarmDataService = {
  getAlarmData,
};

function getAlarmData() {
  const requestOptions = {
    method: 'GET',
  };

  return fetch(`${apiHost}jtekt/get/alarm`, requestOptions).then(responseHandler);
}
