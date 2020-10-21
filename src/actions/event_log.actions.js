import {eventLogConstants} from '../constants';
import {eventLogService} from '../services/event_log.service';

export const getEvent = () => {
  return dispatch => {
    dispatch(getEventRequest());

    eventLogService.getEvent()
      .then(
        data => {
          dispatch(getEventSuccess(data));
        },
        error => {
          dispatch(getEventFailure(error));
        }
      );
  };
};


const getEventRequest = () => ({
  type: eventLogConstants.GET_EVENT_REQUEST
});
const getEventSuccess = data => ({
  type: eventLogConstants.GET_EVENT_SUCCESS,
  payload: data
});
const getEventFailure = error => ({
  type: eventLogConstants.GET_EVENT_FAILURE,
  payload: error
});
