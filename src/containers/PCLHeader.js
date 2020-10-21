import {connect} from 'react-redux';
import {getRobotName} from "../actions";
import PLCHeader from "../components/PLCHeader";


const mapStateToProps = (state, _) => ({
  robot_header: state.robot_header,
});

const mapDispatchToProps = dispatch => ({
  getRobotName(robotID) {
    dispatch(getRobotName(robotID));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(PLCHeader);
