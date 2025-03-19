package com.Acedemic.Scheduler.coursemanagement;

//import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;


@Document(collection = "courses")
public class Course {

    @Id
    private String courseId;
    private String courseName;
    private String courseCode;
    private String category;
    private String courseDescription;
    private String lic; // License or any additional info

    // Constructors
    public Course() {}

    public Course(String courseId, String courseName, String courseCode, String category, String courseDescription, String lic) {
        this.courseId = courseId;
        this.courseName = courseName;
        this.courseCode = courseCode;
        this.category = category;
        this.courseDescription = courseDescription;
        this.lic = lic;
    }

    // Getters and Setters
    public String getCourseId() { return courseId; }
    public void setCourseId(String courseId) { this.courseId = courseId; }

    public String getCourseName() { return courseName; }
    public void setCourseName(String courseName) { this.courseName = courseName; }

    public String getCourseCode() { return courseCode; }
    public void setCourseCode(String courseCode) { this.courseCode = courseCode; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getCourseDescription() { return courseDescription; }
    public void setCourseDescription(String courseDescription) { this.courseDescription = courseDescription; }

    public String getLic() { return lic; }
    public void setLic(String lic) { this.lic = lic; }
}

