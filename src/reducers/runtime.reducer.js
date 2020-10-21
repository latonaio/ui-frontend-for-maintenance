import {runtimeConstants} from '../constants';

const initialState =
  {
    command: "0x0000",
    isReading: false,
    error: null,
    isLocked: false,
  };

export function runtime(state = initialState, action) {
  if (action.type === runtimeConstants.START_READ_TRIGGER_REQUEST) {
    return {
      ...state,
      isReading: true,
    };
  } else if (action.type === runtimeConstants.START_READ_TRIGGER_SUCCESS) {
    return {
      ...state,
      isReading: true,
    };
  } else if (action.type === runtimeConstants.START_READ_TRIGGER_FAILURE) {
    return {
      ...state,
      error: action.error,
      isReading: false,
    }
  } else if (action.type === runtimeConstants.STOP_READ_TRIGGER_REQUEST) {
    return {
      ...state,
      isReading: false,
    };
  } else if (action.type === runtimeConstants.STOP_READ_TRIGGER_SUCCESS) {
    return {
      ...state,
      isReading: false,
    };
  } else if (action.type === runtimeConstants.STOP_READ_TRIGGER_FAILURE) {
    return {
      ...state,
      error: action.error,
      isReading: true,
    }
  } else if (action.type === runtimeConstants.SET_COMMAND) {
    return {
      ...state,
      command: action.command,
    }
  } else if (action.type === runtimeConstants.LOCK_BUTTON) {
    return {
      ...state,
      isLocked: true,
    }
  } else if (action.type === runtimeConstants.UNLOCK_BUTTON) {
    return {
      ...state,
      isLocked: false,
    }
  } else {
    return {
      ...state
    }
  }
}
