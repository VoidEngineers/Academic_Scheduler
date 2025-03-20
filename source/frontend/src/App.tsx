import { Route, Routes } from "react-router-dom";
import OnBoarding from "./pages/onBoarding/onBoarding";
import NotFound from "./404";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<OnBoarding />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
