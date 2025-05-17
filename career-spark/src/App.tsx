
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import JobListings from "./pages/JobListings";
import JobDetails from "./pages/JobDetails";
import About from "./pages/About";
import StudentDashboard from "./pages/dashboard/StudentDashboard";
import StudentApplications from "./pages/dashboard/StudentApplications";
import StudentProfile from "./pages/dashboard/StudentProfile";
import RecruiterDashboard from "./pages/dashboard/RecruiterDashboard";
import RecruiterPostJob from "./pages/dashboard/RecruiterPostJob";
import RecruiterApplications from "./pages/dashboard/RecruiterApplications";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/jobs" element={<JobListings />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/about" element={<About />} />
          
          {/* Student Dashboard Routes */}
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/student/applications" element={<StudentApplications />} />
          <Route path="/student/profile" element={<StudentProfile />} />
          
          {/* Recruiter Dashboard Routes */}
          <Route path="/employer/dashboard" element={<RecruiterDashboard />} />
          <Route path="/employer/post-job" element={<RecruiterPostJob />} />
          <Route path="/employer/applications" element={<RecruiterApplications />} />
          
          {/* 404 Page */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
