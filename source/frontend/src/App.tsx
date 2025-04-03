import { useState } from "react";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import RouteProvider from "./providers/routeProvider";
import "./styles/spinnerStyle";

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const handleOpenSidebar = () => setIsDrawerOpen(true);
  const handleCloseSidebar = () => setIsDrawerOpen(false);
  
  return (
    <>
      <Navbar />
      <RouteProvider 
        isDrawerOpen={isDrawerOpen}
        handleOpenSidebar={handleOpenSidebar}
        handleCloseSidebar={handleCloseSidebar}
      />
      <Footer />
    </>
  );
}

export default App;