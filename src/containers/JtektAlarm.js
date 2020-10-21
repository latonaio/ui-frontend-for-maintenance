import {connect} from 'react-redux';
import JtektAlarm from '../views/JtektAlarm';
import {getData} from '../actions/jtekt_alarm.actions';

const mapStateToProps = (state, _) => ({
  jtekt_alarm: state.jtekt_alarm
});

const mapDispatchToProps = dispatch => ({
  getData() {
    dispatch(getData());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(JtektAlarm);
