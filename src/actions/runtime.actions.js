import {runtimeConstants} from '../constants';
import {runtimeService} from "../services/runtime.service";

const LOCK_TIME = 3000;

export const startReadTrigger = (command) => {
  return dispatch => {
    dispatch(startReadTriggerRequest());

    dispatch(lockButton());
    setTimeout(() => dispatch(unlockButton()), LOCK_TIME);

    runtimeService.startReadTrigger(command)
      .then(
        () => {
          dispatch(startReadTriggerSuccess());
        },
        error => {
          dispatch(startReadTriggerFailure(error));
        }
      );
  };
};


const startReadTriggerRequest = () => ({
  type: runtimeConstants.START_READ_TRIGGER_REQUEST,
});
const startReadTriggerSuccess = () => ({
  type: runtimeConstants.START_READ_TRIGGER_SUCCESS,
});
const startReadTriggerFailure = error => ({
  type: runtimeConstants.START_READ_TRIGGER_FAILURE,
  error,
});

export const stopReadTrigger = (command) => {
  return dispatch => {
    dispatch(stopReadTriggerRequest());

    dispatch(lockButton());
    setTimeout(() => dispatch(unlockButton()), LOCK_TIME);

    runtimeService.stopReadTrigger(command)
      .then(
        () => {
          dispatch(stopReadTriggerSuccess());
        },
        error => {
          dispatch(stopReadTriggerFailure(error));
        }
      );
  };
};

const stopReadTriggerRequest = () => ({
  type: runtimeConstants.STOP_READ_TRIGGER_REQUEST,
});
const stopReadTriggerSuccess = () => ({
  type: runtimeConstants.STOP_READ_TRIGGER_SUCCESS,
});
const stopReadTriggerFailure = error => ({
  type: runtimeConstants.STOP_READ_TRIGGER_FAILURE,
  error,
});

const lockButton = () => ({
  type: runtimeConstants.LOCK_BUTTON,
});

const unlockButton = () => ({
  type: runtimeConstants.UNLOCK_BUTTON,
});
