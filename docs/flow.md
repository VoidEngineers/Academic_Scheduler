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

1.

```plaintext
use the ./Instructors-data.json and ./Student-data.json for fill the neccessary data in the table and in here the outer array is a day array which has the timetables per day and there are 5 days per week and for one online lecture we have one 3hrs and generate data set for a week. and for one course there should be a instructor and 100 students and the same time we can conduct 2 or 3 lectures paralallely and there are no limitaions but consider the instructors availavility you can assign a instructor to the timetable
```

## Conflict Manager service Flow

1.
