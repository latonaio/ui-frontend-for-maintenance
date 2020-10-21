import {connect} from 'react-redux';
import {getOffset} from "../actions";
import OffsetResult from "../views/OffsetResult";


const mapStateToProps = (state, _) => ({
  offset_result: state.offset_result
});

const mapDispatchToProps = dispatch => ({
  getOffset() {
    dispatch(getOffset());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(OffsetResult);
