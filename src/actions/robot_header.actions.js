import {robotHeaderConstants} from '../constants';
import {robotHeaderService} from '../services/robot_header.service';

export const getRobotName = (robotID) => {
  return dispatch => {
    dispatch(getRobotNameRequest());

    robotHeaderService.getRobotName(robotID)
      .then(
        data => {
          dispatch(getRobotNameSuccess(data));
        },
        error => {
          dispatch(getRobotNameFailure(error));
        }
      );
  };
};


const getRobotNameRequest = () => ({
  type: robotHeaderConstants.GET_ROBOT_NAME_REQUEST
});
const getRobotNameSuccess = data => ({
  type: robotHeaderConstants.GET_ROBOT_NAME_SUCCESS,
  payload: data
});
const getRobotNameFailure = error => ({
  type: robotHeaderConstants.GET_ROBOT_NAME_FAILURE,
  payload: error
});
