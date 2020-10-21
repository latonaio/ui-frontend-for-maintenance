import {alarmConstants} from '../constants';
import {alarmDataService} from '../services/alarm_data.service';

export const getData = () => {
  return dispatch => {
    dispatch(getDataRequest());

    alarmDataService.getAlarmData()
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
  type: alarmConstants.GET_ALARM_DATA_REQUEST
});
const getDataSuccess = data => ({
  type: alarmConstants.GET_ALARM_DATA_SUCCESS,
  payload: data
});
const getDataFailure = error => ({
  type: alarmConstants.GET_ALARM_DATA_FAILURE,
  payload: error
});
