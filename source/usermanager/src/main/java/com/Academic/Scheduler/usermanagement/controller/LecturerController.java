package com.Academic.Scheduler.usermanagement.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.Academic.Scheduler.usermanagement.Entity.Lecturer;
import com.Academic.Scheduler.usermanagement.service.LecturerService;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/lecturers")
@CrossOrigin(origins = "http://localhost:5173")
public class LecturerController {

    @Autowired
    private LecturerService lecturerService;
    
    @GetMapping
    public ResponseEntity<List<Lecturer>> getAllLecturers() {
        List<Lecturer> lecturers = lecturerService.getAllLecturers();
        
        if (lecturers.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        
        return new ResponseEntity<>(lecturers, HttpStatus.OK);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Lecturer> getLecturerById(@PathVariable("id") String id) {
        Optional<Lecturer> lecturerData = lecturerService.getLecturerById(id);
        
        if (lecturerData.isPresent()) {
            return new ResponseEntity<>(lecturerData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    @GetMapping("/email/{email}")
    public ResponseEntity<Lecturer> getLecturerByEmail(@PathVariable("email") String email) {
        Optional<Lecturer> lecturerData = lecturerService.getLecturerByEmail(email);
        
        if (lecturerData.isPresent()) {
            return new ResponseEntity<>(lecturerData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    @GetMapping("/lic/{status}")
    public ResponseEntity<List<Lecturer>> getLecturersByLicStatus(@PathVariable("status") boolean status) {
        List<Lecturer> lecturers = lecturerService.getLecturersByLic(status);
        
        if (lecturers.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        
        return new ResponseEntity<>(lecturers, HttpStatus.OK);
    }
    
    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<Lecturer>> getLecturersByCourse(@PathVariable("courseId") String courseId) {
        List<Lecturer> lecturers = lecturerService.getLecturersByCourse(courseId);
        
        if (lecturers.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        
        return new ResponseEntity<>(lecturers, HttpStatus.OK);
    }
    
    @GetMapping("/specialization/{area}")
    public ResponseEntity<List<Lecturer>> getLecturersBySpecialization(@PathVariable("area") String area) {
        List<Lecturer> lecturers = lecturerService.getLecturersBySpecialization(area);
        
        if (lecturers.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        
        return new ResponseEntity<>(lecturers, HttpStatus.OK);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Lecturer> updateLecturer(@PathVariable("id") String id, @RequestBody Lecturer lecturer) {
        Lecturer updatedLecturer = lecturerService.updateLecturer(id, lecturer);
        
        if (updatedLecturer != null) {
            return new ResponseEntity<>(updatedLecturer, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteLecturer(@PathVariable("id") String id) {
        try {
            boolean result = lecturerService.deleteLecturer(id);
            
            if (result) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PostMapping("/{id}/courses/{courseId}")
    public ResponseEntity<Lecturer> addCourseToLecturer(@PathVariable("id") String id, 
                                                        @PathVariable("courseId") String courseId) {
        Optional<Lecturer> lecturerData = lecturerService.getLecturerById(id);
        
        if (lecturerData.isPresent()) {
            Lecturer lecturer = lecturerData.get();
            List<String> courses = lecturer.getAssignedCourses();
            
            if (!courses.contains(courseId)) {
                courses.add(courseId);
                lecturer.setAssignedCourses(courses);
                Lecturer updatedLecturer = lecturerService.saveLecturer(lecturer);
                return new ResponseEntity<>(updatedLecturer, HttpStatus.OK);
            }
            
            return new ResponseEntity<>(lecturer, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    @DeleteMapping("/{id}/courses/{courseId}")
    public ResponseEntity<Lecturer> removeCourseFromLecturer(@PathVariable("id") String id, 
                                                             @PathVariable("courseId") String courseId) {
        Optional<Lecturer> lecturerData = lecturerService.getLecturerById(id);
        
        if (lecturerData.isPresent()) {
            Lecturer lecturer = lecturerData.get();
            List<String> courses = lecturer.getAssignedCourses();
            
            courses.remove(courseId);
            lecturer.setAssignedCourses(courses);
            Lecturer updatedLecturer = lecturerService.saveLecturer(lecturer);
            
            return new ResponseEntity<>(updatedLecturer, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
    @PatchMapping("/{id}/lic/{status}")
    public ResponseEntity<Lecturer> updateLicStatus(@PathVariable("id") String id, 
                                                    @PathVariable("status") boolean status) {
        Optional<Lecturer> lecturerData = lecturerService.getLecturerById(id);
        
        if (lecturerData.isPresent()) {
            Lecturer lecturer = lecturerData.get();
            lecturer.setLic(status);
            Lecturer updatedLecturer = lecturerService.saveLecturer(lecturer);
            
            return new ResponseEntity<>(updatedLecturer, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}