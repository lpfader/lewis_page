import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Main from "./pages/Main";
import Resume from "./pages/Resume";
import Film35mm from "./pages/Film35mm";
import Film120mm from "./pages/Film120mm";
import MPBSDP from "./pages/MPBSDP";
import PShop from "./pages/pshop.jsx";
import Sundays from "./pages/Sundays";
import VotesSummary from "./pages/votes_summary.jsx";
import Showcase from "./pages/Showcase.jsx";

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
        {/* Year defaults to the current one; /sundays_2026 is kept so old
            links and bookmarks still land somewhere sensible. */}
        <Route path="/sundays" element={<Sundays />} />
        <Route path="/sundays/:year" element={<Sundays />} />
        <Route path="/sundays_2026" element={<Navigate to="/sundays/2026" replace />} />
        <Route path="/votes" element={<VotesSummary />} />
        <Route path="/showcase" element={<Showcase />} />
        {/* ⭐ This line fixes your Main page */}
        <Route path="*" element={<Main />} />
      </Routes>
    </Router>
  );
}

export default App;