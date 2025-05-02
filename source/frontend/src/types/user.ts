export type User =  {
    id: string;
    name: string;
    email: string;
    userRole: string;
    isActive?: boolean;
    department?: string;
    courses?: string[];
  }
  
  export type UserFormValues = {
    name: string;
    email: string;
    userRole: string;
    department?: string;
    password?: string;
  }
  
  export type CourseInfo =  {
    id: string;
    name: string;
  }