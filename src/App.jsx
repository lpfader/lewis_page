import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Resume from "./pages/Resume";
import Film35mm from "./pages/Film35mm";
import Film120mm from "./pages/Film120mm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/35mm" element={<Film35mm />} />
        <Route path="/120mm" element={<Film120mm />} />
      </Routes>
    </Router>
  );
}

export default App;