import { Route, Routes } from 'react-router-dom'
import OnBoarding from './pages/onBoarding/onBoarding'
import Navbar from './components/navbar/navbar'
import Footer from './components/footer/footer'
import Admin from './pages/Admin/Admin';
// import GlobalStyle from './styles/globalStyles';
// import LecturerChart from './components/charts/lecturerChart/lecturerChart';
// import Error404 from '../src/Error404'
// line 6 ve
import { LectureScheduler } from './pages/LectureScheduler'
import ScheduleView from './pages/ScheduleView'









// line 18 g











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
     <Route path="/Admin" element={<Admin />} />
     {/* <Route path="/lecturer-chart" element={<LecturerChart />} /> */}









       {/* line 76 g */}
     
     
     
     
     
     
     
     
     
     
     
       {/* line 88 r */}











  {/* line 100 vi */}













{/* line 114 */}
     </Routes>
     <Footer/>
    </>
  )
}

export default App