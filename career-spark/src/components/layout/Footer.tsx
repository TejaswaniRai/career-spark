
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-50 py-12 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">CareerSpark</h3>
            <p className="text-gray-600 mb-4">
              Connecting talented individuals with innovative companies. Find your next career opportunity today.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 hover:text-job-blue">Home</Link></li>
              <li><Link to="/jobs" className="text-gray-600 hover:text-job-blue">Browse Jobs</Link></li>
              <li><Link to="/about" className="text-gray-600 hover:text-job-blue">About Us</Link></li>
              <li><Link to="/auth" className="text-gray-600 hover:text-job-blue">Login / Register</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">For Employers</h3>
            <ul className="space-y-2">
              <li><Link to="/auth?role=recruiter" className="text-gray-600 hover:text-job-blue">Post a Job</Link></li>
              <li><Link to="/employer/dashboard" className="text-gray-600 hover:text-job-blue">Employer Dashboard</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-job-blue">Recruiting Solutions</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-job-blue">Pricing</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">For Candidates</h3>
            <ul className="space-y-2">
              <li><Link to="/jobs" className="text-gray-600 hover:text-job-blue">Find Jobs</Link></li>
              <li><Link to="/student/dashboard" className="text-gray-600 hover:text-job-blue">Student Dashboard</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-job-blue">Career Resources</Link></li>
              <li><Link to="#" className="text-gray-600 hover:text-job-blue">Resume Builder</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between">
          <p className="text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} CareerSpark. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="#" className="text-gray-600 hover:text-job-blue text-sm">Terms</Link>
            <Link to="#" className="text-gray-600 hover:text-job-blue text-sm">Privacy Policy</Link>
            <Link to="#" className="text-gray-600 hover:text-job-blue text-sm">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
