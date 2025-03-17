package com.Acedemic.Scheduler.schedulemanagement;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ScheduleService {

    @Autowired
    private ScheduleRepository scheduleRepository;

    public Schedule saveSchedule(Schedule schedule) {
        return scheduleRepository.save(schedule);
    }

    public List<Schedule> getAllSchedules() {
        return scheduleRepository.findAll();
    }

    public Optional<Schedule> getScheduleById(String tableID) {
        return scheduleRepository.findById(tableID);
    }
    
    public Schedule updateSchedule(String tableID, Schedule schedule) {
        Optional<Schedule> existingSchedule = scheduleRepository.findById(tableID);
    
        if (existingSchedule.isPresent()) {
            Schedule scheduleToUpdate = existingSchedule.get();
            
            scheduleToUpdate.setTableName(schedule.getTableName());
            scheduleToUpdate.setCourseId(schedule.getCourseId());
            scheduleToUpdate.setInstructorId(schedule.getInstructorId());
            scheduleToUpdate.setLic(schedule.getLic());
            scheduleToUpdate.setMeetingURL(schedule.getMeetingURL());
            scheduleToUpdate.setStartTime(schedule.getStartTime());
            scheduleToUpdate.setEndTime(schedule.getEndTime());
            scheduleToUpdate.setDuration(schedule.getDuration());
            scheduleToUpdate.setCapacity(schedule.getCapacity());
            scheduleToUpdate.setStudents(schedule.getStudents());
    
            return scheduleRepository.save(scheduleToUpdate);
        } else {
            return null; 
        }
    }

    public Boolean deleteSchedule(String tableID) {
        if (scheduleRepository.existsById(tableID)) {
            scheduleRepository.deleteById(tableID);
            return true;
        }
        return false; 
    }
}
