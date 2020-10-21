import {connect} from 'react-redux';
import {getOperationTime} from "../actions";
import OperationTime from "../views/OperationTime";


const mapStateToProps = (state, _) => ({
  operation_time: state.operation_time
});

const mapDispatchToProps = dispatch => ({
  getOperationTime() {
    dispatch(getOperationTime());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(OperationTime);
