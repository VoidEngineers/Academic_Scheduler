package com.Academic.Scheduler.usermanagement.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.Academic.Scheduler.usermanagement.Entity.User;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByUserEmail(String userEmail);
    List<User> findByUserRole(String userRole);
    List<User> findByCoursesContaining(String courseId);
    boolean existsByUserEmail(String userEmail);
}