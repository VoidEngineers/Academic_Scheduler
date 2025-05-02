package com.Academic.Scheduler.usermanagement.Repository;

import com.Academic.Scheduler.usermanagement.Entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByUserEmail(String userEmail);
    List<User> findByUserId(String role);
    List<User> findByUserRole(String userRole);
}
