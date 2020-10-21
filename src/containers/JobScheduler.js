import {connect} from 'react-redux';
import JobScheduler from '../views/JobScheduler';
import {getJobSchedule, getMachineData, setJobSchedule} from "../actions";
import {jobSchedulerConstants} from "../constants";

const mapStateToProps = (state, _) => ({
  job_scheduler: state.job_scheduler
});

const mapDispatchToProps = dispatch => ({
  setJobSchedule(data, makerID) {
    dispatch(setJobSchedule(data, makerID));
  }, getJobSchedule(data) {
    dispatch(getJobSchedule(data));
  }, getMachineData(data) {
    dispatch(getMachineData(data));
  }, initJobScheduler() {
    dispatch({type: jobSchedulerConstants.INIT_JOB_SCHEDULER});
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(JobScheduler);