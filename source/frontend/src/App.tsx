import { Route, Routes } from "react-router-dom";
// import OnBoarding from "./pages/onBoarding/onBoarding";
import NotFound from "./404";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";



// line 6 ve
import { LectureScheduler } from './pages/LectureScheduler'
import ScheduleView from './pages/ScheduleView'









// line 18 g











//line 30 r











//line 42 vi












function App() {
  return (
    <>

      <Navbar />
      <Routes>
        {/* <Route path="/" element={<OnBoarding />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer/>

    {/* <Header/> */}
     <Routes>
     <Route path="/" element={<OnBoarding />} />


      {/* line 64 ve */}
     <Route path="/schedule" element={<LectureScheduler />} />
     <Route path="/view-schedule" element={<ScheduleView />} />









       {/* line 76 g */}
     
     
     
     
     
     
     
     
     
     
     
       {/* line 88 r */}











  {/* line 100 vi */}













{/* line 114 */}
     </Routes>
     {/* <footer/> */}

    </>
  );
}

export default App;
