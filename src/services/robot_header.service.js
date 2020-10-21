import {responseHandler} from "../helpers";

const apiHost = process.env.REACT_APP_APIURL;

export const robotHeaderService = {
  getRobotName,
};

function getRobotName(robotID) {
  const requestOptions = {
    method: 'GET',
  };

  return fetch(`${apiHost}data/get/robot_name/${robotID}`, requestOptions).then(responseHandler);
}
