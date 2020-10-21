import {responseHandler} from "../helpers";

const apiHost = process.env.REACT_APP_APIURL;

export const eventLogService = {
  getEvent,
};

function getEvent() {
  const requestOptions = {
    method: 'GET',
  };

  return fetch(`${apiHost}data/get/event`, requestOptions).then(responseHandler);
}
