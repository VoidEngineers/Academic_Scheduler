export type Lecturer = {
    id: string;
    name: string;
    email: string;
    department: string;
    title: string;
    specialization: string;
    courses: string[];
    availability?: AvailabilitySchedule;
    teachingLoad?: number;
  }
  
  export type LecturerFormValues = {
    name: string;
    email: string;
    password?: string;
    department: string;
    title: string;
    specialization: string;
  }
  
  export type AvailabilitySchedule = {
    monday: TimeSlot[];
    tuesday: TimeSlot[];
    wednesday: TimeSlot[];
    thursday: TimeSlot[];
    friday: TimeSlot[];
  }
  
  export type TimeSlot = {
    startTime: string;
    endTime: string;
  }