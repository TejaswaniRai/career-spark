
import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Briefcase, 
  User, 
  Calendar, 
  Settings,
  Menu,
  X
} from 'lucide-react';

interface DashboardLayoutProps {
  children: ReactNode;
  role: 'student' | 'recruiter';
}

const DashboardLayout = ({ children, role }: DashboardLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const studentNavItems = [
    { label: 'Dashboard', icon: Home, path: '/student/dashboard' },
    { label: 'Applications', icon: Briefcase, path: '/student/applications' },
    { label: 'Profile', icon: User, path: '/student/profile' },
  ];

  const recruiterNavItems = [
    { label: 'Dashboard', icon: Home, path: '/employer/dashboard' },
    { label: 'Post Job', icon: Briefcase, path: '/employer/post-job' },
    { label: 'Applications', icon: Calendar, path: '/employer/applications' },
    { label: 'Settings', icon: Settings, path: '/employer/settings' },
  ];

  const navItems = role === 'student' ? studentNavItems : recruiterNavItems;

  const isActive = (path: string) => location.pathname === path;
  
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
        <div className="p-4 border-b">
          <Link to="/" className="flex items-center">
            <span className="text-xl font-semibold text-job-blue">CareerSpark</span>
          </Link>
        </div>
        
        <nav className="flex-1 pt-4">
          <div className="px-4 py-2">
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              {role === 'student' ? 'Student' : 'Employer'} Portal
            </span>
          </div>
          
          <ul className="mt-2">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`flex items-center px-6 py-3 text-sm ${
                    isActive(item.path)
                      ? 'text-job-blue bg-job-blue/5 border-r-2 border-job-blue'
                      : 'text-gray-700 hover:text-job-blue hover:bg-gray-50'
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4 border-t">
          <Link 
            to="/" 
            className="flex items-center text-sm text-gray-700 hover:text-job-blue"
          >
            <span>Back to Home</span>
          </Link>
        </div>
      </aside>
      
      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-20 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className="text-lg font-semibold text-job-blue">CareerSpark</span>
        </Link>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-600">
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-10 bg-gray-800 bg-opacity-50" onClick={() => setSidebarOpen(false)}>
          <aside className="fixed top-0 left-0 bottom-0 w-64 bg-white shadow-lg transform transition-transform duration-300" onClick={e => e.stopPropagation()}>
            <div className="p-4 border-b">
              <Link to="/" className="flex items-center">
                <span className="text-xl font-semibold text-job-blue">CareerSpark</span>
              </Link>
            </div>
            
            <nav className="flex-1 pt-4">
              <div className="px-4 py-2">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  {role === 'student' ? 'Student' : 'Employer'} Portal
                </span>
              </div>
              
              <ul className="mt-2">
                {navItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      to={item.path}
                      className={`flex items-center px-6 py-3 text-sm ${
                        isActive(item.path)
                          ? 'text-job-blue bg-job-blue/5 border-r-2 border-job-blue'
                          : 'text-gray-700 hover:text-job-blue hover:bg-gray-50'
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <item.icon className="h-5 w-5 mr-3" />
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            
            <div className="p-4 border-t">
              <Link 
                to="/" 
                className="flex items-center text-sm text-gray-700 hover:text-job-blue"
                onClick={() => setSidebarOpen(false)}
              >
                <span>Back to Home</span>
              </Link>
            </div>
          </aside>
        </div>
      )}
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="md:py-6 md:px-8 p-4 pt-20 md:pt-0">
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
