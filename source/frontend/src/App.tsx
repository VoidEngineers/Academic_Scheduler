import { Route, Routes } from 'react-router-dom'
import OnBoarding from './pages/onBoarding/onBoarding'

function App() {

  return (
    <>
     <Routes>
     <Route path="/" element={<OnBoarding />} />
     </Routes>
    </>
  )
}

export default App
