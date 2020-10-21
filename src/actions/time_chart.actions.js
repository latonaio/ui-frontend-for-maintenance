import {timeChartConstants} from '../constants';
import {chartDataService} from '../services/chart_data.service';

export const getData = () => {
  return dispatch => {
    dispatch(getDataRequest());

    chartDataService.getStepData()
      .then(
        data => {
          dispatch(getDataSuccess(data));
        },
        error => {
          dispatch(getDataFailure(error));
        }
      );
  };
};


const getDataRequest = () => ({
  type: timeChartConstants.GET_STEP_DATA_REQUEST
});
const getDataSuccess = data => ({
  type: timeChartConstants.GET_STEP_DATA_SUCCESS,
  payload: data
});
const getDataFailure = error => ({
  type: timeChartConstants.GET_STEP_DATA_FAILURE,
  payload: error
});
