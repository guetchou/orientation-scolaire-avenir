
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Tests from "./pages/Tests";
import Conseillers from "./pages/Conseillers";
import Resources from "./pages/Resources";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Onboarding from "./pages/Onboarding";
import RiasecTest from "./pages/RiasecTest";
import EmotionalTest from "./pages/EmotionalTest";
import MultipleIntelligenceTest from "./pages/MultipleIntelligenceTest";
import LearningStyleTest from "./pages/LearningStyleTest";
import TestResults from "./pages/TestResults";
import AdminDashboard from "./pages/admin/Dashboard";
import ConseillierDashboard from "./pages/conseiller/Dashboard";
import { DashboardLayout } from "./components/DashboardLayout";
import { ForumLayout } from "./components/forum/ForumLayout";
import "./App.css";

console.info("Application starting...");

function App() {
  console.info("App component rendered");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/tests" element={<Tests />} />
        <Route path="/conseillers" element={<Conseillers />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/onboarding" element={<Onboarding />} />
        
        {/* Routes protégées avec DashboardLayout */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/results" element={<TestResults />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/conseiller/dashboard" element={<ConseillierDashboard />} />
          <Route path="/forum" element={<ForumLayout />} />
        </Route>
        
        {/* Routes des tests */}
        <Route path="/test-riasec" element={<RiasecTest />} />
        <Route path="/test-emotional" element={<EmotionalTest />} />
        <Route path="/test-multiple" element={<MultipleIntelligenceTest />} />
        <Route path="/test-learning" element={<LearningStyleTest />} />
      </Routes>
    </Router>
  );
}

export default App;
