import React from 'react';
import './UpdateCourseForm.css';

interface Course {
  courseId: string;
  courseName: string;
  courseCode: string;
  category: string;
  courseDescription: string;
  lic: string;
}

interface UpdateCourseFormProps {
  course: Course;
  onClose: () => void;
}

const UpdateCourseForm: React.FC<UpdateCourseFormProps> = ({ course, onClose }) => {
  return (
    <div className="course-form-container">
      <div className="form-header">
        <h2>Update Course</h2>
        <button className="close-button" onClick={onClose}>×</button>
      </div>
      <form className="course-form">
        <div className="form-group">
          <label htmlFor="courseId">Course ID:</label>
          <input
            type="text"
            id="courseId"
            name="courseId"
            defaultValue={course.courseId}
            required
            disabled
          />
        </div>

        <div className="form-group">
          <label htmlFor="courseName">Course Name:</label>
          <input
            type="text"
            id="courseName"
            name="courseName"
            defaultValue={course.courseName}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="courseCode">Course Code:</label>
          <input
            type="text"
            id="courseCode"
            name="courseCode"
            defaultValue={course.courseCode}
            placeholder="e.g., IT123, SE123"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            defaultValue={course.category}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="courseDescription">Description:</label>
          <textarea
            id="courseDescription"
            name="courseDescription"
            defaultValue={course.courseDescription}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="lic">License/Additional Info:</label>
          <input
            type="text"
            id="lic"
            name="lic"
            defaultValue={course.lic}
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-button">Update Course</button>
          <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateCourseForm; 