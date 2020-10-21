import {jobSchedulerConstants} from "../constants";
import {jobSchedulerService} from "../services/job_scheduler";

export const setJobSchedule = (data, makerID) => {
  return (dispatch) => {
    jobSchedulerService.setJobSchedule(data).then(
      data => {
        dispatch(setJobScheduleSuccess(data));
        jobSchedulerService.getJobSchedule(makerID)
          .then(data => dispatch(getJobScheduleRequest(data)))
          .catch(error => dispatch(jobSchedulerFailure(error)))
      },
      (error) => {
        dispatch(jobSchedulerFailure(error));
      }
    )
  };
};

export const getJobSchedule = (data) => {
  return (dispatch) => {
    jobSchedulerService.getJobSchedule(data).then(
      data => {
        dispatch(getJobScheduleRequest(data));
      },
      error => {
        dispatch(jobSchedulerFailure(error));
      }
    );
  };
};

export const getMachineData = (data) => {
  return (dispatch) => {
    jobSchedulerService.getMachineList(data).then(
      data => {
        dispatch(getMachineListSuccess(data));
      }, error => {
        dispatch(getMachineListSuccess(error))
      }
    );
    ;
  };
};

export const initJobScheduler = () => {
  console.log('action');
  return (dispatch) => {
    dispatch(initJobSchedule());
  };
}

const getJobScheduleRequest = data => ({
  type: jobSchedulerConstants.GET_JOB_SCHEDULE_REQUEST, payload: data
});

const setJobScheduleSuccess = data => ({
  type: jobSchedulerConstants.SET_JOB_SCHEDULE_SUCCESS, payload: data
});

const getMachineListSuccess = data => ({
  type: jobSchedulerConstants.GET_MACHINE_LIST_SUCCESS, payload: data
});

const jobSchedulerFailure = data => ({
  type: jobSchedulerConstants.GET_JOB_SCHEDULER_ERROR, error: data
});

const initJobSchedule = () => ({
  type: jobSchedulerConstants.INIT_JOB_SCHEDULER
});