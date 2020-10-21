import {responseHandler} from "../helpers";

const apiHost = process.env.REACT_APP_APIURL;

export const jobSchedulerService = {
  setJobSchedule,
  getJobSchedule,
  getMachineList
};

function setJobSchedule(data) {
  const requestOptions = {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      data
    }),
  };

  return fetch(`${apiHost}jobScheduler/setSchedule`, requestOptions)
    .then(responseHandler)
    .then((res) => {
      return res;
    });
}

function getJobSchedule(makerID) {
  const requestOptions = {
    method: "GET",
  };

  return fetch(`${apiHost}jobScheduler/getJob/${makerID}`, requestOptions)
    .then(responseHandler);
}

function getMachineList(jobID) {
  const requestOptions = {
    method: "GET",
  };

  return fetch(`${apiHost}jobScheduler/getMachine/${jobID}`, requestOptions)
    .then(responseHandler);
}