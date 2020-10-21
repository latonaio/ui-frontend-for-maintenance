import {connect} from 'react-redux';
import WaveChart from '../views/WaveChart';
import {getData} from '../actions/wave_chart.actions';
import {getAxesName} from "../actions";

const mapStateToProps = (state, _) => ({
  wave_chart: state.wave_chart,
  axes: state.axes,
});

const mapDispatchToProps = dispatch => ({
  getData() {
    dispatch(getData());
  },
  getAxesName() {
    dispatch(getAxesName());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(WaveChart);
