import {responseHandler} from "../helpers";

const apiHost = process.env.REACT_APP_APIURL;

export const axesService = {
  getAxesName,
};

function getAxesName() {
  const requestOptions = {
    method: 'GET',
  };

  return fetch(`${apiHost}data/get/axes`, requestOptions).then(responseHandler);
}
