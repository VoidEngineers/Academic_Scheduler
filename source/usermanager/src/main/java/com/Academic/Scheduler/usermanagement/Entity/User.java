package com.Academic.Scheduler.usermanagement.Entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;
import java.util.List;

@Document(collection = "users")
public class User {
    @Id
    private String userId;
    private String userName;
    private String userRole;
    
    @Indexed(unique = true)
    private String userEmail;
    private String countryCode;
    private List<String> courses;

    // Default constructor
    public User() {}

    // Parameterized constructor
    public User(String userId, String userName, String userRole, String userEmail, String countryCode, List<String> courses) {
        this.userId = userId;
        this.userName = userName;
        this.userRole = userRole;
        this.userEmail = userEmail;
        this.countryCode = countryCode;
        this.courses = courses;
    }

    // Getters and setters
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

    public String getUserRole() {
        return userRole;
    }

    public void setUserRole(String userRole) {
        this.userRole = userRole;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
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