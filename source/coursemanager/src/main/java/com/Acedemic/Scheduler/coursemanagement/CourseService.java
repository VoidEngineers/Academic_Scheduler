package com.Acedemic.Scheduler.coursemanagement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    // Create a Course
    public Course createCourse(Course course) {
        return courseRepository.save(course);
    }

    // Read/Get All Courses
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    // Read/Get a Course by ID
    public Optional<Course> getCourseById(String courseId) {
        return courseRepository.findById(courseId);
    }

    // Update a Course
    public Course updateCourse(String courseId, Course updatedCourse) {
        return courseRepository.findById(courseId).map(course -> {
            course.setCourseName(updatedCourse.getCourseName());
            course.setCourseCode(updatedCourse.getCourseCode());
            course.setCategory(updatedCourse.getCategory());
            course.setCourseDescription(updatedCourse.getCourseDescription());
            course.setLic(updatedCourse.getLic());
            return courseRepository.save(course);
        }).orElseThrow(() -> new RuntimeException("Course not found!"));
    }

    // Delete a Course
    public void deleteCourse(String courseId) {
        courseRepository.deleteById(courseId);
    }
}
