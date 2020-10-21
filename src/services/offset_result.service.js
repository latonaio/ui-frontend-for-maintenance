import {responseHandler} from "../helpers";

const apiHost = process.env.REACT_APP_APIURL;

export const offsetResultService = {
  getOffset,
};

function getOffset() {
  const requestOptions = {
    method: 'GET',
  };

  return fetch(`${apiHost}data/get/offset`, requestOptions).then(responseHandler);
}
