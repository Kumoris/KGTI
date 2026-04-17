import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "@/pages/TestHome";
import Test from "@/pages/Test";
import Result from "@/pages/Result";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </Router>
  );
}
