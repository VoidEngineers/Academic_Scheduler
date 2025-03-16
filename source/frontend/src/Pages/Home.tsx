import React from "react";
import "../App.css";

const Home = () => {
  const categories = [
    "Business Operations",
    "Cloud Computing",
    "Cybersecurity",
    "Data Science",
    "Development",
    "IT Operations",
    "Language Learning",
    "Leadership & Management",
    "Marketing",
    "Generative AI",
    "Personal Development",
    "Productivity",
    "Project & Product Management",
  ];

  const inProgressCourses = [
    {
      id: 1,
      title: "Data Warehouse - The Ultimate Guide",
      currentLesson: "10. Demos & Hands-on",
      type: "Lecture",
      timeLeft: "2m left",
      thumbnail: "https://via.placeholder.com/300x200",
    },
    {
      id: 2,
      title: "Pentaho for ETL & Data Integration Masterclass",
      currentLesson: "35. Fuzzy Match Step in PDI",
      type: "Lecture",
      timeLeft: "11m",
      thumbnail: "https://via.placeholder.com/300x200",
    },
    {
      id: 3,
      title: "Zabbix 7 Application and Network Monitoring",
      currentLesson: "13. Enable PSK Encryption for Zabbix Agents",
      type: "Lecture",
      timeLeft: "15m",
      thumbnail: "https://via.placeholder.com/300x200",
    },
  ];

  return (
    <div className='home-container'>
      {/* Top Banner */}
      <div className='top-banner'>
        <p>
          Get recognized for your skills |{" "}
          <a href='#'>Import and share your certification badges.</a>
        </p>
        <button className='close-banner'>×</button>
      </div>

      {/* Navigation Bar */}
      <nav className='main-nav'>
        <div className='nav-left'>
          <img
            src='https://via.placeholder.com/100x40'
            alt='Logo'
            className='logo'
          />
          <button className='nav-button'>Explore</button>
          <button className='nav-button'>Learning paths</button>
        </div>
        <div className='nav-search'>
          <input type='text' placeholder='Search for anything' />
        </div>
        <div className='nav-right'>
          <button className='nav-button'>Teach</button>
          <button className='nav-button'>My learning</button>
          <div className='user-avatar'>VC</div>
        </div>
      </nav>

      {/* Categories Bar */}
      <div className='categories-bar'>
        {categories.map((category, index) => (
          <a key={index} href='#' className='category-link'>
            {category}
          </a>
        ))}
      </div>

      {/* Welcome Section */}
      <div className='welcome-section'>
        <div className='user-info'>
          <div className='user-avatar large'>VC</div>
          <div className='user-details'>
            <h1>Welcome back, Vikum</h1>
            <p>
              Back End Web Developer{" "}
              <a href='#'>Edit occupation and interests</a>
            </p>
          </div>
        </div>

        {/* Learning Streak */}
        <div className='learning-streak'>
          <h2>Start a new streak</h2>
          <p>Add some learning time to your calendar each week.</p>
          <div className='streak-stats'>
            <div className='streak-count'>
              <span className='number'>0</span>
              <span className='label'>weeks</span>
              <span className='subtitle'>Current streak</span>
            </div>
            <div className='streak-progress'>
              <div className='progress-circle'>
                <span className='progress-text'>0/30 course min</span>
                <span className='progress-text'>1/1 visit</span>
                <span className='progress-date'>Mar 9 - 15</span>
              </div>
            </div>
          </div>
          <a href='#' className='see-activity'>
            See all activity
          </a>
        </div>
      </div>

      {/* Continue Learning Section */}
      <section className='continue-learning'>
        <div className='section-header'>
          <h2>Pick up where you left off</h2>
          <a href='#' className='view-all'>
            My learning
          </a>
        </div>
        <div className='courses-grid'>
          {inProgressCourses.map((course) => (
            <div key={course.id} className='course-card'>
              <div className='course-thumbnail'>
                <img src={course.thumbnail} alt={course.title} />
                <button className='play-button'>▶</button>
              </div>
              <div className='course-info'>
                <h3>{course.title}</h3>
                <div className='lesson-info'>
                  <p className='current-lesson'>{course.currentLesson}</p>
                  <div className='lesson-meta'>
                    <span className='lesson-type'>{course.type}</span>
                    <span className='time-left'>{course.timeLeft}</span>
                  </div>
                </div>
                <div className='progress-bar'>
                  <div className='progress' style={{ width: "30%" }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certification Goals Section */}
      <section className='certification-goals'>
        <h2>What to learn next</h2>
        <div className='goals-header'>
          <h3>Work toward your certification goal</h3>
          <a href='#'>Edit certification interests</a>
        </div>
      </section>
    </div>
  );
};

export default Home;
