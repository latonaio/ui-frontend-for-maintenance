import {connect} from 'react-redux';
import {getErrorValue} from "../actions";
import ErrorValue from "../views/ErrorValue";


const mapStateToProps = (state, _) => ({
  error_value: state.error_value,
});

const mapDispatchToProps = dispatch => ({
  getErrorValue() {
    dispatch(getErrorValue());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ErrorValue);
