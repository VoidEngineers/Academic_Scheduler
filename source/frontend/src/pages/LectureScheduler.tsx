import { useState, useEffect } from "react";
import { Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import "../styles/LectureScheduler.css";

interface Student {
  userId: string;
  userEmail: string;
}

export const LectureScheduler = () => {
  const [students, setStudents] = useState<Student[]>([
    { userId: "", userEmail: "" },
  ]);
  const [selectedDay, setSelectedDay] = useState("");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("12:00");
  const [formData, setFormData] = useState({
    tableId: '',
    tableName: '',
    scheduleId: '',
    courseId: '',
    instructorId: '',
    lic: '',
    meetingURL: ''
  });

  const navigate = useNavigate();

  // Calculate end time whenever start time changes
  useEffect(() => {
    const calculateEndTime = (start: string) => {
      const [hours, minutes] = start.split(':').map(Number);
      const endHours = hours + 3;
      return `${endHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    };
    setEndTime(calculateEndTime(startTime));
  }, [startTime]);

  const weekdays = [
    { value: "monday", label: "Monday" },
    { value: "tuesday", label: "Tuesday" },
    { value: "wednesday", label: "Wednesday" },
    { value: "thursday", label: "Thursday" },
    { value: "friday", label: "Friday" },
  ];

  const handleAddStudent = () => {
    if (students.length < 100) {
      setStudents([...students, { userId: "", userEmail: "" }]);
    } else {
      alert("Maximum capacity reached: You can only add up to 100 students");
    }
  };

  const handleRemoveStudent = (index: number) => {
    const newStudents = students.filter((_, i) => i !== index);
    setStudents(newStudents);
  };

  const handleStudentChange = (
    index: number,
    field: keyof Student,
    value: string
  ) => {
    const newStudents = [...students];
    newStudents[index] = { ...newStudents[index], [field]: value };
    setStudents(newStudents);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
        ...prev,
        [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Convert time strings to timestamps
    const startTimeDate = new Date(`2024-01-01T${startTime}`);
    const endTimeDate = new Date(`2024-01-01T${endTime}`);
    
    try {
      const scheduleData = {
        tableId: formData.tableId,
        tableName: formData.tableName,
        scheduleId: formData.scheduleId,
        courseId: formData.courseId,
        instructorId: formData.instructorId,
        lic: formData.lic,
        meetingURL: formData.meetingURL,
        startTime: startTimeDate.getTime(),
        endTime: endTimeDate.getTime(),
        duration: "3 hours",
        capacity: 100,
        selectedDay,
        students: students.map(student => ({
          userId: student.userId,
          userEmail: student.userEmail
        }))
      };

      console.log("Sending data:", JSON.stringify(scheduleData, null, 2));

      const response = await fetch("http://localhost:8082/schedules/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(scheduleData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error: ${response.status} - ${JSON.stringify(errorData)}`);
      }
  
      alert("Lecture schedule has been saved successfully");
      // Reset form - Fix the TypeScript error by casting to HTMLFormElement
      (e.target as HTMLFormElement).reset();
      setStudents([{ userId: "", userEmail: "" }]);
      setSelectedDay("");
      setStartTime("09:00");
      setFormData({
        tableId: '',
        tableName: '',
        scheduleId: '',
        courseId: '',
        instructorId: '',
        lic: '',
        meetingURL: ''
      });

      // Redirect to /view-schedule page
      navigate("/admin/view-schedule");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      console.error("Failed to schedule lecture:", error);
      alert(`Failed to schedule lecture: ${errorMessage}`);
      navigate("/view-schedule");
    }
  };

  const handleManageSchedules = () => {
    navigate("/admin/view-schedule");
  };

  

  return (
    <div className="lecture-scheduler">
       <button onClick={handleManageSchedules} className="manage-schedules-button">
        Manage Schedules
      </button>
      <Text fontSize='50px' color='black' textAlign='center'>
        Schedule New Lecture
      </Text>
      <form onSubmit={handleSubmit}>
        <div className="grid-container">
          {/* Main Details Container */}
          <div className="card main-details">
            <div className="details-section">
              <h2>Table Information</h2>
              <div className="form-row">
                <div className="form-group">
                  <label>Table ID</label>
                  <input
                    type="text"
                    name="tableId"
                    placeholder="Enter table ID"
                    value={formData.tableId}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Table Name</label>
                  <input
                    type="text"
                    name="tableName"
                    placeholder="Enter table name"
                    value={formData.tableName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Schedule ID</label>
                  <input
                    type="text"
                    name="scheduleId"
                    placeholder="Enter schedule ID"
                    value={formData.scheduleId}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="details-section">
              <h2>Course & Instructor Details</h2>
              <div className="form-row">
                <div className="form-group">
                  <label>Course ID</label>
                  <select
                    name="courseId"
                    value={formData.courseId}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select course</option>
                    <option value="course1">Course 1</option>
                    <option value="course2">Course 2</option>
                    <option value="course3">Course 3</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Instructor ID</label>
                  <select
                    name="instructorId"
                    value={formData.instructorId}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select instructor</option>
                    <option value="instructor1">Instructor 1</option>
                    <option value="instructor2">Instructor 2</option>
                    <option value="instructor3">Instructor 3</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="details-section">
              <h2>Lecture Details</h2>
              <div className="form-row">
                <div className="form-group">
                  <label>LIC</label>
                  <input
                    type="text"
                    name="lic"
                    placeholder="Enter LIC"
                    value={formData.lic}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Meeting URL</label>
                  <input
                    type="url"
                    name="meetingURL"
                    placeholder="Enter meeting URL"
                    value={formData.meetingURL}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Day</label>
                  <select
                    value={selectedDay}
                    onChange={(e) => setSelectedDay(e.target.value)}
                    required
                  >
                    <option value="">Select day</option>
                    {weekdays.map((day) => (
                      <option key={day.value} value={day.value}>
                        {day.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Start Time</label>
                  <select
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    required
                  >
                    {[...Array(6)].map((_, i) => {
                      const hour = 9 + i; // Generates hours from 9 to 17 (5 PM)
                      const formattedTime = `${hour
                        .toString()
                        .padStart(2, "0")}:00`;
                      const displayTime =
                        hour < 12
                          ? `${hour}:00 AM`
                          : hour === 12
                          ? `12:00 PM`
                          : `${hour - 12}:00 PM`;

                      return (
                        <option key={formattedTime} value={formattedTime}>
                          {displayTime}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="form-group">
                  <label>End Time</label>
                  <input 
                    type="text" 
                    value={`${parseInt(endTime.split(':')[0]) > 12 
                      ? `${parseInt(endTime.split(':')[0]) - 12}:00 PM`
                      : parseInt(endTime.split(':')[0]) === 12 
                      ? '12:00 PM'
                      : `${endTime.split(':')[0]}:00 AM`}`}
                    readOnly 
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Duration</label>
                  <input type="text" value="3 hours" readOnly />
                </div>
              </div>
            </div>
          </div>

          {/* Student List */}
          <div className="card">
            <h2>Student List</h2>
            <div className="student-list">
              {students.map((student, index) => (
                <div key={index} className="student-entry">
                  <div className="form-group">
                    <label>User ID</label>
                    <input
                      type="text"
                      placeholder="Enter user ID"
                      value={student.userId}
                      onChange={(e) =>
                        handleStudentChange(index, "userId", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>User Email</label>
                    <input
                      type="email"
                      placeholder="Enter email"
                      value={student.userEmail}
                      onChange={(e) =>
                        handleStudentChange(index, "userEmail", e.target.value)
                      }
                      pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}"
                      required
                    />
                  </div>
                  {index > 0 && (
                    <button
                      type="button"
                      className="remove-student"
                      onClick={() => handleRemoveStudent(index)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                className="add-student"
                onClick={handleAddStudent}
              >
                Add Student
              </button>
              <div className="student-count">
                {students.length}/100 students added
              </div>
            </div>
          </div>
        </div>

        <button type="submit" className="submit-button">
          Schedule Lecture
        </button>
      </form>
    </div>
  );
};
