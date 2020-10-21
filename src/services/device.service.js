import {responseHandler} from "../helpers";

const apiHost = process.env.REACT_APP_APIURL;

export const deviceService = {
  fetchDevices,
};

function fetchDevices() {
  const requestOptions = {
    method: 'GET',
  };

  return fetch(`${apiHost}device/fetch`, requestOptions).then(responseHandler);
}
