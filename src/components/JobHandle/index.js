import { useReducer, useRef, useEffect } from "react";
import reducer from "./reducer";
import { initState } from "./reducer";
import { addJob, setJob, deleteJob, setJobs } from "./actions";

function JobHandle() {
  useEffect(() => {
    fetch("http://localhost:3000/jobs")
      .then((res) => res.json())
      .then((jobs) => {
        // dispatch an action to update the state with the jobs data
        dispatch(setJobs(jobs));
      });
  }, []);

  const [state, dispatch] = useReducer(reducer, initState);

  const { job, jobs } = state;
  const inputRef = useRef(null);

  const handleSubmit = () => {
    dispatch(addJob(job));
    if (job === "") {
      return;
    }
    dispatch(setJob(""));
    inputRef.current.focus();
  };

  const handleDelete = (index) => {
    dispatch(deleteJob(index));
  };

  return (
    <div>
      <input
        ref={inputRef}
        value={job}
        onChange={(e) => {
          dispatch(setJob(e.target.value));
        }}
      />
      <button onClick={handleSubmit}>Add</button>
      <ul>
        {jobs.map((job, index) => (
          <li key={index}>
            {job}
            <span onClick={() => handleDelete(index)}>&times;</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default JobHandle;
