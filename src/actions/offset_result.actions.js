import {offsetResultConstants} from '../constants';
import {offsetResultService} from '../services/offset_result.service';

export const getOffset = () => {
  return dispatch => {
    dispatch(getOffsetRequest());

    offsetResultService.getOffset()
      .then(
        data => {
          dispatch(getOffsetSuccess(data));
        },
        error => {
          dispatch(getOffsetFailure(error));
        }
      );
  };
};


const getOffsetRequest = () => ({
  type: offsetResultConstants.GET_OFFSET_REQUEST
});
const getOffsetSuccess = data => ({
  type: offsetResultConstants.GET_OFFSET_SUCCESS,
  payload: data
});
const getOffsetFailure = error => ({
  type: offsetResultConstants.GET_OFFSET_FAILURE,
  payload: error
});
