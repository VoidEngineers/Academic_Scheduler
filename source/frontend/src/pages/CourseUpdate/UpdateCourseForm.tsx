import React, {useState} from 'react';
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
  const [formData, setFormData] = useState<Course>(course);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8083/api/courses/update/${course.courseId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to update course');
      }

      alert('Course updated successfully!');
      onClose();
      window.location.reload(); // Refresh to show updated data
    } catch (error) {
      console.error('Error updating course:', error);
      alert('Failed to update course');
    }
  };

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
            value={formData.courseId}
            disabled
          />
        </div>

        <div className="form-group">
          <label htmlFor="courseName">Course Name:</label>
          <input
            type="text"
            id="courseName"
            name="courseName"
            value={formData.courseName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="courseCode">Course Code:</label>
          <input
            type="text"
            id="courseCode"
            name="courseCode"
            value={formData.courseCode}
            onChange={handleChange}
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
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="courseDescription">Description:</label>
          <textarea
            id="courseDescription"
            name="courseDescription"
            value={formData.courseDescription}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="lic">License/Additional Info:</label>
          <input
            type="text"
            id="lic"
            name="lic"
            value={formData.lic}
            onChange={handleChange}
          />
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-button" onClick={handleSubmit}>Update Course</button>
          <button type="button" className="cancel-button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateCourseForm; 