import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Text } from "@chakra-ui/react";
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

  // Category options
  const categoryOptions = ['IT', 'Sinhala', 'Science', 'English'];

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
        return '';

      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, formData[name as keyof typeof formData]);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: FormErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) newErrors[key as keyof FormErrors] = error;
    });

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch('http://localhost:8083/api/courses/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify(formData)
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(`Error: ${response.status} - ${JSON.stringify(errorData)}`);
        }

        alert('Course added successfully!');
        navigate('/admin/courses/list');
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Failed to add course';
        console.error('Failed to add course:', error);
        alert(errorMessage);
      }
    } else {
      setErrors(newErrors);
      setTouched(
        Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {})
      );
    }
  };

  // Input field definitions
  const inputFields = [
    { label: 'Course ID', name: 'courseId', type: 'text' },
    { label: 'Course Name', name: 'courseName', type: 'text' },
    { label: 'Course Code', name: 'courseCode', type: 'text', placeholder: 'e.g., CS101' },
    { label: 'Video URL', name: 'videoUrl', type: 'url', placeholder: 'Enter video URL' },
    { label: 'LIC', name: 'lic', type: 'text' }
  ];

  // Create pairs of fields for two-column layout
  const fieldPairs = [];
  for (let i = 0; i < inputFields.length; i += 2) {
    fieldPairs.push(inputFields.slice(i, i + 2));
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      flexDirection: 'column'
    }}>
      <Text fontSize='30px' color='black' textAlign='center'>Add New Course</Text>
      <form 
        onSubmit={handleSubmit} 
        style={{
          width: '50%',
          backgroundColor: '#f9f9f9',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '20px'
        }}
      >
        {/* Render field pairs in rows */}
        {fieldPairs.map((pair, index) => (
          <div key={index} style={{ 
            width: '100%', 
            display: 'flex',
            justifyContent: 'space-between',
            gap: '15px',
            marginBottom: '10px'
          }}>
            {pair.map(({ label, name, type, placeholder }) => (
              <div key={name} style={{ flex: 1 }}>
                <label htmlFor={name} style={{ display: 'block', marginBottom: '5px' }}>{label}:</label>
                <input
                  type={type}
                  id={name}
                  name={name}
                  value={formData[name as keyof typeof formData]}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={placeholder}
                  style={{
                    width: '100%',
                    padding: '8px',
                    border: `1px solid ${errors[name as keyof FormErrors] ? 'red' : '#ccc'}`,
                    borderRadius: '5px'
                  }}
                  required
                />
                {touched[name] && errors[name as keyof FormErrors] && (
                  <span style={{ color: 'red', fontSize: '12px' }}>{errors[name as keyof FormErrors]}</span>
                )}
              </div>
            ))}
            {/* If we have an odd number of fields, add an empty div to maintain layout */}
            {pair.length === 1 && <div style={{ flex: 1 }}></div>}
          </div>
        ))}

        {/* Category dropdown in its own row */}
        <div style={{ width: '100%', marginBottom: '10px' }}>
          <label htmlFor="category" style={{ display: 'block', marginBottom: '5px' }}>Category:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            onBlur={handleBlur}
            style={{
              width: '100%',
              padding: '8px',
              border: `1px solid ${errors.category ? 'red' : '#ccc'}`,
              borderRadius: '5px',
              backgroundColor: 'white'
            }}
            required
          >
            <option value="" disabled>Select a category</option>
            {categoryOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {touched.category && errors.category && (
            <span style={{ color: 'red', fontSize: '12px' }}>{errors.category}</span>
          )}
        </div>

        {/* Description textarea */}
        <div style={{ width: '100%', marginBottom: '10px' }}>
          <label htmlFor="courseDescription" style={{ display: 'block', marginBottom: '5px' }}>Description:</label>
          <textarea
            id="courseDescription"
            name="courseDescription"
            value={formData.courseDescription}
            onChange={handleChange}
            onBlur={handleBlur}
            style={{
              width: '100%',
              padding: '8px',
              border: `1px solid ${errors.courseDescription ? 'red' : '#ccc'}`,
              borderRadius: '5px',
              minHeight: '80px'
            }}
            required
          />
          {touched.courseDescription && errors.courseDescription && (
            <span style={{ color: 'red', fontSize: '12px' }}>{errors.courseDescription}</span>
          )}
        </div>

        <button 
          type="submit" 
          style={{
            padding: '10px 20px',
            backgroundColor: '#007BFF',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            marginTop: '10px'
          }}
        >
          Add Course
        </button>
      </form>
    </div>
  );
};

export default CourseForm;