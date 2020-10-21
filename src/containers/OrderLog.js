import {connect} from 'react-redux';
import {getOrderLog} from "../actions";
import OrderLog from "../views/OrderLog";


const mapStateToProps = (state, _) => ({
  order_log: state.order_log,
});

const mapDispatchToProps = dispatch => ({
  getOrderLog() {
    dispatch(getOrderLog());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderLog);
