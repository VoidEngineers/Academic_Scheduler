import { Route, Routes } from 'react-router-dom'
import OnBoarding from './pages/onBoarding/onBoarding'
import Navbar from './components/navbar/navbar'
import Footer from './components/footer/footer'
// import Error404 from '../src/Error404'
// line 6 ve
import { LectureScheduler } from './pages/LectureScheduler'
import ScheduleView from './pages/ScheduleView'









// line 18 g
import CourseForm from './pages/CourseForm/CourseForm';
import CourseList from './pages/CourseList/CourseList';
import CourseDetails from './pages/CourseDetails/CourseDetails';








//line 30 r











//line 42 vi












function App() {

  return (
    <>
    <Navbar/>
     <Routes>
     <Route path="/" element={<OnBoarding />} />


      {/* line 64 ve */}
     <Route path="/schedule" element={<LectureScheduler />} />
     <Route path="/view-schedule" element={<ScheduleView />} />









       {/* line 76 g */}
       <Route path="/admin/courses/form" element={<CourseForm />} />
        <Route path="/admin/courses/list" element={<CourseList />} />
        <Route path="/courses/:courseId" element={<CourseDetails />} />
     
     
     
     
     
     
     
     
       {/* line 88 r */}











  {/* line 100 vi */}













{/* line 114 */}
     </Routes>
     <Footer/>
    </>
  )
}

export default App