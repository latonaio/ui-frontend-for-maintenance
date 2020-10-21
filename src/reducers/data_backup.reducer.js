import {dataBackupConstants} from '../constants';

const initialState =
  {
    data: [],
    error: null,
  };

export function data_backup(state = initialState, action) {
  if (action.type === dataBackupConstants.GET_BACKUP_DATA_LIST_REQUEST) {
    return {
      ...state,
    };
  } else if (action.type === dataBackupConstants.GET_BACKUP_DATA_LIST_SUCCESS) {
    return {
      ...state,
      data: action.payload,
    };
  } else if (action.type === dataBackupConstants.GET_BACKUP_DATA_LIST_FAILURE) {
    return {
      ...state,
      error: action.payload.error,
    }
  } else {
    return {
      ...state
    }
  }
}
