export type User = {
  id: string;
  userId: string;
  userName: string;
  userEmail: string; // Make sure this matches the backend
  email?: string;    // Keep this as a backup for backward compatibility
  userRole: string;
  countryCode: string;
  courses: (string | { id: string; name?: string; code?: string })[];
  password?: string;
};