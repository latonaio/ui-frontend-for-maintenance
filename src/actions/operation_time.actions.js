import {operationTimeConstants} from '../constants';
import {operationTimeService} from '../services/operation_time.service';

export const getOperationTime = () => {
  return dispatch => {
    dispatch(getOperationTimeRequest());

    operationTimeService.getOperationTime()
      .then(
        data => {
          dispatch(getOperationTimeSuccess(data));
        },
        error => {
          dispatch(getOperationTimeFailure(error));
        }
      );
  };
};


const getOperationTimeRequest = () => ({
  type: operationTimeConstants.GET_OPERATION_TIME_REQUEST
});
const getOperationTimeSuccess = data => ({
  type: operationTimeConstants.GET_OPERATION_TIME_SUCCESS,
  payload: data
});
const getOperationTimeFailure = error => ({
  type: operationTimeConstants.GET_OPERATION_TIME_FAILURE,
  payload: error
});
