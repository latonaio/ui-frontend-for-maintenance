import {responseHandler} from "../helpers";

const apiHost = process.env.REACT_APP_APIURL;

export const runtimeService = {
  startReadTrigger,
  stopReadTrigger,
};

function startReadTrigger(command) {
  const requestOptions = {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      data: {command}
    }),
  };

  return fetch(`${apiHost}yaskawa/readTrigger/start`, requestOptions)
    .then(responseHandler)
    .then((res) => {
      return res;
    });
}

function stopReadTrigger(command) {
  const requestOptions = {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      data: {command}
    }),
  };

  return fetch(`${apiHost}yaskawa/readTrigger/stop`, requestOptions)
    .then(responseHandler)
    .then((res) => {
      return res;
    });
}
