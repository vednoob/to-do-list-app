import { useState, useRef } from "react";

function JobHandle() {
  const [job, setJob] = useState("");
  const [jobs, setJobs] = useState(
    (function () {
      const storageJobs = JSON.parse(localStorage.getItem("jobs"));
      return storageJobs;
    })() ?? []
  );

  const inputRef = useRef(null);

  const handleSubmit = () => {
    if (job === "") {
      return;
    }
    setJobs((prev) => {
      const newJobs = [...prev, job];

      const jsonJobs = JSON.stringify(newJobs);
      localStorage.setItem("jobs", jsonJobs);

      return newJobs;
    });
    setJob("");
    inputRef.current.focus();
  };

  const handleDelete = (index) => {
    const jsonJobs = JSON.parse(localStorage.getItem("jobs"));

    const newJobs = [...jsonJobs.slice(0, index), ...jsonJobs.slice(index + 1)];
    localStorage.setItem("jobs", JSON.stringify(newJobs));
    setJobs(newJobs);
  };

  return (
    <div>
      <input
        ref={inputRef}
        value={job}
        onChange={(e) => setJob(e.target.value)}
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
