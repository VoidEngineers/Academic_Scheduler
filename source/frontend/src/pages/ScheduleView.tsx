import React, { useState } from 'react';
import '../styles/ScheduleView.css';
import { Text, Box } from "@chakra-ui/react";
// Dummy data for demonstration
const dummySchedules = [
  {
    id: 1,
    name: 'Fall 2024 Schedule',
    courses: [
      { 
        id: 1, 
        scheduleId: 'SCH001',
        courseId: 'CS101',
        instructorId: 'INS001',
        name: 'Computer Science 101', 
        time: '9:00 AM - 10:30 AM', 
        days: 'Mon, Wed',
        meetingUrl: 'https://meet.google.com/abc-defg-hij'
      },
      { 
        id: 2, 
        scheduleId: 'SCH002',
        courseId: 'MATH201',
        instructorId: 'INS002',
        name: 'Mathematics 201', 
        time: '11:00 AM - 12:30 PM', 
        days: 'Tue, Thu',
        meetingUrl: 'https://meet.google.com/xyz-uvwx-yz'
      },
      { 
        id: 3, 
        scheduleId: 'SCH003',
        courseId: 'PHY101',
        instructorId: 'INS003',
        name: 'Physics 101', 
        time: '2:00 PM - 3:30 PM', 
        days: 'Mon, Wed, Fri',
        meetingUrl: 'https://meet.google.com/def-ghij-klm'
      },
    ],
  },
  {
    id: 2,
    name: 'Spring 2024 Schedule',
    courses: [
      { 
        id: 4, 
        scheduleId: 'SCH004',
        courseId: 'CHEM101',
        instructorId: 'INS004',
        name: 'Chemistry 101', 
        time: '10:00 AM - 11:30 AM', 
        days: 'Mon, Wed',
        meetingUrl: 'https://meet.google.com/ghi-jklm-nop'
      },
      { 
        id: 5, 
        scheduleId: 'SCH005',
        courseId: 'BIO201',
        instructorId: 'INS005',
        name: 'Biology 201', 
        time: '1:00 PM - 2:30 PM', 
        days: 'Tue, Thu',
        meetingUrl: 'https://meet.google.com/jkl-mnop-qrs'
      },
    ],
  },
];

const ScheduleView: React.FC = () => {
  const [schedules, setSchedules] = useState(dummySchedules);
  const [selectedSchedule, setSelectedSchedule] = useState<typeof dummySchedules[0] | null>(null);
  const [editingCourse, setEditingCourse] = useState<typeof dummySchedules[0]['courses'][0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = (schedule: typeof dummySchedules[0], course: typeof dummySchedules[0]['courses'][0]) => {
    setSelectedSchedule(schedule);
    setEditingCourse(course);
    setIsModalOpen(true);
  };

  const handleCloseDialog = () => {
    setSelectedSchedule(null);
    setEditingCourse(null);
    setIsModalOpen(false);
  };

  const handleSaveChanges = () => {
    if (selectedSchedule && editingCourse) {
      setSchedules(schedules.map(schedule => {
        if (schedule.id === selectedSchedule.id) {
          return {
            ...schedule,
            courses: schedule.courses.map(course => {
              if (course.id === editingCourse.id) {
                return editingCourse;
              }
              return course;
            }),
          };
        }
        return schedule;
      }));
    }
    handleCloseDialog();
  };

  return (
    <Box minH="100vh" bg="black">
    <div className="schedule-container">
       <Text fontSize='50px' color='white' textAlign='center'>
       Schedule Management
      </Text>
      
      {schedules.map((schedule) => (
        <div key={schedule.id} className="schedule-card">
          <h2 className="schedule-name">{schedule.name}</h2>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Schedule ID</th>
                  <th>Course ID</th>
                  <th>Instructor ID</th>
                  <th>Course Name</th>
                  <th>Time</th>
                  <th>Days</th>
                  <th>Meeting URL</th>
                  <th>Actions</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {schedule.courses.map((course) => (
                  <tr key={course.id}>
                    <td className="id-cell">{course.scheduleId}</td>
                    <td className="id-cell">{course.courseId}</td>
                    <td className="id-cell">{course.instructorId}</td>
                    <td>{course.name}</td>
                    <td>{course.time}</td>
                    <td>{course.days}</td>
                    <td>
                      <a href={course.meetingUrl} target="_blank" rel="noopener noreferrer" className="meeting-link">
                        Join Meeting
                      </a>
                    </td>
                    <td>
                      <button
                        className="edit-button"
                        onClick={() => handleEditClick(schedule, course)}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        className="delete-button"
                        onClick={() => handleEditClick(schedule, course)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="modal-title">Edit Course</h3>
            {editingCourse && (
              <div className="modal-body">
                <div className="form-group">
                  <label>Schedule ID</label>
                  <input
                    type="text"
                    value={editingCourse.scheduleId}
                    onChange={(e) => setEditingCourse({ ...editingCourse, scheduleId: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Course ID</label>
                  <input
                    type="text"
                    value={editingCourse.courseId}
                    onChange={(e) => setEditingCourse({ ...editingCourse, courseId: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Instructor ID</label>
                  <input
                    type="text"
                    value={editingCourse.instructorId}
                    onChange={(e) => setEditingCourse({ ...editingCourse, instructorId: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Course Name</label>
                  <input
                    type="text"
                    value={editingCourse.name}
                    onChange={(e) => setEditingCourse({ ...editingCourse, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Time</label>
                  <input
                    type="text"
                    value={editingCourse.time}
                    onChange={(e) => setEditingCourse({ ...editingCourse, time: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Days</label>
                  <input
                    type="text"
                    value={editingCourse.days}
                    onChange={(e) => setEditingCourse({ ...editingCourse, days: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Meeting URL</label>
                  <input
                    type="url"
                    value={editingCourse.meetingUrl}
                    onChange={(e) => setEditingCourse({ ...editingCourse, meetingUrl: e.target.value })}
                  />
                </div>
              </div>
            )}
            <div className="modal-footer">
              <button className="cancel-button" onClick={handleCloseDialog}>
                Cancel
              </button>
              <button className="save-button" onClick={handleSaveChanges}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </Box>
  );
};

export default ScheduleView; 