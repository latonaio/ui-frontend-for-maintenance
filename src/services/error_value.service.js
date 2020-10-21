import {responseHandler} from "../helpers";

const apiHost = process.env.REACT_APP_APIURL;

export const errorValueService = {
  getErrorValue,
};

function getErrorValue() {
  const requestOptions = {
    method: 'GET',
  };

  return fetch(`${apiHost}data/get/error_value`, requestOptions).then(responseHandler);
}
