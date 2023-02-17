// actions

export const SET_JOB = "set_job";
export const ADD_JOB = "add_job";
export const DELETE_JOB = "delete_job";
export const SET_JOBS = "set_jobs";
export const SET_JOBS_DONE = "set_jobs_done";

export const setJob = (payload) => {
  return {
    type: SET_JOB,
    payload,
  };
};

export const addJob = (payload) => {
  return {
    type: ADD_JOB,
    payload,
  };
};

export const deleteJob = (payload) => {
  return {
    type: DELETE_JOB,
    payload,
  };
};

export const setJobs = (payload) => {
  return {
    type: SET_JOBS,
    payload,
  };
};

export const setJobsDone = (payload) => {
  return {
    type: SET_JOBS_DONE,
    payload,
  };
};
