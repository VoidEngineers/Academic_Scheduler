package com.Academic.Scheduler.usermanagement.Entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;
import java.util.List;

@Document(collection = "lecturers")
public class Lecturer {
    @Id
    private String userId;
    
    @Indexed(unique = true)
    private String userEmail;
    private List<String> assignedCourses;
    private List<String> specializations;
    private boolean lic;
    private String workingHours;
    private String specializedArea;
    private String description;

    // Default constructor
    public Lecturer() {}

    // Parameterized constructor
    public Lecturer(String userId, String userEmail, List<String> assignedCourses, 
                   List<String> specializations, boolean lic, String workingHours, 
                   String specializedArea, String description) {
        this.userId = userId;
        this.userEmail = userEmail;
        this.assignedCourses = assignedCourses;
        this.specializations = specializations;
        this.lic = lic;
        this.workingHours = workingHours;
        this.specializedArea = specializedArea;
        this.description = description;
    }

    // Getters and setters
    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public List<String> getAssignedCourses() {
        return assignedCourses;
    }

    public void setAssignedCourses(List<String> assignedCourses) {
        this.assignedCourses = assignedCourses;
    }

    public List<String> getSpecializations() {
        return specializations;
    }

    public void setSpecializations(List<String> specializations) {
        this.specializations = specializations;
    }

    public boolean isLic() {
        return lic;
    }

    public void setLic(boolean lic) {
        this.lic = lic;
    }

    public String getWorkingHours() {
        return workingHours;
    }

    public void setWorkingHours(String workingHours) {
        this.workingHours = workingHours;
    }

    public String getSpecializedArea() {
        return specializedArea;
    }

    public void setSpecializedArea(String specializedArea) {
        this.specializedArea = specializedArea;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "Lecturer{" +
                "userId='" + userId + '\'' +
                ", userEmail='" + userEmail + '\'' +
                ", assignedCourses=" + assignedCourses +
                ", specializations=" + specializations +
                ", lic=" + lic +
                ", workingHours='" + workingHours + '\'' +
                ", specializedArea='" + specializedArea + '\'' +
                ", description='" + description + '\'' +
                '}';
    }
}