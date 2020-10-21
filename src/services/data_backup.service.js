import {responseHandler} from "../helpers";

const apiHost = process.env.REACT_APP_APIURL;

export const dataBackupService = {
  getBackupList,
};

function getBackupList(makerID) {
  const requestOptions = {
    method: 'GET',
  };

  return fetch(`${apiHost}data/get/backup/${makerID}`, requestOptions).then(responseHandler);
}
