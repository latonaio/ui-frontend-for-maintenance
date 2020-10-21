import {connect} from 'react-redux';
import {getBackupDataList} from "../actions";
import DataBackup from "../views/DataBackup";


const mapStateToProps = (state, _) => ({
  data_backup: state.data_backup
});

const mapDispatchToProps = dispatch => ({
  getBackupDataList(data) {
    dispatch(getBackupDataList(data));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(DataBackup);
