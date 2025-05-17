
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { title: "Home", path: "/" },
    { title: "Jobs", path: "/jobs" },
    { title: "About", path: "/about" }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-job-blue text-2xl font-bold">CareerSpark</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              to={item.path}
              className={isActive(item.path) ? "nav-link-active" : "nav-link"}
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Link to="/auth">
            <Button variant="outline" className="border-job-blue text-job-blue hover:bg-job-blue/10">
              Login
            </Button>
          </Link>
          <Link to="/auth?tab=register">
            <Button className="bg-job-blue hover:bg-job-blue-light">
              Register
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-gray-600" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4 shadow-lg animate-fadeIn">
          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link 
                key={item.path} 
                to={item.path}
                className={isActive(item.path) ? "nav-link-active" : "nav-link"}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.title}
              </Link>
            ))}
            <div className="pt-4 flex flex-col space-y-3">
              <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="w-full border-job-blue text-job-blue hover:bg-job-blue/10">
                  Login
                </Button>
              </Link>
              <Link to="/auth?tab=register" onClick={() => setIsMenuOpen(false)}>
                <Button className="w-full bg-job-blue hover:bg-job-blue-light">
                  Register
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
