import {responseHandler} from "../helpers";

const apiHost = process.env.REACT_APP_APIURL;

export const orderLogService = {
  getOrderLog,
};

function getOrderLog() {
  const requestOptions = {
    method: 'GET',
  };

  return fetch(`${apiHost}data/get/order_log`, requestOptions).then(responseHandler);
}
