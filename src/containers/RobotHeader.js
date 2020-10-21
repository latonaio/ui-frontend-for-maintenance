import {connect} from 'react-redux';
import {getRobotName} from "../actions";
import RobotHeader from "../components/RobotHeader";
import {startReadTrigger, stopReadTrigger} from "../actions/runtime.actions";
import {runtimeConstants} from "../constants";


const mapStateToProps = (state, _) => ({
  runtime: state.runtime,
  robot_header: state.robot_header,
});

const mapDispatchToProps = dispatch => ({
  getRobotName(robotID) {
    dispatch(getRobotName(robotID));
  },
  startReadTrigger(command) {
    dispatch(startReadTrigger(command));
  },
  stopReadTrigger(command) {
    dispatch(stopReadTrigger(command));
  },
  setCommand(command) {
    dispatch({type: runtimeConstants.SET_COMMAND, command})
  },
  unlockButton() {
    dispatch({type: runtimeConstants.UNLOCK_BUTTON})
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RobotHeader);
