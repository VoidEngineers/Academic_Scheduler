# Document For the Model that we need to use in the DB

## Services

### usermanager

```json
// Users Model
{
  "userId": "", //S25200201
  "userName": "john doe",
  "userRole": "", //Student, Admin, Lecturer, Instructor
  "userEmail": "",
  "countrycode": "",
  "courses": [
      "C1", "C2"
  ]
},
// Lecturer Model
{
  "userId": "",
  "userEmail": "",
  "assignedCourses" : [
      "C1", "C2"
  ],
  "lic": true,
  "workingHours": "",
  "specializedArea": "",
  "description": ""
}
```

### coursemanager

```json
// course Model
{
  "courseId": "john doe",
  "courseName": "",
  "courseCode": "", //"IT123, SE123"
  "catergory": "",
  "courseDescription": "",
  "lic": ""
}
```

### schedulemanager

```json
// table model
{
  "tableId": "",
  "tableName": "",
  "courseId": "",
  "instructorId": "",
  "lic": "",
  "meetingURL": "http://ckjsdnjkvdfs",
  "startTime": 1741876922,
  "endTime": 1741876922,
  "duration": "3 hr",
  "capacity": 100,
  "students": [
    {
      "userId": "",
      "userEmail": ""
    }
  ]
},

// Table details per day
[
  {
    "day": "Monday",
    "schedules": [
      {
        "tableId": "T001",
        "tableName": "Morning Session - C1",
        "courseId": "C1",
        "instructorId": "I001",
        "lic": "I001",
        "meetingURL": "https://meet.google.com/abc-xyz-123",
        "startTime": 1741876922,
        "endTime": 1741887722,
        "duration": "3 hr",
        "capacity": 100,
        "students": [
          { "userId": "S001", "userEmail": "student001@example.com" },
          { "userId": "S002", "userEmail": "student002@example.com" },
          { "userId": "S003", "userEmail": "student003@example.com" },
          { "userId": "S100", "userEmail": "student100@example.com" }
        ]
      },
      {
        "tableId": "T002",
        "tableName": "Afternoon Session - C2",
        "courseId": "C2",
        "instructorId": "I002",
        "lic": "I002",
        "meetingURL": "https://meet.google.com/def-xyz-456",
        "startTime": 1741888922,
        "endTime": 1741899722,
        "duration": "3 hr",
        "capacity": 100,
        "students": [
          { "userId": "S101", "userEmail": "student101@example.com" },
          { "userId": "S102", "userEmail": "student102@example.com" },
          { "userId": "S103", "userEmail": "student103@example.com" },
          { "userId": "S200", "userEmail": "student200@example.com" }
        ]
      }
    ]
  },
  {
    "day": "Tuesday",
    "schedules": [
      {
        "tableId": "T003",
        "tableName": "Morning Session - C3",
        "courseId": "C3",
        "instructorId": "I003",
        "lic": "I003",
        "meetingURL": "https://meet.google.com/ghi-xyz-789",
        "startTime": 1741963322,
        "endTime": 1741974122,
        "duration": "3 hr",
        "capacity": 100,
        "students": [
          { "userId": "S201", "userEmail": "student201@example.com" },
          { "userId": "S202", "userEmail": "student202@example.com" },
          { "userId": "S300", "userEmail": "student300@example.com" }
        ]
      },
      {
        "tableId": "T004",
        "tableName": "Afternoon Session - C4",
        "courseId": "C4",
        "instructorId": "I004",
        "lic": "I004",
        "meetingURL": "https://meet.google.com/jkl-xyz-012",
        "startTime": 1741975322,
        "endTime": 1741986122,
        "duration": "3 hr",
        "capacity": 100,
        "students": [
          { "userId": "S301", "userEmail": "student301@example.com" },
          { "userId": "S302", "userEmail": "student302@example.com" },
          { "userId": "S400", "userEmail": "student400@example.com" }
        ]
      }
    ]
  }
]
```

### conflictmanger

```json
[
  {
    "scheduleId": "",
    "tables": [
      {
        "tableId": "",
        "tableName": ""
      }
    ],
    "created": 1741876922,
    "updated": 1741876922
  }
]
```
