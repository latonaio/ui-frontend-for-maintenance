import {responseHandler} from "../helpers";

const apiHost = process.env.REACT_APP_APIURL;

export const chartDataService = {
  getWaveData,
  getStepData,
};

function getWaveData() {
  const requestOptions = {
    method: 'GET',
  };

  return fetch(`${apiHost}data/get/chart`, requestOptions).then(responseHandler);
}

function getStepData() {
  const requestOptions = {
    method: 'GET',
  };

  return fetch(`${apiHost}data/get/chart`, requestOptions).then(responseHandler);
}
