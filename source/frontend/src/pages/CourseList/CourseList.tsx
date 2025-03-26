import React, { useState } from 'react';
import './CourseList.css';
import UpdateCourseForm from '../CourseUpdate/UpdateCourseForm';

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

  // Dummy data
  const [courses, setCourses] = useState<Course[]>([
    {
      courseId: "C001",
      courseName: "Introduction to Programming",
      courseCode: "CS101",
      category: "Computer Science",
      courseDescription: "Basic programming concepts and problem-solving techniques",
      lic: "Mr.Prasanna"
    },
    {
      courseId: "C002",
      courseName: "Data Structures",
      courseCode: "CS201",
      category: "Computer Science",
      courseDescription: "Study of fundamental data structures and algorithms",
      lic: "Mr.Sanka"
    },
    {
      courseId: "C003",
      courseName: "Web Development",
      courseCode: "CS301",
      category: "Computer Science",
      courseDescription: "Modern web development with React and Node.js",
      lic: "Mr.Kasun"
    },
    {
      courseId: "C004",
      courseName: "Database Systems",
      courseCode: "CS401",
      category: "Computer Science",
      courseDescription: "Database design and SQL programming",
      lic: "Mr.Geeth"
    }
  ]);

  const handleEdit = (course: Course) => {
    setSelectedCourse(course);
    setShowUpdateForm(true);
  };

  const handleCloseUpdateForm = () => {
    setShowUpdateForm(false);
    setSelectedCourse(null);
  };

  const handleDelete = (courseId: string) => {
    const courseToDelete = courses.find(course => course.courseId === courseId);
    if (courseToDelete && window.confirm(`Are you sure you want to delete "${courseToDelete.courseName}"?`)) {
      // Filter out the deleted course
      setCourses(courses.filter(course => course.courseId !== courseId));
    }
  };

  return (
    <div className="course-list-container">
      <h2>Course List</h2>
      {showUpdateForm && selectedCourse && (
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
              <h3>{course.courseName}</h3>
              <span className="course-code">{course.courseCode}</span>
            </div>
            <div className="course-details">
              <p><strong>Category:</strong> {course.category}</p>
              <p><strong>Description:</strong> {course.courseDescription}</p>
              <p><strong>License:</strong> {course.lic}</p>
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