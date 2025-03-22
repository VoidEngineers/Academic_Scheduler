import { Route, Routes } from "react-router-dom";
import OnBoarding from "./pages/onBoarding/onBoarding";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import Admin from "./pages/admin/Admin";
import Error404 from "../src/Error404";
// line 6 ve
import { LectureScheduler } from "./pages/LectureScheduler";
import ScheduleView from "./pages/ScheduleView";
import { UserProfile } from "./pages/user/UserProfile";
import ProfilePage from "./pages/user/ProfilePage";
import { EnrolledCourses } from "./pages/user/EnrolledCourses";

// line 18 g
import CourseForm from "./pages/CourseForm/CourseForm";
import CourseList from "./pages/CourseList/CourseList";
import CourseDetails from "./pages/CourseDetails/CourseDetails";
import Home from "./pages/home/Home";
import Calendar from "./pages/schdules/Calander";

//line 30 r

//line 42 vi

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<OnBoarding />} />
        <Route path='/home' element={<Home />} />

        {/* line 64 ve */}
        <Route path='/schedule' element={<LectureScheduler />} />
        <Route path='/view-schedule' element={<ScheduleView />} />

        {/* line 64 ve */}
        <Route path='/schedule' element={<LectureScheduler />} />
        <Route path='/view-schedule' element={<ScheduleView />} />
        <Route path='/Admin' element={<Admin />} />
        {/* <Route path="/lecturer-chart" element={<LecturerChart />} /> */}

        {/* line 76 g */}

        {/* line 88 r */}

        {/* line 100 vi */}
        <Route path='/user-profile' element={<UserProfile />} />
        <Route path='/my-profile' element={<ProfilePage />} />
        <Route path='/enrolled-courses' element={<EnrolledCourses />} />
        <Route path='/admin' element={<ScheduleView />} />
        <Route path='/calendar' element={<Calendar />} />

        {/* line 76 g */}
        <Route path='/admin/courses/form' element={<CourseForm />} />
        <Route path='/admin/courses/list' element={<CourseList />} />
        <Route path='/courses/:courseId' element={<CourseDetails />} />

        {/* line 88 r */}

        {/* line 100 vi */}

        {/* line 114 */}
        <Route path='*' element={<Error404 />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
