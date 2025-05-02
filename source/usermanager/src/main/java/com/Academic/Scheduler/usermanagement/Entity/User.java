package com.Academic.Scheduler.usermanagement.Entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;
import java.util.List;

@Document(collection = "users")
public class User {
    @Id
    private String id;
    
    // Use userId as the MongoDB _id
    @Field("_id")
    private String userId;
    
    private String userName;    // Changed back to match MongoDB field
    private String userEmail;   // Changed back to match MongoDB field
    private String userRole;
    private String countryCode;
    private List<String> courses;
    private String password;
    private boolean isActive = true;

    // Default constructor
    public User() {}
    
    // Constructor with fields
    public User(String userId, String userName, String userEmail, String userRole, 
                String countryCode, List<String> courses, String password) {
        this.userId = userId;
        this.userName = userName;
        this.userEmail = userEmail;
        this.userRole = userRole;
        this.countryCode = countryCode;
        this.courses = courses;
        this.password = password;
    }
    
    // Getters and setters
    public String getId() {
        return id;
    }
    
    public void setId(String id) {
        this.id = id;
    }
    
    public String getUserId() {
        return userId;
    }
    
    public void setUserId(String userId) {
        this.userId = userId;
    }
    
    public String getUserName() {
        return userName;
    }
    
    public void setUserName(String userName) {
        this.userName = userName;
    }
    
    public String getUserEmail() {
        return userEmail;
    }
    
    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }
    
    public String getUserRole() {
        return userRole;
    }
    
    public void setUserRole(String userRole) {
        this.userRole = userRole;
    }
    
    public String getCountryCode() {
        return countryCode;
    }
    
    public void setCountryCode(String countryCode) {
        this.countryCode = countryCode;
    }
    
    public List<String> getCourses() {
        return courses;
    }
    
    public void setCourses(List<String> courses) {
        this.courses = courses;
    }
    
    public String getPassword() {
        return password;
    }
    
    public void setPassword(String password) {
        this.password = password;
    }
    
    public boolean isActive() {
        return isActive;
    }
    
    public void setActive(boolean active) {
        isActive = active;
    }

    @Override
    public String toString() {
        return "User{" +
                "userId='" + userId + '\'' +
                ", userName='" + userName + '\'' +
                ", userRole='" + userRole + '\'' +
                ", userEmail='" + userEmail + '\'' +
                ", countryCode='" + countryCode + '\'' +
                ", courses=" + courses +
                '}';
    }
}