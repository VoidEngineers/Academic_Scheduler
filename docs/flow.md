# Flow of the system

## User Onboading process

1. User is register thruogh the google authentication which is embeded to the sign in
2. After that user can enroll to the courses available on the platform.
3. Lecturer is is onboarding through a admin who is responsible of oonboarding acedamic staff.
4. Admin will send a email which the platform login url, to register a lecturer to the system.
5. After a lecturer register to the platform admin will create a lecturer acc for insted of keeping lecturer as a student. (Defualt user role of the system is `student`)
6. when creating the lecturer acc need to give the course details and other attributes about lecture to the system. there will be a dialog box when the user upgrade happening. inside that box we need to give the detail about the lecturer before create the acc.
7. After completing the creating the lecturer account need to notify the lecturer by sending an email with the details that we onboaded to our system.

## Course Onboarding process.

1.

## Scheduling Manager service Flow

```plaintext
use the ./Instructors-data.json and ./Student-data.json for fill the neccessary data in the table and in here the outer array is a day array which has the timetables per day and there are 5 days per week and for one online lecture we have one 3hrs and generate data set for a week. and for one course there should be a instructor and 100 students and the same time we can conduct 2 or 3 lectures paralallely and there are no limitaions but consider the instructors availavility you can assign a instructor to the timetable
```

## Conflict Manager service Flow

### Key Attributes for Timetable Scheduling Using Graph Algorithm

To model the scheduling problem as a graph coloring problem, we need to define nodes and edges properly. The key attributes from your dataset that are relevant for scheduling are:

1. Course ID (courseId) – Ensures that a course doesn't overlap with another session of the same course.
2. Instructor ID (instructorId) – Ensures that an instructor is not assigned to two classes at the same time.
3. Students (students) – Ensures that students who are taking multiple courses do not have conflicting schedules.
4. Start Time (startTime) & End Time (endTime) – Helps determine conflicts where two sessions overlap in time.
5. Table ID (tableId) – Unique identifier for each timetable slot but may not be needed for graph constraints.
6. Capacity (capacity) – While not directly affecting scheduling conflicts, it ensures a session does not exceed its limit.
7. Lecture Identifier (lic) – Represents the main instructor, similar to instructorId.

### Graph Representation:

- Nodes (Vertices): Each session (timetable slot) is a node.
- Edges: An edge exists between two nodes if:
  - They have the same instructor and overlap in time.
  - They have at least one student in common and overlap in time.
  - They are the same course occurring simultaneously.
