import { useState, useEffect, useReducer } from "react";
import reducer from "../JobHandle/reducer";
import { initState } from "../JobHandle/reducer";
import { setJobsDone } from "../JobHandle/actions";

function JobDone() {
  const [state, dispatch] = useReducer(reducer, initState);
  const { jobs, jobsDone } = state;

  // const [jobsDone, setJobsDone] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/jobsDone")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        dispatch(setJobsDone(data.reverse()));
      });
  }, [jobs]);

  const handleClear = () => {
    fetch("http://localhost:3000/jobsDone", {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log("All elements deleted successfully");
        } else {
          throw new Error("Failed to delete all elements");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <ul>
        {jobsDone.map((job) => (
          <li key={job.id}>{job.jobName}</li>
        ))}
      </ul>
      <button onClick={handleClear}>Clear</button>
    </div>
  );
}

export default JobDone;
