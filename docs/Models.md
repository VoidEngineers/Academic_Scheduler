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
    {
      "courseId": "",
      "courseName": ""
    }
  ]
},
// Lecturer Model
{
  "userId": "",
  "userEmail": "",
  "assignedCourses" : [
    {
      "courseId": "",
      "courseCode": ""
    }
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
