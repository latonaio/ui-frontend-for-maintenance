import {deviceConstants} from '../constants';
import {deviceService} from '../services/device.service';

export const fetchDevices = () => {
  return dispatch => {
    dispatch(fetchDevicesRequest());

    deviceService.fetchDevices()
      .then(
        data => {
          dispatch(fetchDevicesSuccess(data));
        },
        error => {
          dispatch(fetchDevicesFailure(error));
        }
      );
  };
};


const fetchDevicesRequest = () => ({
  type: deviceConstants.FETCH_DEVICES_REQUEST
});
const fetchDevicesSuccess = data => ({
  type: deviceConstants.FETCH_DEVICES_SUCCESS,
  payload: data
});
const fetchDevicesFailure = error => ({
  type: deviceConstants.FETCH_DEVICES_FAILURE,
  payload: error
});
