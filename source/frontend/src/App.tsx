import { Route, Routes } from "react-router-dom";
// import OnBoarding from "./pages/onBoarding/onBoarding";
import NotFound from "./404";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* <Route path="/" element={<OnBoarding />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
