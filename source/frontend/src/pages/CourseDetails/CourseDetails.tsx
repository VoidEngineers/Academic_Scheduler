import React from 'react';
import './CourseDetails.css';

interface Course {
  courseId: string;
  courseName: string;
  courseCode: string;
  category: string;
  courseDescription: string;
  lic: string;
  videoUrl?: string;  // Optional video URL
}

type CourseDetailsProps = {
  course?: Course;
}

const CourseDetails: React.FC<CourseDetailsProps> = ({ course }) => {
  // Dummy course data for preview
  const dummyCourse: Course = {
    courseId: "C001",
    courseName: "The Complete AI Guide: Learn ChatGPT, Generative AI & More",
    courseCode: "CS401",
    category: "Computer Science",
    courseDescription: "50+ Generative AI Tools to 10x Business, Productivity, Creativity | ChatGPT, Artificial Intelligence, Prompt Engineering. Learn how to leverage cutting-edge AI tools for content creation, automation, and business optimization.",
    lic: "Dr. Sarah Johnson",
    videoUrl: "https://youtu.be/rwF-X5STYks?si=mGHrT4wF1rWbJ71f"  // Example video URL
  };

  // Use dummy data if no course is provided
  const displayCourse = course || dummyCourse;

  const getYouTubeEmbedUrl = (url: string) => {
    const videoId = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([^&?/]+)/)?.[1];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : '';
  };

  return (
    <div className="course-details-container">
      <div className="course-header">
        <div className="course-title-section">
          <h1>{displayCourse.courseName}</h1>
          <div className="course-meta">
            <span className="course-code">{displayCourse.courseCode}</span>
            <span className="course-category">{displayCourse.category}</span>
          </div>
        </div>
        <div className="instructor-info">
          <h3>Instructor</h3>
          <p>{displayCourse.lic}</p>
        </div>
      </div>

      <div className="course-content">
        <div className="main-content">
          {displayCourse.videoUrl && (
            <section className="course-video">
              <h2>Course Preview</h2>
              <div className="video-container">
                <iframe
                  width="100%"
                  height="400"
                  src={getYouTubeEmbedUrl(displayCourse.videoUrl)}
                  title="Course Preview"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </section>
          )}

          <section className="course-description">
            <h2>Course Description</h2>
            <p>{displayCourse.courseDescription}</p>
          </section>

          <section className="what-youll-learn">
            <h2>What You'll Learn</h2>
            <ul>
              <li>Understand and apply generative AI concepts</li>
              <li>Create content using AI tools</li>
              <li>Implement AI solutions in business contexts</li>
              <li>Master prompt engineering techniques</li>
            </ul>
          </section>

          <section className="course-features">
            <h2>Course Features</h2>
            <div className="features-grid">
              <div className="feature-item">
                <span className="feature-icon">📚</span>
                <span className="feature-text">Comprehensive Materials</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🎯</span>
                <span className="feature-text">Hands-on Projects</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">🏆</span>
                <span className="feature-text">Certificate</span>
              </div>
              <div className="feature-item">
                <span className="feature-icon">💬</span>
                <span className="feature-text">24/7 Support</span>
              </div>
            </div>
          </section>
        </div>

        <aside className="course-sidebar">
          <div className="course-card">
            <div className="course-actions">
              <button className="enroll-button">Enroll Now</button>
              <div className="course-stats">
                <div className="stat-item">
                  <span className="stat-label">Duration</span>
                  <span className="stat-value">8 weeks</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Level</span>
                  <span className="stat-value">Intermediate</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Students</span>
                  <span className="stat-value">1,234</span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default CourseDetails; 