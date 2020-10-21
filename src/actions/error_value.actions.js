import {errorValueConstants} from '../constants';
import {errorValueService} from '../services/error_value.service';

export const getErrorValue = () => {
  return dispatch => {
    dispatch(getErrorValueRequest());

    errorValueService.getErrorValue()
      .then(
        data => {
          dispatch(getErrorValueSuccess(data));
        },
        error => {
          dispatch(getErrorValueFailure(error));
        }
      );
  };
};


const getErrorValueRequest = () => ({
  type: errorValueConstants.GET_ERROR_VALUE_REQUEST
});
const getErrorValueSuccess = data => ({
  type: errorValueConstants.GET_ERROR_VALUE_SUCCESS,
  payload: data
});
const getErrorValueFailure = error => ({
  type: errorValueConstants.GET_ERROR_VALUE_FAILURE,
  payload: error
});
