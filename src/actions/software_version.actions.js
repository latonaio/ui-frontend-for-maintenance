import {softwareVersionConstants} from '../constants';
import {softWareVersionService} from '../services/software_version.service';

export const getSoftVersion = () => {
  return dispatch => {
    dispatch(getSoftVersionRequest());

    softWareVersionService.getSoftVersion()
      .then(
        data => {
          dispatch(getSoftVersionSuccess(data));
        },
        error => {
          dispatch(getSoftVersionFailure(error));
        }
      );
  };
};


const getSoftVersionRequest = () => ({
  type: softwareVersionConstants.GET_SOFT_VERSION_REQUEST
});
const getSoftVersionSuccess = data => ({
  type: softwareVersionConstants.GET_SOFT_VERSION_SUCCESS,
  payload: data
});
const getSoftVersionFailure = error => ({
  type: softwareVersionConstants.GET_SOFT_VERSION_FAILURE,
  payload: error
});
