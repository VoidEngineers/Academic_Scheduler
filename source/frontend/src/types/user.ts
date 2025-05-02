export type User =  {
  id: string;
  name: string;
  email: string;
  userRole: string;
  countryCode?: string;
  courses?: string[];
}

export type UserFormValues = {
  userId: string;
  userName: string;
  userEmail: string;
  userRole: string;
  countryCode: string;
  password: string;
  courses: string[];
}