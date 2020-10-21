import {dataBackupConstants} from '../constants';
import {dataBackupService} from '../services/data_backup.service';

export const getBackupDataList = (makerID) => {
  return dispatch => {
    dispatch(getBackupDataListListRequest());

    dataBackupService.getBackupList(makerID)
      .then(
        data => {
          dispatch(getBackupDataListListSuccess(data));
        },
        error => {
          dispatch(getBackupDataListListFailure(error));
        }
      );
  };
};


const getBackupDataListListRequest = () => ({
  type: dataBackupConstants.GET_BACKUP_DATA_LIST_REQUEST
});
const getBackupDataListListSuccess = data => ({
  type: dataBackupConstants.GET_BACKUP_DATA_LIST_SUCCESS,
  payload: data
});
const getBackupDataListListFailure = error => ({
  type: dataBackupConstants.GET_BACKUP_DATA_LIST_FAILURE,
  payload: error
});
