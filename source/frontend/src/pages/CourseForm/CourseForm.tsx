import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CourseForm.css';

interface FormErrors {
  courseId?: string;
  courseName?: string;
  courseCode?: string;
  category?: string;
  courseDescription?: string;
  lic?: string;
  videoUrl?: string;
}

const CourseForm: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    courseId: '',
    courseName: '',
    courseCode: '',
    category: '',
    courseDescription: '',
    lic: '',
    videoUrl: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'courseId':
        if (!value) return 'Course ID is required';
        if (!/^[A-Z0-9]{4,6}$/.test(value)) return 'Course ID must be 4-6 characters (uppercase letters and numbers)';
        return '';

      case 'courseName':
        if (!value) return 'Course Name is required';
        if (value.length < 3) return 'Course Name must be at least 3 characters';
        if (value.length > 100) return 'Course Name must not exceed 100 characters';
        return '';

      case 'courseCode':
        if (!value) return 'Course Code is required';
        if (!/^[A-Z]{2,3}\d{3}$/.test(value)) return 'Course Code must be in format: XX123 or XXX123 (e.g., CS101)';
        return '';

      case 'category':
        if (!value) return 'Category is required';
        if (value.length < 2) return 'Category must be at least 2 characters';
        return '';

      case 'courseDescription':
        if (!value) return 'Description is required';
        if (value.length < 10) return 'Description must be at least 10 characters';
        if (value.length > 500) return 'Description must not exceed 500 characters';
        return '';

      case 'lic':
        if (value && value.length < 2) return 'License info must be at least 2 characters';
        return '';

      case 'videoUrl':
        // No validation for video URL
        return '';

      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, formData[name as keyof typeof formData]);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: FormErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) newErrors[key as keyof FormErrors] = error;
    });

    if (Object.keys(newErrors).length === 0) {
      // Form is valid, proceed with submission
      console.log('Form submitted:', formData);
      // Add your submission logic here
      
      // Navigate to course list page after successful submission
      navigate('/admin/courses/list');
    } else {
      setErrors(newErrors);
      // Mark all fields as touched
      const allTouched = Object.keys(formData).reduce((acc, key) => ({
        ...acc,
        [key]: true
      }), {});
      setTouched(allTouched);
    }
  };

  return (
    <div className="course-form-container">
      <h2>Add New Course</h2>
      <form className="course-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="courseId">Course ID:</label>
          <input
            type="text"
            id="courseId"
            name="courseId"
            value={formData.courseId}
            onChange={handleChange}
            onBlur={handleBlur}
            className={touched.courseId && errors.courseId ? 'error' : ''}
            required
          />
          {touched.courseId && errors.courseId && (
            <span className="error-message">{errors.courseId}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="courseName">Course Name:</label>
          <input
            type="text"
            id="courseName"
            name="courseName"
            value={formData.courseName}
            onChange={handleChange}
            onBlur={handleBlur}
            className={touched.courseName && errors.courseName ? 'error' : ''}
            required
          />
          {touched.courseName && errors.courseName && (
            <span className="error-message">{errors.courseName}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="courseCode">Course Code:</label>
          <input
            type="text"
            id="courseCode"
            name="courseCode"
            value={formData.courseCode}
            onChange={handleChange}
            onBlur={handleBlur}
            className={touched.courseCode && errors.courseCode ? 'error' : ''}
            placeholder="e.g., CS101"
            required
          />
          {touched.courseCode && errors.courseCode && (
            <span className="error-message">{errors.courseCode}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            onBlur={handleBlur}
            className={touched.category && errors.category ? 'error' : ''}
            required
          />
          {touched.category && errors.category && (
            <span className="error-message">{errors.category}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="courseDescription">Description:</label>
          <textarea
            id="courseDescription"
            name="courseDescription"
            value={formData.courseDescription}
            onChange={handleChange}
            onBlur={handleBlur}
            className={touched.courseDescription && errors.courseDescription ? 'error' : ''}
            required
          />
          {touched.courseDescription && errors.courseDescription && (
            <span className="error-message">{errors.courseDescription}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="videoUrl">Video URL:</label>
          <input
            type="url"
            id="videoUrl"
            name="videoUrl"
            value={formData.videoUrl}
            onChange={handleChange}
            onBlur={handleBlur}
            className={touched.videoUrl && errors.videoUrl ? 'error' : ''}
            placeholder="Enter video URL"
          />
          {touched.videoUrl && errors.videoUrl && (
            <span className="error-message">{errors.videoUrl}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="lic">LIC:</label>
          <input
            type="text"
            id="lic"
            name="lic"
            value={formData.lic}
            onChange={handleChange}
            onBlur={handleBlur}
            className={touched.lic && errors.lic ? 'error' : ''}
          />
          {touched.lic && errors.lic && (
            <span className="error-message">{errors.lic}</span>
          )}
        </div>

        <button type="submit" className="submit-button">Add Course</button>
      </form>
    </div>
  );
};

export default CourseForm; 