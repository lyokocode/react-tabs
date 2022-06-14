import React, { useState, useEffect } from 'react';
import './index.css';
import { FaAngleDoubleRight } from "react-icons/fa"
const url = "http://localhost:3000/users"

function App() {

  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([])
  const [value, setValue] = useState(0)

  const fetchJobs = async () => {
    const response = await fetch(url);
    const newJobs = await response.json();
    setJobs(newJobs);
    setLoading(false)
  }

  useEffect(() => {
    fetchJobs()
  }, [])


  if (loading) {
    return <section className='sectionLoading'>
      <h1> loading</h1>
    </section>
  }

  const { company, dates, duties, title } = jobs[value]
  return (
    <section className='section'>
      <div className='title'>
        <h1>Experience</h1>
        <div className='underline'></div>
      </div>
      <div className='jobsCenter'>
        {/* btn container */}
        <div className='buttonContainer'>
          {jobs.map((item, index) => {
            return <button key={item.id} onClick={() => setValue(index)} className={`jobButton ${index === value && `activeButton`}`}>{item.company}</button>
          })}
        </div>
        {/* job info */}
        <article className='jobInfo'>
          <h3>{title}</h3>
          <h4>{company}</h4>
          <p className='jobDates'>{dates}</p>
          {duties.map((duty, index) => {
            return <div key={index} className="jobDesc">
              <FaAngleDoubleRight className="jobIcon" />
              <p>{duty}</p>
            </div>

          })}

        </article>
      </div>
    </section>
  );
}

export default App;
