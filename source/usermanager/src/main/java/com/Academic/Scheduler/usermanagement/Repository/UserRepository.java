package com.Academic.Scheduler.usermanagement.Repository;

import com.Academic.Scheduler.usermanagement.Entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    List<User> findByUserId(String userId);
    Optional<User> findByEmail(String email);  // Changed from findByUserEmail
    
    // If you have query methods that use email or name, update them too
    boolean existsByEmail(String email);  // Changed from existsByUserEmail
}