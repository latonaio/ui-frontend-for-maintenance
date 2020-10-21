import {connect} from 'react-redux';
import Alarm from '../views/Alarm';
import {getData} from '../actions/alarm.actions';

const mapStateToProps = (state, _) => ({
  alarm: state.alarm
});

const mapDispatchToProps = dispatch => ({
  getData() {
    dispatch(getData());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Alarm);
