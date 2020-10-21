import {connect} from 'react-redux';
import TimeChart from '../views/TimeChart';
import {getData} from '../actions/time_chart.actions';
import {getAxesName} from "../actions";
import {timeChartConstants} from '../constants';

const mapStateToProps = (state, _) => ({
  time_chart: state.time_chart,
  axes: state.axes,
});

const mapDispatchToProps = dispatch => ({
  getData() {
    dispatch(getData());
  },
  getAxesName() {
    dispatch(getAxesName());
  },
  setThreshold(threshold, command, key) {
    dispatch({
      type: timeChartConstants.SET_THRESHOLD,
      payload: {threshold, command, key},
    });
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TimeChart);
