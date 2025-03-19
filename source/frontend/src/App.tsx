import { Route, Routes } from "react-router-dom";
import NotFound from "./404";
import MainLayout from "./layouts/mainLayout/mainLayout";

function App() {
  return (
    <MainLayout>
      <>
        <Routes>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </>
    </MainLayout>
  );
}

export default App;
