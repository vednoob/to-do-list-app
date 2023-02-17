import { SET_JOB, ADD_JOB, DELETE_JOB, SET_JOBS } from "./actions";

export const initState = {
  job: "",
  jobs: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case SET_JOB:
      return {
        ...state,
        job: action.payload,
      };
    case ADD_JOB:
      return {
        ...state,
        jobs: [...state.jobs, action.payload],
      };
    case DELETE_JOB:
      const newJobs = [...state.jobs];
      newJobs.splice(action.payload, 1);
      return {
        ...state,
        jobs: newJobs,
      };
    case SET_JOBS:
      return {
        ...state,
        jobs: action.payload,
      };
    default:
      throw new Error("Invalid action");
  }
};

export default reducer;
