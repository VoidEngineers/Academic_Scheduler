import React, { useState, useEffect } from 'react';
import './CourseList.css';
import UpdateCourseForm from '../CourseUpdate/UpdateCourseForm';
import { useNavigate } from 'react-router-dom';


interface Course {
  courseId: string;
  courseName: string;
  courseCode: string;
  category: string;
  courseDescription: string;
  lic: string;
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
        credentials: 'include'
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

  const handleDelete = async (courseId: string) => {
    const courseToDelete = courses.find(course => course.courseId === courseId);
    if (courseToDelete && window.confirm(`Are you sure you want to delete "${courseToDelete.courseName}"?`)) {
      try {
        const response = await fetch(`http://localhost:8082/api/courses/delete/${courseId}`, {
          method: 'DELETE',
          credentials: 'include'
        });
        if (!response.ok) {
          throw new Error('Failed to delete course');
        }
        setCourses(courses.filter(course => course.courseId !== courseId));
      } catch (error) {
        console.error('Error deleting course:', error);
      }
    }
  };

  const handleAddCourse = () => {
    navigate("/admin/courses/form");
  };

  return (
    <div className="course-list-container">
      <div className="course-list-header">
        <h2>Course List</h2>
        <button
          className="add-course-button"
          onClick={handleAddCourse}
        >
          Add New Course
        </button>
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
              <p><strong>Category:</strong> {course.category}</p>
              <p><strong>Description:</strong> {course.courseDescription}</p>
              <p><strong>LIC:</strong> {course.lic}</p>
            </div>
            <div className="course-actions">
              <button className="edit-button" onClick={() => handleEdit(course)}>Edit</button>
              <button className="delete-button" onClick={() => handleDelete(course.courseId)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
