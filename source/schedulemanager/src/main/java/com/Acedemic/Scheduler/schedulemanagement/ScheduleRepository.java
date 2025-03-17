package com.Acedemic.Scheduler.schedulemanagement;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface ScheduleRepository extends MongoRepository<Schedule, String> {
   // public List<Schedule> findByTitle(String title);
}       