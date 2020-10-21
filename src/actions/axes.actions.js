import {axesConstants} from '../constants';
import {axesService} from "../services/axes.service";

export const getAxesName = () => {
  return dispatch => {
    dispatch(getAxesNameRequest());

    axesService.getAxesName()
      .then(
        data => {
          dispatch(getAxesNameSuccess(data));
        },
        error => {
          dispatch(getAxesNameFailure(error));
        }
      );
  };
};


const getAxesNameRequest = () => ({
  type: axesConstants.GET_AXES_NAME_REQUEST
});
const getAxesNameSuccess = data => ({
  type: axesConstants.GET_AXES_NAME_SUCCESS,
  payload: data
});
const getAxesNameFailure = error => ({
  type: axesConstants.GET_AXES_NAME_FAILURE,
  payload: error
});
