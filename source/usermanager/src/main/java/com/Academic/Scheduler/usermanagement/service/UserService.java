package com.Academic.Scheduler.usermanagement.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.Academic.Scheduler.usermanagement.Entity.Lecturer;
import com.Academic.Scheduler.usermanagement.Entity.User;
import com.Academic.Scheduler.usermanagement.Repository.UserRepository;
import java.util.List;
import java.util.Optional;
import java.util.ArrayList;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private LecturerService lecturerService;

    // User CRUD operations
    public User saveUser(User user) {
        // Create a default empty list for courses if null
        if (user.getCourses() == null) {
            user.setCourses(new ArrayList<>());
        }
        return userRepository.save(user);
    }
    
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    public Optional<User> getUserById(String userId) {
        return userRepository.findById(userId);
    }
    
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findById(email);
    }
    public List<User> getUsersByRole(String role) {
        return userRepository.findByUserRole(role);
    }
    
    public User updateUser(String userId, User user) {
        Optional<User> existingUser = userRepository.findById(userId);
        
        if (existingUser.isPresent()) {
            User userToUpdate = existingUser.get();
            
            // Only update fields that are provided and not null
            if (user.getUserName() != null && !user.getUserName().isEmpty()) {
                userToUpdate.setUserName(user.getUserName());
            }
            
            if (user.getUserEmail() != null && !user.getUserEmail().isEmpty()) {
                userToUpdate.setUserEmail(user.getUserEmail());
            }
            
            if (user.getCountryCode() != null) {
                userToUpdate.setCountryCode(user.getCountryCode());
            }
            
            if (user.getCourses() != null) {
                userToUpdate.setCourses(user.getCourses());
            }
            
            // The role shouldn't change frequently, so only update if provided
            if (user.getUserRole() != null && !user.getUserRole().isEmpty()) {
                userToUpdate.setUserRole(user.getUserRole());
            }
            
            return userRepository.save(userToUpdate);
        }
        
        return null;
    }
    
    public boolean deleteUser(String userId) {
        if (userRepository.existsById(userId)) {
            userRepository.deleteById(userId);
            
            // Also delete lecturer record if exists
            lecturerService.deleteLecturer(userId);
            
            return true;
        }
        return false;
    }
    
    // Course management for users
    public User addCourseToUser(String userId, String courseId) {
        Optional<User> existingUser = userRepository.findById(userId);
        
        if (existingUser.isPresent()) {
            User user = existingUser.get();
            List<String> courses = user.getCourses();
            
            if (courses == null) {
                courses = new ArrayList<>();
                user.setCourses(courses);
            }
            
            // Avoid duplicates
            if (!courses.contains(courseId)) {
                courses.add(courseId);
                return userRepository.save(user);
            }
            
            return user;
        }
        
        return null;
    }
    
    public User removeCourseFromUser(String userId, String courseId) {
        Optional<User> existingUser = userRepository.findById(userId);
        
        if (existingUser.isPresent()) {
            User user = existingUser.get();
            List<String> courses = user.getCourses();
            
            if (courses != null) {
                courses.remove(courseId);
                return userRepository.save(user);
            }
            
            return user;
        }
        
        return null;
    }
    
    // Convenience method to create a new lecturer when a user with lecturer role is created
    public Lecturer createLecturerFromUser(User user) {
        if (user != null && user.getUserRole() != null && 
            (user.getUserRole().equalsIgnoreCase("Lecturer") || 
             user.getUserRole().equalsIgnoreCase("Instructor"))) {
            
            Lecturer lecturer = new Lecturer();
            lecturer.setUserId(user.getUserId());
            lecturer.setUserEmail(user.getUserEmail());
            lecturer.setAssignedCourses(new ArrayList<>());
            lecturer.setLic(false);
            lecturer.setWorkingHours("");
            lecturer.setSpecializedArea("");
            lecturer.setDescription("");
            
            return lecturerService.saveLecturer(lecturer);
        }
        
        return null;
    }
    
    // Method to check if email exists
    public boolean emailExists(String email) {
        return userRepository.findById(email).isPresent();
    }
}