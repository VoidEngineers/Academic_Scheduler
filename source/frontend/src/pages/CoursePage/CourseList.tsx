import React, { useState, useEffect } from 'react';
import '../CourseList/CourseList.css';
import UpdateCourseForm from '../CourseUpdate/UpdateCourseForm';
import { useNavigate } from 'react-router-dom';

interface Course {
  courseId: string;
  courseName: string;
  courseCode: string;
  category: string;
  courseDescription: string;
  lic: string;
  videoUrl: string; // Added to Course interface
}

const CourseList: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [showUpdateForm, setShowUpdateForm] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch('http://localhost:8082/api/courses', {
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to fetch courses');
      }
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const handleEdit = (course: Course) => {
    setSelectedCourse(course);
    setShowUpdateForm(true);
  };

  const handleCloseUpdateForm = () => {
    setShowUpdateForm(false);
    setSelectedCourse(null);
  };

  // Function to extract YouTube video ID and create thumbnail URL
const getVideoThumbnail = (url: string) => {
    console.log('URL:', url); // Debugging the video URL input
  
    const youtubeRegex =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+|(?:v|e(?:mbed)?)\/([^\/\n\s]+)))|(?:youtu\.be\/([^\/\n\s]+))/;
  
    const match = url.match(youtubeRegex);
    if (match) {
      const videoId = match[1] || match[2];
      console.log('Extracted Video ID:', videoId); // Debugging the extracted video ID
      return `https://img.youtube.com/vi/${videoId}/0.jpg`; // YouTube thumbnail URL
    }
    
    console.error('Invalid YouTube URL format:', url); // Log invalid URL format
    return ''; // Return empty if not a YouTube link
  };
  

  return (
    <div className="course-list-container">
      <div className="course-list-header">
        <h2>Discover Courses!</h2>
      </div>

      {showUpdateForm && (
        <div className="modal-overlay">
          <UpdateCourseForm
            course={selectedCourse}
            onClose={handleCloseUpdateForm}
          />
        </div>
      )}

      <div className="course-list">
        {courses.map((course) => (
          <div key={course.courseId} className="course-card">
            <div className="course-header">
              <h3 className="course-name">{course.courseName}</h3>
              <span className="course-code">{course.courseCode}</span>
            </div>
            <div className="course-details">
              <p>
                <strong>Category:</strong> {course.category}
              </p>
              <p>
                <strong>Description:</strong> {course.courseDescription}
              </p>
              <p>
                <strong>LIC:</strong> {course.lic}
              </p>
          
            </div>

            {/* Displaying the video thumbnail if videoUrl exists */}
            {course.videoUrl && (
              <div className="course-video-thumbnail">
                <img
                  src={getVideoThumbnail(course.videoUrl)}
                  alt="Video Thumbnail"
                  className="video-thumbnail-image"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
