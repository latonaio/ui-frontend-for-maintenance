import {waveChartConstants} from '../constants';
import {chartDataService} from "../services/chart_data.service";

export const getData = () => {
  return dispatch => {
    dispatch(getWaveDataRequest());

    chartDataService.getWaveData()
      .then(
        data => {
          dispatch(getWaveDataSuccess(data));
        },
        error => {
          dispatch(getWaveDataFailure(error));
        }
      );
  };
};


const getWaveDataRequest = () => ({
  type: waveChartConstants.GET_WAVE_DATA_REQUEST
});
const getWaveDataSuccess = data => ({
  type: waveChartConstants.GET_WAVE_DATA_SUCCESS,
  payload: data
});
const getWaveDataFailure = error => ({
  type: waveChartConstants.GET_WAVE_DATA_FAILURE,
  payload: error
});
