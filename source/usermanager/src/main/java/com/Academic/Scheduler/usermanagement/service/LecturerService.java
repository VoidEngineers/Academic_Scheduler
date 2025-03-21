package com.Academic.Scheduler.usermanagement.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.Academic.Scheduler.usermanagement.Entity.Lecturer;
import com.Academic.Scheduler.usermanagement.Repository.LecturerRepository;
import java.util.List;
import java.util.Optional;
import java.util.ArrayList;

@Service
public class LecturerService {

    @Autowired
    private LecturerRepository lecturerRepository;

    // Lecturer CRUD operations
    public Lecturer saveLecturer(Lecturer lecturer) {
        // Create default empty list for assigned courses if null
        if (lecturer.getAssignedCourses() == null) {
            lecturer.setAssignedCourses(new ArrayList<>());
        }
        return lecturerRepository.save(lecturer);
    }

    public List<Lecturer> getAllLecturers() {
        return lecturerRepository.findAll();
    }

    public Optional<Lecturer> getLecturerById(String userId) {
        return lecturerRepository.findById(userId);
    }

    public Optional<Lecturer> getLecturerByEmail(String email) {
        return lecturerRepository.findByUserEmail(email);
    }

    public List<Lecturer> getLecturersByLic(boolean lic) {
        return lecturerRepository.findByLic(lic);
    }

    public List<Lecturer> getLecturersByCourse(String courseId) {
        return lecturerRepository.findByAssignedCoursesContaining(courseId);
    }

    public List<Lecturer> getLecturersBySpecialization(String area) {
        return lecturerRepository.findBySpecializedAreaContaining(area);
    }

    public Lecturer updateLecturer(String userId, Lecturer lecturer) {
        Optional<Lecturer> existingLecturer = lecturerRepository.findById(userId);

        if (existingLecturer.isPresent()) {
            Lecturer lecturerToUpdate = existingLecturer.get();

            // Only update fields that are provided and not null
            if (lecturer.getUserEmail() != null && !lecturer.getUserEmail().isEmpty()) {
                lecturerToUpdate.setUserEmail(lecturer.getUserEmail());
            }

            lecturerToUpdate.setLic(lecturer.isLic());

            if (lecturer.getAssignedCourses() != null) {
                lecturerToUpdate.setAssignedCourses(lecturer.getAssignedCourses());
            }

            if (lecturer.getWorkingHours() != null) {
                lecturerToUpdate.setWorkingHours(lecturer.getWorkingHours());
            }

            if (lecturer.getSpecializedArea() != null) {
                lecturerToUpdate.setSpecializedArea(lecturer.getSpecializedArea());
            }

            if (lecturer.getDescription() != null) {
                lecturerToUpdate.setDescription(lecturer.getDescription());
            }

            return lecturerRepository.save(lecturerToUpdate);
        }

        return null;
    }

    public boolean deleteLecturer(String userId) {
        if (lecturerRepository.existsById(userId)) {
            lecturerRepository.deleteById(userId);
            return true;
        }
        return false;
    }
}