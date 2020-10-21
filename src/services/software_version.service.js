import {responseHandler} from "../helpers";

const apiHost = process.env.REACT_APP_APIURL;

export const softWareVersionService = {
  getSoftVersion,
};

function getSoftVersion() {
  const requestOptions = {
    method: 'GET',
  };

  return fetch(`${apiHost}data/get/soft`, requestOptions).then(responseHandler);
}
