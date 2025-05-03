import { lazy } from "react";
import { RouteObject } from "react-router-dom";

// Lazy load components
const OnBoarding = lazy(() => import("../pages/onBoarding/onBoarding"));
const Home = lazy(() => import("../pages/home/Home"));
const Error404 = lazy(() => import("../Error404"));
const Admin = lazy(() => import("../pages/Admin/AdminDashboard"));
const LectureScheduler = lazy(() =>
  import("../pages/LectureScheduler").then((module) => ({
    default: module.LectureScheduler,
  }))
);
const Schedules = lazy(() => import("../pages/schdules/Schedules"));
const ScheduleView = lazy(() => import("../pages/ScheduleView"));
const AdminLogin = lazy(() => import("../pages/auth/AdminLogin"));
const StudentLogin = lazy(() => import("../pages/auth/StudentLogin"));
const StaffLogin = lazy(() => import("../pages/auth/StaffLogin"));
const CourseForm = lazy(() => import("../pages/CourseForm/CourseForm"));
const CourseList = lazy(() => import("../pages/CourseList/CourseList"));
const CourseDetails = lazy(() => import("../pages/CourseDetails/CourseDetails"));
const Calendar = lazy(() => import("../pages/schdules/Calander"));
const UserManagement = lazy(() => import("../pages/userManagement/user"));
const ProfilePage = lazy(() => import("../pages/user/ProfilePage"));
const AllScheduleView = lazy(() => import("../pages/schdules/AllScheduleView"));



const EnrolledCourses = lazy(() =>
  import("../pages/user/EnrolledCourses").then((module) => ({
    default: module.EnrolledCourses,
  }))
);
const UserProfile = lazy(() =>
  import("../pages/user/UserProfile").then((module) => ({
    default: module.UserProfile,
  }))
);


// Admin Nav props type
// interface AdminNavProps {
//   isOpen: boolean;
//   onOpen: () => void;
//   onClose: () => void;
//   drawerBg: string;
//   menuActiveBg: string;
//   menuHoverBg: string;
//   cardBg: string;
//   headerBorderColor: string;
// }

// Route with AdminNav type
type RouteWithAdminNav = RouteObject & {
  needsAdminNav?: boolean;
};

// Define routes
const routes: RouteWithAdminNav[] = [
  // Public routes
  {
    path: "/",
    element: <OnBoarding />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  
  // Authentication routes
  {
    path: "/admin-login",
    element: <AdminLogin />,
  },
  {
    path: "/Staff-login", // Fixed capitalization for consistency
    element: <StaffLogin />, // Use proper component
  },
  {
    path: "/student-login",
    element: <StudentLogin />,
  },
  
  // Admin dashboard
  {
    path: "/admin",
    element: <Admin />,
  },
  
  // Admin routes with nav
  {
    path: "/admin/schedule",
    element: <LectureScheduler />,
    needsAdminNav: true,
  },
  {
    path: "/admin/view-schedule",
    element: <ScheduleView />,
    needsAdminNav: true,
  },

  
  // Course management

  {
    path: "/admin/view-all-schedule",
    element: <AllScheduleView />,
    needsAdminNav: true,
  },
  {
    path: "/Admin",
    element: <Admin />,
  },
  {
    path: "/admin-login",
    element: <AdminLogin />,
  },
  // Course routes

  {
    path: "/admin/courses/form",
    element: <CourseForm />,
    needsAdminNav: true,
  },
  {
    path: "/admin/courses/list",
    element: <CourseList />,
    needsAdminNav: true,
  },
  {
    path: "/courses/:courseId",
    element: <CourseDetails />,
  },
  
  // User management
  {
    path: "/admin/user",
    element: <UserManagement />,
    needsAdminNav: true,
  },
  
  // User profile routes
  {
    path: "/user-profile",
    element: <UserProfile />,
  },
  {
    path: "/my-profile",
    element: <ProfilePage />,
  },
  {
    path: "/enrolled-courses",
    element: <EnrolledCourses />,
  },
  
  // Schedule and calendar
  {
    path: "/calendar",
    element: <Calendar />,
  },
  {
    path: "/schedule",
    element: <Schedules />,
  },

  // Conflict manager API
  {
    path: "/conflict-manager",
    element: <div>Conflict Manager</div>,
  },








  
  // 404 route
  {
    path: "*",
    element: <Error404 />,
  },
];

export default routes;