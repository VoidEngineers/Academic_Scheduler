import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import OnBoarding from "./pages/onBoarding/onBoarding";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
//import Admin from "./pages/Admin/Admin";
import Error404 from "../src/Error404";


// line 10 ve
import Admin from "./pages/Admin/AdminDashboard";
import AdminNav from "../src/pages/Admin/AdminNav";
import { LectureScheduler } from "./pages/LectureScheduler";
import ScheduleView from "./pages/ScheduleView";
import AdminLogin from './pages/auth/AdminLogin';







// line 23 g
import CourseForm from "./pages/CourseForm/CourseForm";
import CourseList from "./pages/CourseList/CourseList";
import CourseDetails from "./pages/CourseDetails/CourseDetails";
import Home from "./pages/home/Home";
import Calendar from "./pages/schdules/Calander";








//line 37 r
import UserManagement from "./pages/userManagement/user";










//line 49 vi
import ProfilePage from "./pages/user/ProfilePage";
import { EnrolledCourses } from "./pages/user/EnrolledCourses";
import { UserProfile } from "./pages/user/UserProfile";











function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false); // Manage the drawer state

  // Handlers to open and close the sidebar
  const handleOpenSidebar = () => setIsDrawerOpen(true);
  const handleCloseSidebar = () => setIsDrawerOpen(false);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<OnBoarding />} />
        <Route path='/home' element={<Home />} />

        {/* line 77 ve */}
        <Route path='/admin/schedule' element={
            <>
              <AdminNav
                isOpen={isDrawerOpen} 
                onOpen={handleOpenSidebar} 
                onClose={handleCloseSidebar} 
                drawerBg="#f9f9f9" 
                menuActiveBg="#e2e8f0" 
                menuHoverBg="#edf2f7" 
                cardBg="#ffffff" 
                headerBorderColor="#4FD1C5" 
              />
              <LectureScheduler />
            </>
          }  />
        <Route path='/admin/view-schedule'element={
            <>
              <AdminNav
                isOpen={isDrawerOpen} 
                onOpen={handleOpenSidebar} 
                onClose={handleCloseSidebar} 
                drawerBg="#f9f9f9" 
                menuActiveBg="#e2e8f0" 
                menuHoverBg="#edf2f7" 
                cardBg="#ffffff" 
                headerBorderColor="#4FD1C5" 
              />
              <ScheduleView />
            </>
          } />
        <Route path='/Admin' element={<Admin />} />
        {/* <Route path="/lecturer-chart" element={<LecturerChart />} /> */}
        <Route path="/admin-login" element={<AdminLogin />} />









        {/* line 120 g */}
        <Route path='/admin/courses/form'element={
            <>
              <AdminNav
                isOpen={isDrawerOpen} 
                onOpen={handleOpenSidebar} 
                onClose={handleCloseSidebar} 
                drawerBg="#f9f9f9" 
                menuActiveBg="#e2e8f0" 
                menuHoverBg="#edf2f7" 
                cardBg="#ffffff" 
                headerBorderColor="#4FD1C5" 
              />
              <CourseForm />
            </>
          } />
        <Route path='/admin/courses/list' element={
            <>
              <AdminNav
                isOpen={isDrawerOpen} 
                onOpen={handleOpenSidebar} 
                onClose={handleCloseSidebar} 
                drawerBg="#f9f9f9" 
                menuActiveBg="#e2e8f0" 
                menuHoverBg="#edf2f7" 
                cardBg="#ffffff" 
                headerBorderColor="#4FD1C5" 
              />
              <CourseList />
            </>
          } />
        <Route path='/courses/:courseId' element={<UserManagement />} />







        {/* line 159 r */}
        <Route path='/admin/user' element={
            <>
              <AdminNav
                isOpen={isDrawerOpen} 
                onOpen={handleOpenSidebar} 
                onClose={handleCloseSidebar} 
                drawerBg="#f9f9f9" 
                menuActiveBg="#e2e8f0" 
                menuHoverBg="#edf2f7" 
                cardBg="#ffffff" 
                headerBorderColor="#4FD1C5" 
              />
              <UserManagement />
            </>
          }  />





















        {/* line 180 vi */}
        <Route path='/user-profile' element={<UserProfile />} />
        <Route path='/my-profile' element={<ProfilePage />} />
        <Route path='/enrolled-courses' element={<EnrolledCourses />} />
        <Route path='/admin' element={<ScheduleView />} />
        <Route path='/calendar' element={<Calendar />} />

























        {/* line 211 */}
        <Route path='*' element={<Error404 />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;