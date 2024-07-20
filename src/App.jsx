import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from './Pages/Auth'
import Home from './Pages/Home'
import axios from 'axios';
function App() {
  axios.defaults.withCredentials = true;
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Auth />} />
        </Routes>
      </BrowserRouter>
  )
}

export default App
