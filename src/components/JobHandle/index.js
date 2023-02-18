import { useReducer, useRef, useEffect } from "react";
import reducer from "./reducer";
import { initState } from "./reducer";
import { addJob, setJob, setJobs, setJobsDone } from "./actions";

function JobHandle() {
  const [state, dispatch] = useReducer(reducer, initState);
  const { job, jobs, jobsDone } = state;
  const inputRef = useRef(null);
  useEffect(() => {
    fetch("http://localhost:3000/jobs")
      .then((res) => res.json())
      .then((jobs) => {
        dispatch(setJobs(jobs));
      });
  }, [jobsDone]);

  const handleSubmit = (job) => {
    const jobData = {
      jobName: job,
    };

    if (job === "") {
      inputRef.current.focus();
      return;
    }

    fetch("http://localhost:3000/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jobData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((job) => {
        dispatch(addJob(job));
        dispatch(setJob(""));
        inputRef.current.focus();
      })
      .catch((error) => {
        console.error("Error adding job:", error);
        // Handle error state here
      });
  };

  const handleDelete = (id, jobName) => {
    fetch(`http://localhost:3000/jobs/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .catch((error) => {
        console.error("Error deleting job:", error);
        // Handle error state here
      });

    // post jobsdone
    const jobData = {
      jobName: jobName,
    };

    fetch("http://localhost:3000/jobsDone", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jobData),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((job) => {
        dispatch(setJobsDone(job));
      })
      .catch((error) => {
        console.error("Error adding job:", error);
        // Handle error state here
      });
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
      <button onClick={() => handleSubmit(job)}>Add</button>
      <ul>
        {jobs.map((job, index) => (
          <li key={index}>
            {job.jobName}
            <span onClick={() => handleDelete(job.id, job.jobName)}>
              &times;
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default JobHandle;
