import {jtektAlarmConstants} from '../constants';
import {jtektAlarmDataService} from '../services/jtekt_alarm_data.service';

export const getData = () => {
  return dispatch => {
    dispatch(getDataRequest());

    jtektAlarmDataService.getAlarmData()
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
  type: jtektAlarmConstants.GET_JTEKT_ALARM_DATA_REQUEST
});
const getDataSuccess = data => ({
  type: jtektAlarmConstants.GET_JTEKT_ALARM_DATA_SUCCESS,
  payload: data
});
const getDataFailure = error => ({
  type: jtektAlarmConstants.GET_JTEKT_ALARM_DATA_FAILURE,
  payload: error
});
