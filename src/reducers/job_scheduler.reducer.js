import {jobSchedulerConstants} from "../constants";

const initialState = {
  data: {
    jobData: [
      {
        jobName: "",
        repeatDate: "",
        repeatType: "",
        lastState: 0,
        schedule: [{
          endDate: "",
          repeatDate: 0,
          repeatHour: 0,
          repeatMinute: 0,
          repeatType: 0,
          repeatWeekDay: "",
          scheduleID: 0,
          startDate: ""
        }]
      },
    ],
    machineList: []
  },
  error: null,
  result: false,
};

export function job_scheduler(state = initialState, action) {
  if (action.type === jobSchedulerConstants.GET_JOB_SCHEDULE_REQUEST) {
    return {
      ...state,
      jobData: action.payload,
    }
  } else if (action.type === jobSchedulerConstants.GET_MACHINE_LIST_SUCCESS) {
    return {
      ...state,
      machineList: action.payload
    };
  } else if (action.type === jobSchedulerConstants.GET_JOB_SCHEDULER_ERROR) {
    return {
      ...state,
      error: action.error
    }
  } else if (action.type === jobSchedulerConstants.SET_JOB_SCHEDULE_SUCCESS) {
    return {
      ...state,
      result: !state.result
    }
  } else if (action.type === jobSchedulerConstants.INIT_JOB_SCHEDULER) {
    return initialState;
  } else {
    return {
      ...state,
    };
  }
}
