import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Resume from "./pages/Resume";
import Film35mm from "./pages/Film35mm";
import Film120mm from "./pages/Film120mm";
import MPBSDP from "./pages/MPBSDP";
import PShop from "./pages/pshop.jsx";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/35mm" element={<Film35mm />} />
        <Route path="/120mm" element={<Film120mm />} />
        <Route path="/mpbsdp" element={<MPBSDP />} />
        <Route path="/pshop" element={<PShop />} />
      </Routes>
    </Router>
  );
}

export default App;