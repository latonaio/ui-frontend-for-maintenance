import {connect} from 'react-redux';
import {getEvent} from "../actions";
import EventLog from "../views/EventLog";


const mapStateToProps = (state, _) => ({
  event_log: state.event_log,
});

const mapDispatchToProps = dispatch => ({
  getEvent() {
    dispatch(getEvent());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(EventLog);
