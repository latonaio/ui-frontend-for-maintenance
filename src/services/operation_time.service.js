import {responseHandler} from "../helpers";

const apiHost = process.env.REACT_APP_APIURL;

export const operationTimeService = {
  getOperationTime,
};

function getOperationTime() {
  const requestOptions = {
    method: 'GET',
  };

  return fetch(`${apiHost}data/get/operation`, requestOptions).then(responseHandler);
}
