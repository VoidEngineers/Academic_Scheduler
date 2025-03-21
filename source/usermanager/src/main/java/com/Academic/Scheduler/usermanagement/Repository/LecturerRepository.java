package com.Academic.Scheduler.usermanagement.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.Academic.Scheduler.usermanagement.Entity.Lecturer;

import java.util.List;
import java.util.Optional;

@Repository
public interface LecturerRepository extends MongoRepository<Lecturer, String> {
    Optional<Lecturer> findByUserEmail(String email);

    List<Lecturer> findByLic(boolean lic);

    List<Lecturer> findBySpecializedAreaContaining(String area);

    List<Lecturer> findByAssignedCoursesContaining(String courseId);
}
