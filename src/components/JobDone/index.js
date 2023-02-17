import { useState, useEffect } from "react";

function JobDone() {
  const [jobsDone, setJobsDone] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/jobsDone")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setJobsDone(data);
      });
  }, []);

  return (
    <div>
      <ul>
        {jobsDone.map((job) => (
          <li key={job.id}>{job.jobName}</li>
        ))}
      </ul>
    </div>
  );
}

export default JobDone;
